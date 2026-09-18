/* ============================================================
   INTRO / 01 — Reveal orchestration
   - Uses IntersectionObserver for scroll-based reveals.
   - On initial load, elements inside the viewport reveal
     with their CSS-defined stagger delays.
   - The abstract visual uses a soft clip-path reveal defined
     in CSS; JS only toggles the .is-visible class.
   ============================================================ */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ── 1. Title line-by-line reveal ─────────────────────── */
  const title = document.querySelector(".intro__title");
  if (title && !prefersReduced) {
    // Trigger on next frame so the initial translateY(110%)
    // paints first, then animates.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => title.classList.add("is-visible"));
    });
  } else if (title) {
    title.classList.add("is-visible");
  }

  /* ── 2. Generic reveal observer ───────────────────────── */
  const revealTargets = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08,
    }
  );

  revealTargets.forEach((el) => observer.observe(el));
})();