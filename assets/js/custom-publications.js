(function () {
  const publicationImageBase = "/assets/img/publications/";
  const publicationImageVersion = "20260629";

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
      title: "A Deep Learning-Based Evaluation System for Child-Friendly Urban Streets",
      info: "SCIE Q2, IF=2.8",
      corresponding: ["Huijun Tu", "Xudong Miao"],
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
      corresponding: ["Huijun Tu"],
    },
    {
      title: "Deep Learning-Based Systems for Evaluating and Enhancing Child-Friendliness of Urban Streets",
      info: "SCIE Q2, IF=3.4",
      corresponding: ["Huijun Tu", "Xudong Miao"],
    },
    {
      title: "Exploration of the Applications of Next-Generation Artificial Intelligence in Architectural Creation",
      info: "CNKI, IF=0.4",
      corresponding: ["Huijun Tu"],
    },
    {
      title: "Enhancing Architectural Education Through Artificial Intelligence",
      info: "SCIE Q2, IF=3.4",
      corresponding: ["Huijun Tu"],
    },
    {
      title: "A Group Decision-Making Model for Architectural Programming in Megaprojects",
      info: "SCIE/SSCI Q1, IF=4.5",
      corresponding: ["Huijun Tu"],
    },
    {
      title: "Classroom Perception in Higher Education",
      info: "SSCI Q1, IF=3.8",
      corresponding: ["Lei Peng"],
    },
    {
      title: "Students' Perceptions of Active Learning Classrooms from an Informal Learning Perspective",
      info: "SCIE/SSCI Q2, IF=4.1",
      corresponding: ["Shitao Jin"],
    },
    {
      title: "Student Experience and Satisfaction in Academic Libraries",
      info: "SCIE Q2, IF=3.4",
      corresponding: ["Wenyi Fan"],
    },
    {
      title: "The Evaluation of Active Learning Classrooms",
      info: "SCIE/SSCI Q2, IF=4.1",
      corresponding: ["Shitao Jin"],
    },
    {
      title: "Analysis of Campus Learning Environment Elements for Promoting Innovative Talent Cultivation",
      info: "CNKI, IF=1.3",
      corresponding: ["Lei Peng"],
    },
    {
      title: "Collective Intelligence in Architectural Programming",
      corresponding: ["Shitao Jin"],
    },
    {
      title: "Reprogramming Urban Communities",
      corresponding: ["Shitao Jin"],
    },
  ];

  const normalize = (value) => value.replace(/\s+/g, " ").trim().toLowerCase();

  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const encodePath = (value) => value.split("/").map(encodeURIComponent).join("/");

  const previewFilename = (image) => {
    const fromAlt = image.getAttribute("alt");
    if (fromAlt) return fromAlt;

    const src = image.getAttribute("src") || "";
    return decodeURIComponent(src.split("/").pop().split("?")[0]);
  };

  const publicationImageUrl = (filename) => `${publicationImageBase}${encodePath(filename)}?v=${publicationImageVersion}`;

  const closePublicationLightbox = () => {
    const lightbox = document.querySelector(".publication-lightbox");
    if (!lightbox) return;

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("hidden", "");
    document.body.classList.remove("publication-lightbox-open");
  };

  const openPublicationLightbox = (src, label) => {
    let lightbox = document.querySelector(".publication-lightbox");
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.className = "publication-lightbox";
      lightbox.setAttribute("hidden", "");
      lightbox.innerHTML = `
        <div class="publication-lightbox__frame" role="dialog" aria-modal="true">
          <button class="publication-lightbox__close" type="button" aria-label="Close preview">×</button>
          <img class="publication-lightbox__image" alt="">
        </div>
      `;
      document.body.appendChild(lightbox);

      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox || event.target.classList.contains("publication-lightbox__close")) {
          closePublicationLightbox();
        }
      });
    }

    const frame = lightbox.querySelector(".publication-lightbox__frame");
    const image = lightbox.querySelector(".publication-lightbox__image");
    image.onload = () => {
      frame.style.setProperty("--publication-lightbox-width", image.naturalWidth);
      frame.style.setProperty("--publication-lightbox-height", image.naturalHeight);
    };
    image.src = src;
    image.alt = label;

    lightbox.removeAttribute("hidden");
    lightbox.classList.add("is-open");
    document.body.classList.add("publication-lightbox-open");
  };

  const preparePublicationPreviews = () => {
    document.querySelectorAll(".publications img.preview").forEach((image) => {
      if (image.dataset.publicationPreviewReady === "true") return;

      const filename = previewFilename(image);
      const source = publicationImageUrl(filename);
      const cleanImage = image.cloneNode(true);
      cleanImage.classList.remove("medium-zoom-image", "medium-zoom-image--opened");
      cleanImage.src = source;
      cleanImage.dataset.fullSrc = source;
      cleanImage.dataset.previewFilename = filename;
      cleanImage.dataset.publicationPreviewReady = "true";
      cleanImage.setAttribute("role", "button");
      cleanImage.setAttribute("tabindex", "0");
      cleanImage.setAttribute("aria-label", `Open publication preview: ${filename}`);

      const open = (event) => {
        event.preventDefault();
        event.stopPropagation();
        openPublicationLightbox(source, filename);
      };

      cleanImage.addEventListener("click", open, true);
      cleanImage.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") open(event);
      });

      image.replaceWith(cleanImage);
    });
  };

  const markCorrespondingAuthors = (authorLine, names = []) => {
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

  const enhancePublications = () => {
    preparePublicationPreviews();
    addCorrespondingNote();

    document.querySelectorAll("ol.bibliography > li").forEach((item) => {
      const itemText = normalize(item.textContent);
      const metric = publicationMetrics.find((entry) => itemText.includes(normalize(entry.title)));
      if (!metric) return;

      markCorrespondingAuthors(item.querySelector(".author"), metric.corresponding);

      if (!metric.info || item.querySelector(".publication-metrics")) return;

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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePublicationLightbox();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhancePublications);
  } else {
    enhancePublications();
  }
})();
