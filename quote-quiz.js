// MadeRidge Website Design -- Project Cost Estimator quiz.
// Vanilla JS, no dependencies, no external calls except the existing
// Formspree endpoint on final submit. Renders a multi-step quiz into
// #quote-quiz, keeps a live running price estimate as the user answers,
// then reveals a price + a minimal lead-capture form on the final step.

(function () {
  "use strict";

  var FORM_ENDPOINT = "https://formspree.io/f/mjykbogl";

  var TIER_PRICE = { base: 450, mid: 750, max: 1000 };
  var TIER_LABEL = { base: "Essential", mid: "Mid-tier", max: "Max / custom" };

  var QUIZ_STEPS = [
    {
      id: "scope",
      question: "What kind of site are you looking to build?",
      options: [
        { value: "A", tier: "base", label: "Single-page site / landing page" },
        { value: "B", tier: "mid", label: "Standard multi-page site" },
        { value: "C", tier: "max", label: "Fully custom business showcase" }
      ]
    },
    {
      id: "style",
      question: "What visual style and level of customization are you after?",
      options: [
        { value: "A", tier: "base", label: "Clean & standard template" },
        { value: "B", tier: "mid", label: "Modern, high-contrast, with custom animations" },
        { value: "C", tier: "max", label: "Premium cinematic aesthetic with custom media/video" }
      ]
    },
    {
      id: "content",
      question: "Where do things stand with your content?",
      options: [
        { value: "A", tier: "base", label: "I have all text and photos ready to go" },
        { value: "B", tier: "mid", label: "I need help organizing and styling my content" },
        { value: "C", tier: "max", label: "I need full copy tweaking and custom asset design" }
      ]
    },
    {
      id: "features",
      question: "What additional features do you need?",
      options: [
        { value: "A", tier: "base", label: "Essential contact form & mobile optimization" },
        { value: "B", tier: "mid", label: "Interactive elements, micro-animations & FAQ" },
        { value: "C", tier: "max", label: "Advanced lead-capture quiz & custom components" }
      ]
    },
    {
      id: "timeline",
      question: "What is your ideal turnaround?",
      options: [
        { value: "A", tier: "base", label: "Standard turnaround (2–3 weeks)" },
        { value: "B", tier: "mid", label: "Priority delivery (1–2 weeks)" },
        { value: "C", tier: "max", label: "Expedited launch (under 1 week)" }
      ]
    }
  ];

  var root = document.getElementById("quote-quiz");
  if (!root) return;

  var stepsEl = document.getElementById("quiz-steps");
  var progressWrap = root.querySelector(".quiz-progress");
  var progressFill = document.getElementById("quiz-progress-fill");
  var progressLabel = document.getElementById("quiz-progress-label");
  var liveEstimateWrap = document.getElementById("quiz-live-estimate");
  var liveEstimateValue = document.getElementById("quiz-live-estimate-value");
  var gateOverlay = document.getElementById("quiz-gate-overlay");

  var TOTAL_QUESTION_STEPS = QUIZ_STEPS.length;

  var answers = {}; // { stepId: { value, tier, label } }
  var currentStep = 0;
  var submitted = false;

  // Live running estimate: average of tiers answered so far, snapped to the
  // nearest of the three published price points. Updates after every click.
  function liveEstimate() {
    var keys = Object.keys(answers);
    if (!keys.length) return TIER_PRICE.base;
    var total = 0;
    keys.forEach(function (k) {
      total += TIER_PRICE[answers[k].tier];
    });
    var avg = total / keys.length;
    var points = [TIER_PRICE.base, TIER_PRICE.mid, TIER_PRICE.max];
    var closest = points[0];
    points.forEach(function (p) {
      if (Math.abs(p - avg) < Math.abs(closest - avg)) closest = p;
    });
    return closest;
  }

  // Final estimate: majority tier across all five answers wins. Ties
  // resolve to the higher tier so a genuinely mixed-tier project is never
  // underquoted.
  function finalTier() {
    var counts = { base: 0, mid: 0, max: 0 };
    Object.keys(answers).forEach(function (k) {
      counts[answers[k].tier]++;
    });
    var order = ["base", "mid", "max"];
    var winner = "base";
    order.forEach(function (tier) {
      if (counts[tier] >= counts[winner]) winner = tier;
    });
    return winner;
  }

  function formatPrice(n) {
    return "$" + n.toLocaleString("en-US");
  }

  function render() {
    stepsEl.innerHTML = "";

    if (currentStep < TOTAL_QUESTION_STEPS) {
      renderQuestionStep(QUIZ_STEPS[currentStep], currentStep);
    } else {
      renderFinalStep();
    }

    updateProgress();
  }

  function updateProgress() {
    if (currentStep < TOTAL_QUESTION_STEPS) {
      var pct = (currentStep / TOTAL_QUESTION_STEPS) * 100;
      progressFill.style.width = pct + "%";
      progressLabel.textContent = "Step " + (currentStep + 1) + " of " + TOTAL_QUESTION_STEPS;
    } else {
      progressFill.style.width = "100%";
      progressLabel.textContent = "Your estimate";
    }

    var answeredCount = Object.keys(answers).length;
    if (answeredCount > 0) {
      liveEstimateWrap.hidden = false;
      liveEstimateValue.textContent = formatPrice(liveEstimate());
    } else {
      liveEstimateWrap.hidden = true;
    }
  }

  function renderQuestionStep(step, index) {
    var card = document.createElement("div");
    card.className = "quiz-card";

    var h3 = document.createElement("h3");
    h3.className = "quiz-question";
    h3.id = "quiz-question-" + step.id;
    h3.textContent = step.question;
    card.appendChild(h3);

    var group = document.createElement("div");
    group.className = "quiz-options";
    group.setAttribute("aria-labelledby", h3.id);

    step.options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      var isSelected = answers[step.id] && answers[step.id].value === opt.value;
      btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
      if (isSelected) btn.classList.add("is-selected");

      var label = document.createElement("span");
      label.className = "quiz-option-label";
      label.textContent = opt.label;
      btn.appendChild(label);

      btn.addEventListener("click", function () {
        answers[step.id] = { value: opt.value, tier: opt.tier, label: opt.label };
        currentStep = index + 1;
        render();
      });

      group.appendChild(btn);
    });

    card.appendChild(group);

    var nav = document.createElement("div");
    nav.className = "quiz-nav";
    if (index > 0) {
      var back = document.createElement("button");
      back.type = "button";
      back.className = "btn btn-secondary btn-sm quiz-back";
      back.textContent = "Back";
      back.addEventListener("click", function () {
        currentStep = index - 1;
        render();
      });
      nav.appendChild(back);
    }
    card.appendChild(nav);

    stepsEl.appendChild(card);
  }

  function renderFinalStep() {
    var tier = finalTier();
    var price = TIER_PRICE[tier];

    var card = document.createElement("div");
    card.className = "quiz-card quiz-card-final";

    var reveal = document.createElement("div");
    reveal.className = "quiz-reveal";

    var priceLabel = document.createElement("p");
    priceLabel.className = "quiz-price-label";
    priceLabel.textContent = "Your estimated investment";
    reveal.appendChild(priceLabel);

    var priceValue = document.createElement("p");
    priceValue.className = "quiz-price-value";
    priceValue.textContent = "~" + formatPrice(price);
    reveal.appendChild(priceValue);

    var tierNote = document.createElement("p");
    tierNote.className = "quiz-tier-note";
    tierNote.textContent = TIER_LABEL[tier] + " tier, based on your answers below.";
    reveal.appendChild(tierNote);

    card.appendChild(reveal);

    var summary = document.createElement("ul");
    summary.className = "quiz-summary";
    QUIZ_STEPS.forEach(function (step) {
      var a = answers[step.id];
      if (!a) return;
      var li = document.createElement("li");
      li.textContent = a.label;
      summary.appendChild(li);
    });
    card.appendChild(summary);

    var editNav = document.createElement("div");
    editNav.className = "quiz-nav";
    var back = document.createElement("button");
    back.type = "button";
    back.className = "btn btn-secondary btn-sm quiz-back";
    back.textContent = "Back";
    back.addEventListener("click", function () {
      currentStep = TOTAL_QUESTION_STEPS - 1;
      render();
    });
    editNav.appendChild(back);
    card.appendChild(editNav);

    card.appendChild(buildLeadForm(tier, price));

    stepsEl.appendChild(card);
  }

  function buildField(type, id, name, labelText, required, autocomplete) {
    var field = document.createElement("div");
    field.className = "field";
    var label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = labelText;
    var input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = name;
    if (required) input.required = true;
    if (autocomplete) input.autocomplete = autocomplete;
    field.appendChild(label);
    field.appendChild(input);
    return field;
  }

  function buildLeadForm(tier, price) {
    var wrap = document.createElement("div");
    wrap.className = "quiz-lead-form-wrap";

    var heading = document.createElement("h4");
    heading.textContent = "Get this estimate by email";
    wrap.appendChild(heading);

    var form = document.createElement("form");
    form.className = "quiz-lead-form";
    form.setAttribute("novalidate", "");

    // Honeypot: real users never see or fill this field.
    var hp = document.createElement("div");
    hp.className = "hp-field";
    hp.setAttribute("aria-hidden", "true");
    var hpLabel = document.createElement("label");
    hpLabel.setAttribute("for", "quiz-website");
    hpLabel.textContent = "Leave this field blank";
    var hpInput = document.createElement("input");
    hpInput.type = "text";
    hpInput.id = "quiz-website";
    hpInput.name = "website";
    hpInput.tabIndex = -1;
    hpInput.autocomplete = "off";
    hp.appendChild(hpLabel);
    hp.appendChild(hpInput);
    form.appendChild(hp);

    form.appendChild(buildField("text", "quiz-name", "name", "Name", true, "name"));
    form.appendChild(buildField("email", "quiz-email", "email", "Email", true, "email"));
    form.appendChild(buildField("tel", "quiz-phone", "phone", "Phone (optional)", false, "tel"));

    var notesField = document.createElement("div");
    notesField.className = "field";
    var notesLabel = document.createElement("label");
    notesLabel.setAttribute("for", "quiz-notes");
    notesLabel.textContent = "Anything else we should know? (optional)";
    var notesArea = document.createElement("textarea");
    notesArea.id = "quiz-notes";
    notesArea.name = "notes";
    notesArea.rows = 3;
    notesField.appendChild(notesLabel);
    notesField.appendChild(notesArea);
    form.appendChild(notesField);

    var submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "btn";
    submitBtn.textContent = "Send me this estimate";
    form.appendChild(submitBtn);

    var status = document.createElement("p");
    status.className = "hint";
    status.id = "quiz-form-status";
    status.setAttribute("aria-live", "polite");
    form.appendChild(status);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (submitted) return;

      var honeypot = form.elements["website"];
      if (honeypot && honeypot.value) {
        status.textContent = "Thank you. We will be in touch.";
        return;
      }

      var name = form.elements["name"].value.trim();
      var email = form.elements["email"].value.trim();

      if (!name) {
        status.textContent = "Please enter your name.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Please enter a valid email address.";
        return;
      }

      var payload = {
        name: name,
        email: email,
        phone: form.elements["phone"].value.trim(),
        notes: form.elements["notes"].value.trim(),
        estimated_price: formatPrice(price),
        estimated_tier: TIER_LABEL[tier]
      };
      QUIZ_STEPS.forEach(function (step) {
        var a = answers[step.id];
        payload["quiz_" + step.id] = a ? a.label : "";
      });

      status.textContent = "Sending...";
      submitBtn.disabled = true;

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Submission failed.");
          submitted = true;
          status.textContent =
            "Thank you! We received your estimate request and will follow up within two business days.";
          form.reset();
          submitBtn.remove();
        })
        .catch(function () {
          status.textContent = "Something went wrong sending your request. Please email us directly instead.";
          submitBtn.disabled = false;
        });
    });

    wrap.appendChild(form);
    return wrap;
  }

  // The quiz collects lead data (submitted to Formspree on the final step),
  // so it stays gated behind cookie/data-collection consent. Undecided is
  // treated the same as declined: only an explicit "accepted" unlocks it.
  function isConsentAccepted() {
    return window.MadeRidgeConsent && window.MadeRidgeConsent.get() === "accepted";
  }

  function applyGate() {
    var unlocked = isConsentAccepted();

    if (gateOverlay) gateOverlay.hidden = unlocked;
    stepsEl.hidden = !unlocked;
    if (progressWrap) progressWrap.hidden = !unlocked;

    if (!unlocked) {
      liveEstimateWrap.hidden = true;
      stepsEl.innerHTML = "";
      return;
    }

    render();
  }

  window.addEventListener(
    (window.MadeRidgeConsent && window.MadeRidgeConsent.EVENT) || "maderidge:consent-change",
    applyGate
  );

  applyGate();
})();
