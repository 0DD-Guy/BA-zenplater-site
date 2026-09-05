(() => {
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // subtle parallax on the hero ring
  const ring = document.querySelector(".ring");
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (ticking || !ring || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, 500);
      ring.style.transform = `translateY(${y * 0.035}px) rotate(${y * 0.008}deg)`;
      ticking = false;
    });
  }, { passive: true });
})();
