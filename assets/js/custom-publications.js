(function () {
  const publicationMetrics = [
    {
      title: "Dynamics and Influences Analysis of Public Concerns in Mega Construction Projects",
      info: "SCIE Q1, IF=5.5",
      corresponding: ["Shitao Jin"],
    },
    {
      title: "Risk Identification and Assessment of Mega Construction Projects in Uncertain Environments",
      info: "ESCI Q2, IF=2.0",
      corresponding: ["Shitao Jin"],
    },
    {
      title: "A Value-Based Programming Framework for Enhancing Children's Well-Being in Urban Communities",
      info: "AHCI Q1, IF=4.4",
      corresponding: ["Shitao Jin"],
    },
    {
      title: "Evolving Public Perceptions of the Renewal of Suzhou Neighborhood Centers",
      info: "AHCI Q1, IF=4.4",
      corresponding: ["Xiaoming Zhu"],
    },
    {
      title: "Current Status and Trends of Megaproject Research",
      info: "SCIE/SSCI Q1, IF=4.5",
      corresponding: ["Shitao Jin"],
    },
    {
      title: "Measuring Complexity in Mega Construction Projects",
      info: "SCIE/SSCI Q1, IF=4.5",
      corresponding: ["Shitao Jin"],
    },
    {
      title: "Identification and Evaluation of Key Stakeholders in Mega Construction Projects",
      info: "SCIE/SSCI Q1, IF=4.5",
      corresponding: ["Shitao Jin"],
    },
    {
      title: "Interdisciplinary Perspective on Architectural Programming",
      info: "SCIE/SSCI Q1, IF=4.5",
      corresponding: ["Shitao Jin"],
    },
    {
      title: "The Application of Collective Intelligence in the Construction Industry",
      info: "SCIE Q2, IF=2.8",
      corresponding: ["Shitao Jin"],
    },
    {
      title: "Current Status and Research Progress in Architectural Programming",
      info: "AHCI Q1, IF=4.4",
      corresponding: ["Shitao Jin"],
    },
  ];

  const normalize = (value) => value.replace(/\s+/g, " ").trim().toLowerCase();

  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const markCorrespondingAuthors = (authorLine, names) => {
    if (!authorLine || authorLine.dataset.correspondingMarked === "true") return;

    let html = authorLine.innerHTML;
    names.forEach((name) => {
      html = html.replace(new RegExp(`(${escapeRegExp(name)})(?!\\*)`, "g"), "$1*");
    });
    authorLine.innerHTML = html;
    authorLine.dataset.correspondingMarked = "true";
  };

  const addCorrespondingNote = () => {
    document.querySelectorAll("ol.bibliography").forEach((list) => {
      if (list.previousElementSibling?.classList?.contains("corresponding-note")) return;
      list.insertAdjacentHTML("beforebegin", '<div class="corresponding-note">* Corresponding author</div>');
    });
  };

  const addMetricLine = () => {
    addCorrespondingNote();

    document.querySelectorAll("ol.bibliography > li").forEach((item) => {
      const itemText = normalize(item.textContent);
      const metric = publicationMetrics.find((entry) => itemText.includes(normalize(entry.title)));
      if (!metric) return;

      markCorrespondingAuthors(item.querySelector(".author"), metric.corresponding);

      if (item.querySelector(".publication-metrics")) return;

      const metricLine = document.createElement("div");
      metricLine.className = "publication-metrics";
      metricLine.innerHTML = `<span class="metric-pill">${metric.info}</span>`;

      const periodical = item.querySelector(".periodical");
      const insertAfter = periodical || item.querySelector(".author") || item.querySelector(".title");
      if (insertAfter) {
        insertAfter.insertAdjacentElement("afterend", metricLine);
      } else {
        item.prepend(metricLine);
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addMetricLine);
  } else {
    addMetricLine();
  }
})();
