(function () {
  // AOS
  if (window.AOS) AOS.init({ once: true });

  // Category mapping from CSV to filters
  const mapCategory = (value) => {
    const s = String(value || "").toLowerCase();
    if (s.includes("community")) return ["community", "Community"];
    if (s.includes("club")) return ["club", "Club Service"];
    if (s.includes("professional")) return ["professional", "Professional Dev"];
    if (s.includes("international")) return ["international", "International"];
    if (s.includes("fellow")) return ["fellowship", "Fellowship"];
    return ["other", value || "Other"];
  };

  // Date -> pretty
  const prettyDate = (s) => {
    if (!s) return "";
    const d = new Date(s);
    if (isNaN(d)) return "";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // HTML escape
  const escapeHtml = (str) =>
    String(str || "").replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m])
    );

  // Slug
  const slugify = (s) =>
    String(s || "project")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "project";

  const grid = document.getElementById("projectsGrid");
  const modalContainer = document.getElementById("projectModals");

  // Read CSV path from template
  const csvTemplate = document.getElementById("projectsCsvPath");
  const csvPath =
    (csvTemplate && (csvTemplate.textContent || "").trim()) ||
    "assets/data/projects-2025-26.csv";

  let CURRENT_CAT = "all";
  let CURRENT_STATUS = "all";
  let PROJECTS = [];
  let lightbox;

  // Ensure every .glx link to #id is treated as inline for GLightbox
  const markInlineLinks = (root = document) => {
    root
      .querySelectorAll('a.glx[href^="#"]')
      .forEach((a) => a.setAttribute("data-type", "inline"));
  };

  const buildCard = (p) => {
    const meta = [prettyDate(p.start_date), p.venue]
      .filter(Boolean)
      .join(" • ");
    const statusBadge =
      p.status === "completed"
        ? "success"
        : p.status === "ongoing"
        ? "warning"
        : p.status === "upcoming"
        ? "info"
        : "secondary";

    return `
      <div class="col-12 col-sm-6 col-lg-4 project"
           data-cat="${p.category}" data-status="${
      p.status
    }" data-title="${escapeHtml(p.name)}">
        <article class="project-card h-100">
          <div class="thumb ratio ratio-16x9">
            <img src="${p.cover}" alt="${escapeHtml(p.name)}" loading="lazy">
          </div>
          <div class="body">
            <div class="tags">
              <span class="badge text-bg-light">${p.category_label}</span>
              <span class="badge text-bg-${statusBadge}">${
      p.status_label
    }</span>
            </div>
            <h3 class="h5 mt-2 mb-1">${escapeHtml(p.name)}</h3>
            <p class="meta small text-muted">${escapeHtml(meta)}</p>
            <p class="desc">${escapeHtml(p.description)}</p>
            <div class="actions">
              <a class="btn btn-primary btn-sm glx" href="#p-${
                p.slug
              }" data-type="inline">Details</a>
            </div>
          </div>
        </article>
      </div>`;
  };

  const buildModal = (p) => {
    return `
      <div id="p-${p.slug}" class="glightbox-desc">
        <div class="project-modal">
          <h3 class="mb-2">${escapeHtml(p.name)}</h3>
          <p class="text-muted small mb-3">${p.category_label} • ${
      p.status_label
    }</p>
          <img class="mb-3 rounded" src="${p.cover}" alt="">
          ${p.description ? `<p>${escapeHtml(p.description)}</p>` : ""}
          ${
            p.start_date
              ? `<p class="small text-muted mt-2">Date: ${prettyDate(
                  p.start_date
                )}</p>`
              : ""
          }
          ${
            p.venue
              ? `<p class="small text-muted">Venue: ${escapeHtml(p.venue)}</p>`
              : ""
          }
        </div>
      </div>`;
  };

  const applyFilters = () => {
    const items = grid.querySelectorAll(".project");
    items.forEach((el) => {
      const cat = el.getAttribute("data-cat");
      const status = el.getAttribute("data-status");
      const show =
        (CURRENT_CAT === "all" || cat === CURRENT_CAT) &&
        (CURRENT_STATUS === "all" || status === CURRENT_STATUS);
      el.classList.toggle("d-none", !show);
    });
  };

  const render = () => {
    grid.innerHTML = PROJECTS.map(buildCard).join("");
    modalContainer.innerHTML = PROJECTS.map(buildModal).join("");

    // Make sure inline links are marked correctly
    markInlineLinks(document);

    // Re-init lightbox for new DOM
    if (lightbox && typeof lightbox.destroy === "function") lightbox.destroy();
    lightbox = GLightbox({
      selector: ".glx",
      openEffect: "zoom",
      closeEffect: "zoom",
      touchNavigation: true,
    });

    applyFilters();
  };

  const wireFilters = () => {
    // Category buttons
    document.querySelectorAll(".project-controls [data-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".project-controls [data-cat]")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        CURRENT_CAT = btn.getAttribute("data-cat");
        applyFilters();
      });
    });

    // Status buttons
    document
      .querySelectorAll(".project-controls [data-status]")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll(".project-controls [data-status]")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          CURRENT_STATUS = btn.getAttribute("data-status");
          applyFilters();
        });
      });
  };

  const firstNonEmpty = (obj, keys, fallback = "") => {
    for (const k of keys) {
      const v = (obj[k] ?? "").toString().trim();
      if (v) return v;
    }
    return fallback;
  };

  const loadCsv = async () => {
    try {
      const res = await fetch(csvPath, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status} loading ${csvPath}`);
      const csvText = await res.text();

      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });
      const rows = parsed?.data || [];

      PROJECTS = rows
        .map((r) => {
          const name = firstNonEmpty(
            r,
            ["Name", "Project Name", "Title"],
            "Untitled Project"
          );
          const [category, category_label] = mapCategory(
            firstNonEmpty(r, ["Avenues of Service", "Avenue", "Category"], "")
          );
          const desc = firstNonEmpty(
            r,
            ["Description", "Brief", "Summary"],
            ""
          );
          const start = firstNonEmpty(r, ["Start Date", "Date"], "");
          const venue = firstNonEmpty(r, ["Venue", "Location", "Place"], "");

          let cover = firstNonEmpty(
            r,
            ["Cover Photo", "Cover", "Image", "Photo"],
            "assets/img/placeholder-16x9.png"
          );
          if (cover.includes(",") || cover.includes(";")) {
            cover = cover.split(/[;,]/)[0].trim();
          }

          const statusCsv = firstNonEmpty(r, ["Status"], "").toLowerCase();
          const status = ["upcoming", "ongoing", "completed"].includes(
            statusCsv
          )
            ? statusCsv
            : "completed";
          const status_label =
            status === "completed"
              ? "Completed"
              : status === "ongoing"
              ? "Ongoing"
              : "Upcoming";

          return {
            name,
            category,
            category_label,
            status,
            status_label,
            cover,
            description: desc,
            start_date: start,
            venue,
            slug: slugify(name),
          };
        })
        // 🔽 Newest first; invalid/missing dates go to the bottom
        .sort(
          (a, b) =>
            (Date.parse(b.start_date) || 0) - (Date.parse(a.start_date) || 0)
        );

      render();
    } catch (err) {
      console.error(err);
      grid.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning mb-0">
          Could not load <code>${escapeHtml(csvPath)}</code>.<br>
          <small>${escapeHtml(err.message || err.toString())}</small>
        </div>
      </div>`;
    }
  };

  wireFilters();

  // For any pre-existing .glx links (like PDF previews) make them inline too
  markInlineLinks(document);
  GLightbox({ selector: ".glx" });

  loadCsv();
})();
