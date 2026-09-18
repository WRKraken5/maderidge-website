// MadeRidge Website Design -- floating "get estimate" CTA.
// Fades the fixed CTA button in once the hero has scrolled out of view,
// nudging the visitor toward the estimator quiz at the bottom of the
// page, and fades it out again once the quiz section itself is on
// screen (its own button is already visible then).

(function () {
  var cta = document.getElementById("scroll-cta");
  var hero = document.querySelector(".hero");
  var contact = document.getElementById("contact");
  if (!cta || !hero || !contact) return;

  var ticking = false;

  function update() {
    var heroBottom = hero.getBoundingClientRect().bottom;
    var contactTop = contact.getBoundingClientRect().top;
    var show = heroBottom < 0 && contactTop > window.innerHeight * 0.5;
    cta.classList.toggle("is-visible", show);
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
