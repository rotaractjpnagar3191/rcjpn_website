/**
 * Author: Samarth Viswanath
 */

(function () {
  "use strict";

  /** Apply .scrolled on body when header is sticky and page scrolls */
  function toggleScrolled() {
    const body = document.body;
    const header = document.querySelector("#header");
    if (
      !header ||
      (!header.classList.contains("scroll-up-sticky") &&
        !header.classList.contains("sticky-top") &&
        !header.classList.contains("fixed-top"))
    )
      return;
    window.scrollY > 100
      ? body.classList.add("scrolled")
      : body.classList.remove("scrolled");
  }
  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /** Mobile nav toggle */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
  function mobileNavToogle() {
    document.body.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /** Hide mobile nav on same-page/hash links */
  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /** Toggle mobile nav dropdowns */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((toggler) => {
    toggler.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /** Preloader */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  /** Scroll top button */
  const scrollTop = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (!scrollTop) return;
    window.scrollY > 100
      ? scrollTop.classList.add("active")
      : scrollTop.classList.remove("active");
  }
  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /** AOS */
  function aosInit() {
    if (window.AOS) {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }
  }
  window.addEventListener("load", aosInit);

  /**
   * Swiper presets (no inline HTML JSON needed)
   * - Hero: fade, autoplay, lazy, loop
   */
  const SWIPER_PRESETS = {
    hero: (el) => ({
      loop: true,
      speed: 700,
      effect: "fade",
      fadeEffect: { crossFade: true },
      autoplay: { delay: 4500, disableOnInteraction: false },
      preloadImages: false,
      watchSlidesProgress: true,
      lazy: { loadPrevNext: true, loadOnTransitionStart: true },
      pagination: {
        el: el.querySelector(".hero-pagination"),
        type: "bullets",
        clickable: true,
      },
      navigation: {
        nextEl: el.querySelector(".hero-next"),
        prevEl: el.querySelector(".hero-prev"),
      },
      a11y: { enabled: true },
    }),
  };

  /**
   * Init Swipers:
   * - If .swiper-config is present, parse and use it (back-compat).
   * - Else if element matches a known preset (hero-swiper), use preset.
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (el) {
      let cfg = {};
      try {
        cfg = JSON.parse(el.querySelector(".swiper-config").textContent.trim());
      } catch (e) {
        /* keep defaults */
      }

      // Sensible defaults for all swipers
      cfg.preloadImages = false;
      cfg.watchSlidesProgress = true;
      cfg.lazy = Object.assign(
        { loadPrevNext: true, loadOnTransitionStart: true },
        cfg.lazy || {}
      );
      cfg.autoplay = Object.assign(
        { delay: 4500, disableOnInteraction: false },
        cfg.autoplay || {}
      );
      cfg.allowTouchMove = true;
      cfg.simulateTouch = true;
      cfg.grabCursor = true;

      // Scope navigation to this swiper element (prevents “arrows not working”)
      if (cfg.navigation) {
        const prev = el.querySelector(".swiper-button-prev, .hero-prev");
        const next = el.querySelector(".swiper-button-next, .hero-next");
        cfg.navigation = { prevEl: prev, nextEl: next };
      }

      // Scope pagination too
      if (cfg.pagination) {
        const pag = el.querySelector(".swiper-pagination, .hero-pagination");
        cfg.pagination = Object.assign(
          { el: pag, clickable: true },
          cfg.pagination
        );
      }

      // Initialize
      const instance = new Swiper(el, cfg);

      // Pause on hover for desktops only
      if (instance.autoplay && window.matchMedia("(hover:hover)").matches) {
        el.addEventListener("mouseenter", () => instance.autoplay.stop());
        el.addEventListener("mouseleave", () => instance.autoplay.start());
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /** GLightbox */
  if (window.GLightbox) {
    GLightbox({ selector: ".glightbox" });
  }

  // Init AOS (if not already initialized in main.js)
  try {
    AOS.init({ once: true, duration: 600, easing: "ease-out" });
  } catch (e) {}

  // Init GLightbox
  const brandLightbox = GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: false,
  });

  /** Isotope layout and filters */
  document.querySelectorAll(".isotope-layout").forEach(function (isoWrap) {
    const layout = isoWrap.getAttribute("data-layout") ?? "masonry";
    const filter = isoWrap.getAttribute("data-default-filter") ?? "*";
    const sort = isoWrap.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    if (window.imagesLoaded && window.Isotope) {
      imagesLoaded(isoWrap.querySelector(".isotope-container"), function () {
        initIsotope = new Isotope(isoWrap.querySelector(".isotope-container"), {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        });
      });
    }

    isoWrap.querySelectorAll(".isotope-filters li").forEach(function (btn) {
      btn.addEventListener(
        "click",
        function () {
          isoWrap
            .querySelector(".isotope-filters .filter-active")
            .classList.remove("filter-active");
          this.classList.add("filter-active");
          if (initIsotope) {
            initIsotope.arrange({ filter: this.getAttribute("data-filter") });
          }
          if (typeof aosInit === "function") aosInit();
        },
        false
      );
    });
  });

  /** Pure Counter */
  if (window.PureCounter) new PureCounter();

  /** Correct hash-scroll position after load */
  window.addEventListener("load", function () {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          const scrollMarginTop = parseInt(
            getComputedStyle(section).scrollMarginTop || "0",
            10
          );
          window.scrollTo({
            top: section.offsetTop - scrollMarginTop,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  // AOS + GLightbox
AOS.init({ once: true });
const gl = GLightbox({ selector: '.glx' });

// Filters
(function(){
  const grid = document.getElementById('brandGrid');
  const filterBtns = document.querySelectorAll('.filters .btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-filter');
      const cards = grid.querySelectorAll('.brand-card');

      cards.forEach(card => {
        if (target === 'all') {
          card.classList.remove('hidden');
        } else {
          // we look in data-groups attr or in classList
          const groups = (card.getAttribute('data-groups') || card.className).toLowerCase();
          groups.includes(target) ? card.classList.remove('hidden') : card.classList.add('hidden');
        }
      });
    });
  });

  // Preview background toggle
  const bgBtns = document.querySelectorAll('[data-bg]');
  bgBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bgBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const bg = btn.getAttribute('data-bg');
      grid.classList.remove('bg-light','bg-dark','bg-checker');
      grid.classList.add(`bg-${bg}`);
    });
  });
})();


  /** Auto-set active nav item based on current page */
  (function () {
    const path = (
      location.pathname.split("/").pop() || "index.html"
    ).toLowerCase();
    document.querySelectorAll("#navmenu a").forEach((a) => {
      const href = (a.getAttribute("href") || "").split("#")[0].toLowerCase();
      if (href && href === path) {
        document
          .querySelectorAll("#navmenu a.active")
          .forEach((x) => x.classList.remove("active"));
        a.classList.add("active");
      }
    });
  })();

  /** Navmenu Scrollspy */
  const navmenulinks = document.querySelectorAll(".navmenu a");
  function navmenuScrollspy() {
    const pos = window.scrollY + 200;
    navmenulinks.forEach((l) => {
      if (!l.hash) return;
      const section = document.querySelector(l.hash);
      if (!section) return;
      if (
        pos >= section.offsetTop &&
        pos <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        l.classList.add("active");
      } else {
        l.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();
