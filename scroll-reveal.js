// MadeRidge Website Design -- lightweight scroll animation system.
// Vanilla IntersectionObserver, no external libraries. Reveals each
// .animate-on-scroll element once, then stops observing it (no
// re-animating on scroll-back-up). Fully disabled when the user
// prefers reduced motion.

(function () {
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var animatedEls = document.querySelectorAll(".animate-on-scroll");
  if (!animatedEls.length) return;

  // Reduced motion, or no IntersectionObserver support: show everything
  // immediately, no animation, no observer.
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    animatedEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedEls.forEach(function (el) {
    observer.observe(el);
  });
})();
