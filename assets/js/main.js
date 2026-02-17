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
  if (revealEls.length > 0) {
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
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
    }
  }

  const pdfItems = [...document.querySelectorAll("[data-pdf-item]")];
  if (pdfItems.length === 0 || window.location.protocol === "file:") {
    return;
  }

  const checkPdfExists = async (path) => {
    let shouldTryGet = false;
    try {
      const headRes = await fetch(path, { method: "HEAD", cache: "no-store" });
      if (headRes.ok) {
        return true;
      }
      if (headRes.status !== 405) {
        return false;
      }
      shouldTryGet = true;
    } catch {
      shouldTryGet = true;
    }

    if (!shouldTryGet) {
      return false;
    }

    try {
      const getRes = await fetch(path, {
        method: "GET",
        cache: "no-store",
        headers: { Range: "bytes=0-0" }
      });
      return getRes.ok;
    } catch {
      return false;
    }
  };

  const markAsPending = (item) => {
    const statusEl = item.querySelector("[data-pdf-status]");
    if (statusEl) {
      statusEl.textContent = "準備中";
      statusEl.classList.remove("status-live");
    }

    item.querySelectorAll("[data-pdf-link]").forEach((link) => {
      link.classList.add("is-disabled");
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("tabindex", "-1");
      link.removeAttribute("href");
      link.removeAttribute("target");
      link.removeAttribute("download");
    });
  };

  pdfItems.forEach(async (item) => {
    const path = item.getAttribute("data-pdf-path");
    if (!path) {
      return;
    }

    const exists = await checkPdfExists(path);
    if (!exists) {
      markAsPending(item);
    }
  });
})();
