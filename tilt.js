// MadeRidge Website Design -- pointer-driven 3D card tilt.
// Adds a subtle rotateX/rotateY tilt to .work-card and .stacked-list-item
// as the mouse moves over them (GPU-only transform). Only runs on
// fine-pointer, hover-capable devices, and never when the user prefers
// reduced motion -- touch devices keep their plain CSS :hover lift.

(function () {
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  var supportsHoverTilt = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;
  if (prefersReducedMotion || !supportsHoverTilt) return;

  var cards = document.querySelectorAll(".work-card, .stacked-list-item");
  if (!cards.length) return;

  var MAX_TILT_DEG = 6;

  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      var rect = card.getBoundingClientRect();
      var px = (event.clientX - rect.left) / rect.width;
      var py = (event.clientY - rect.top) / rect.height;
      var rotateY = (px - 0.5) * MAX_TILT_DEG * 2;
      var rotateX = (0.5 - py) * MAX_TILT_DEG * 2;
      card.style.transform =
        "translateY(-4px) rotateX(" +
        rotateX.toFixed(2) +
        "deg) rotateY(" +
        rotateY.toFixed(2) +
        "deg)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });
})();
