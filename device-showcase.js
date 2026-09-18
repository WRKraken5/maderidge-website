// MadeRidge Website Design -- 3D device showcase.
// Drives a CSS custom property (--progress, 0-1) on .device-rig from the
// user's scroll position through .device-showcase. The CSS reads
// --progress to interpolate rotateX/rotateY/translateZ on the monitor and
// phone (see styles.css), so the devices rotate into a front-facing pose
// as the section scrolls through view. GPU-only (transform), no library.
// Fully disabled when the user prefers reduced motion.

(function () {
  var section = document.querySelector(".device-showcase");
  var rig = document.querySelector(".device-rig");
  if (!section || !rig) return;

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  var ticking = false;

  function update() {
    var rect = section.getBoundingClientRect();
    var viewportHeight = window.innerHeight;
    var total = rect.height + viewportHeight;
    var raw = (viewportHeight - rect.top) / total;
    var progress = Math.min(1, Math.max(0, raw));
    rig.style.setProperty("--progress", progress.toFixed(3));
    ticking = false;
  }

  function onScrollOrResize() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  update();
})();
