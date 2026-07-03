#!/usr/bin/env python3
"""Update _data/scholar.yml from the Google Scholar Author API.

The workflow uses SerpApi because Google Scholar does not expose an official
public metrics API and direct scraping is brittle on GitHub Actions.
"""

from __future__ import annotations

import datetime as dt
import json
import os
import sys
import urllib.parse
import urllib.request
from pathlib import Path


AUTHOR_ID = os.environ.get("SCHOLAR_AUTHOR_ID", "T9kDpQoAAAAJ")
PROFILE_URL = f"https://scholar.google.com/citations?user={AUTHOR_ID}&hl=en"
API_URL = "https://serpapi.com/search.json"
OUT_FILE = Path("_data/scholar.yml")


def _metric_from_table(table: list[dict], candidates: tuple[str, ...]) -> int | None:
    for row in table:
        for key, value in row.items():
            normalized = key.lower().replace("-", "_")
            if any(candidate in normalized for candidate in candidates):
                if isinstance(value, dict) and "all" in value:
                    return int(value["all"])
                if isinstance(value, int):
                    return value
    return None


def fetch_metrics(api_key: str) -> dict[str, int]:
    params = {
        "engine": "google_scholar_author",
        "author_id": AUTHOR_ID,
        "hl": "en",
        "api_key": api_key,
    }
    url = f"{API_URL}?{urllib.parse.urlencode(params)}"
    with urllib.request.urlopen(url, timeout=45) as response:
        payload = json.loads(response.read().decode("utf-8"))

    if payload.get("error"):
        raise RuntimeError(payload["error"])

    table = payload.get("cited_by", {}).get("table", [])
    citations = _metric_from_table(table, ("citation", "citations"))
    h_index = _metric_from_table(table, ("h_index", "indice_h", "hindex"))
    i10_index = _metric_from_table(table, ("i10", "indice_i10", "i10index"))

    missing = [name for name, value in {"citations": citations, "h_index": h_index, "i10_index": i10_index}.items() if value is None]
    if missing:
        raise RuntimeError(f"Missing metrics from SerpApi response: {', '.join(missing)}")

    return {
        "citations": int(citations),
        "h_index": int(h_index),
        "i10_index": int(i10_index),
    }


def write_yaml(metrics: dict[str, int]) -> None:
    updated = dt.date.today().isoformat()
    content = "\n".join(
        [
            f"profile: {PROFILE_URL}",
            f"author_id: {AUTHOR_ID}",
            "source: Google Scholar",
            f"citations: {metrics['citations']}",
            f"h_index: {metrics['h_index']}",
            f"i10_index: {metrics['i10_index']}",
            f"updated: {updated}",
            "update_mode: GitHub Actions scheduled sync via SerpApi Google Scholar Author API",
            "",
        ]
    )
    OUT_FILE.write_text(content, encoding="utf-8")


def main() -> int:
    api_key = os.environ.get("SERPAPI_KEY")
    if not api_key:
        print("SERPAPI_KEY is not set; keeping existing scholar metrics.")
        return 0

    write_yaml(fetch_metrics(api_key))
    print(f"Updated {OUT_FILE} for {AUTHOR_ID}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
