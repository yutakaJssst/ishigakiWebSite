(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const target = link.getAttribute("href");
    if (!target) {
      return;
    }
    if (target === path || (path === "" && target === "index.html")) {
      link.classList.add("current");
    }
  });

  const revealEls = [...document.querySelectorAll(".reveal")];
  if (revealEls.length === 0) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -5% 0px"
    }
  );

  revealEls.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 70, 320)}ms`;
    observer.observe(el);
  });
})();
