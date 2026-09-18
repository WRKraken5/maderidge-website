"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FORM_ENDPOINT = "https://formspree.io/f/mjykbogl";

type Tier = "base" | "mid" | "max";

const TIER_PRICE: Record<Tier, number> = { base: 450, mid: 750, max: 1000 };
const TIER_LABEL: Record<Tier, string> = {
  base: "Essential",
  mid: "Mid-tier",
  max: "Max / custom",
};

type Option = { value: "A" | "B" | "C"; tier: Tier; label: string };
type Step = { id: string; question: string; options: Option[] };

const QUIZ_STEPS: Step[] = [
  {
    id: "scope",
    question: "What kind of site are you looking to build?",
    options: [
      { value: "A", tier: "base", label: "Single-page site / landing page" },
      { value: "B", tier: "mid", label: "Standard multi-page site" },
      { value: "C", tier: "max", label: "Fully custom business showcase" },
    ],
  },
  {
    id: "style",
    question: "What visual style and level of customization are you after?",
    options: [
      { value: "A", tier: "base", label: "Clean & standard template" },
      { value: "B", tier: "mid", label: "Modern, high-contrast, with custom animations" },
      { value: "C", tier: "max", label: "Premium cinematic aesthetic with custom media/video" },
    ],
  },
  {
    id: "content",
    question: "Where do things stand with your content?",
    options: [
      { value: "A", tier: "base", label: "I have all text and photos ready to go" },
      { value: "B", tier: "mid", label: "I need help organizing and styling my content" },
      { value: "C", tier: "max", label: "I need full copy tweaking and custom asset design" },
    ],
  },
  {
    id: "features",
    question: "What additional features do you need?",
    options: [
      { value: "A", tier: "base", label: "Essential contact form & mobile optimization" },
      { value: "B", tier: "mid", label: "Interactive elements, micro-animations & FAQ" },
      { value: "C", tier: "max", label: "Advanced lead-capture quiz & custom components" },
    ],
  },
  {
    id: "timeline",
    question: "What is your ideal turnaround?",
    options: [
      { value: "A", tier: "base", label: "Standard turnaround (2–3 weeks)" },
      { value: "B", tier: "mid", label: "Priority delivery (1–2 weeks)" },
      { value: "C", tier: "max", label: "Expedited launch (under 1 week)" },
    ],
  },
];

const TOTAL_STEPS = QUIZ_STEPS.length;

function formatPrice(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

// Live running estimate: average of tiers answered so far, snapped to the
// nearest of the three published price points.
function liveEstimate(answers: Record<string, Option>) {
  const values = Object.values(answers);
  if (!values.length) return TIER_PRICE.base;
  const avg =
    values.reduce((sum, a) => sum + TIER_PRICE[a.tier], 0) / values.length;
  const points = [TIER_PRICE.base, TIER_PRICE.mid, TIER_PRICE.max];
  return points.reduce((closest, p) =>
    Math.abs(p - avg) < Math.abs(closest - avg) ? p : closest,
  );
}

// Final estimate: majority tier wins; ties resolve to the higher tier so a
// genuinely mixed-tier project is never underquoted.
function finalTier(answers: Record<string, Option>): Tier {
  const counts: Record<Tier, number> = { base: 0, mid: 0, max: 0 };
  Object.values(answers).forEach((a) => counts[a.tier]++);
  let winner: Tier = "base";
  (["base", "mid", "max"] as Tier[]).forEach((tier) => {
    if (counts[tier] >= counts[winner]) winner = tier;
  });
  return winner;
}

export function QuoteQuiz() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, Option>>({});

  const answeredCount = Object.keys(answers).length;
  const onFinalStep = currentStep >= TOTAL_STEPS;

  function selectOption(step: Step, option: Option, index: number) {
    setAnswers((prev) => ({ ...prev, [step.id]: option }));
    setCurrentStep(index + 1);
  }

  const progressPct = onFinalStep ? 100 : (currentStep / TOTAL_STEPS) * 100;

  return (
    <Card className="mx-auto max-w-xl p-6 sm:p-8">
      <div className="mb-6">
        <Progress value={progressPct} />
        <p className="mt-2 text-sm text-ink-soft">
          {onFinalStep ? "Your estimate" : `Step ${currentStep + 1} of ${TOTAL_STEPS}`}
        </p>
      </div>

      {answeredCount > 0 ? (
        <div className="mb-6 flex items-baseline justify-between rounded-md border border-border bg-muted px-4 py-2.5">
          <span className="text-sm text-ink-soft">Estimate so far</span>
          <span className="font-display text-lg font-semibold text-primary">
            {formatPrice(liveEstimate(answers))}
          </span>
        </div>
      ) : null}

      {!onFinalStep ? (
        <QuestionStep
          step={QUIZ_STEPS[currentStep]}
          index={currentStep}
          selected={answers[QUIZ_STEPS[currentStep].id]?.value}
          onSelect={selectOption}
          onBack={currentStep > 0 ? () => setCurrentStep(currentStep - 1) : undefined}
        />
      ) : (
        <FinalStep
          answers={answers}
          onBack={() => setCurrentStep(TOTAL_STEPS - 1)}
        />
      )}
    </Card>
  );
}

function QuestionStep({
  step,
  index,
  selected,
  onSelect,
  onBack,
}: {
  step: Step;
  index: number;
  selected?: string;
  onSelect: (step: Step, option: Option, index: number) => void;
  onBack?: () => void;
}) {
  return (
    <div key={step.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 id={`quiz-q-${step.id}`} className="mb-4 text-xl font-semibold">
        {step.question}
      </h3>
      <div className="mb-6 flex flex-col gap-2" aria-labelledby={`quiz-q-${step.id}`}>
        {step.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={selected === opt.value}
            onClick={() => onSelect(step, opt, index)}
            className={cn(
              "w-full rounded-md border-2 px-4 py-3 text-left text-sm transition-colors",
              selected === opt.value
                ? "border-primary bg-accent"
                : "border-input bg-background hover:border-ink-soft",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {onBack ? (
        <Button type="button" variant="secondary" size="sm" onClick={onBack}>
          Back
        </Button>
      ) : null}
    </div>
  );
}

function FinalStep({
  answers,
  onBack,
}: {
  answers: Record<string, Option>;
  onBack: () => void;
}) {
  const tier = finalTier(answers);
  const price = TIER_PRICE[tier];

  const [status, setStatus] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted || submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never see or fill this field.
    if (data.get("website")) {
      setStatus("Thank you. We will be in touch.");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!name) {
      setStatus("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    const payload: Record<string, string> = {
      name,
      email,
      phone: String(data.get("phone") ?? "").trim(),
      notes: String(data.get("notes") ?? "").trim(),
      estimated_price: formatPrice(price),
      estimated_tier: TIER_LABEL[tier],
    };
    QUIZ_STEPS.forEach((step) => {
      payload[`quiz_${step.id}`] = answers[step.id]?.label ?? "";
    });

    setSubmitting(true);
    setStatus("Sending...");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Submission failed.");
      setSubmitted(true);
      setStatus(
        "Thank you! We received your estimate request and will follow up within two business days.",
      );
      form.reset();
    } catch {
      setStatus("Something went wrong sending your request. Please email us directly instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6 border-b border-border pb-6">
        <p className="text-sm text-ink-soft">Your estimated investment</p>
        <p className="font-display text-4xl font-semibold text-primary">
          ~{formatPrice(price)}
        </p>
        <p className="text-sm text-ink-soft">
          {TIER_LABEL[tier]} tier, based on your answers below.
        </p>
      </div>

      <ul className="mb-6 border-t border-border text-sm text-ink-soft">
        {QUIZ_STEPS.map((step) =>
          answers[step.id] ? (
            <li key={step.id} className="border-b border-border py-2">
              {answers[step.id].label}
            </li>
          ) : null,
        )}
      </ul>

      <Button type="button" variant="secondary" size="sm" onClick={onBack} className="mb-6">
        Back
      </Button>

      <div className="border-t border-border pt-6">
        <h4 className="mb-4 text-lg font-semibold">Get this estimate by email</h4>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Honeypot: hidden from sighted users and real assistive tech alike. */}
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <Label htmlFor="quiz-website">Leave this field blank</Label>
            <Input id="quiz-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quiz-name">Name</Label>
            <Input id="quiz-name" name="name" required autoComplete="name" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quiz-email">Email</Label>
            <Input id="quiz-email" name="email" type="email" required autoComplete="email" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quiz-phone">Phone (optional)</Label>
            <Input id="quiz-phone" name="phone" type="tel" autoComplete="tel" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quiz-notes">Anything else we should know? (optional)</Label>
            <Textarea id="quiz-notes" name="notes" rows={3} />
          </div>

          {!submitted ? (
            <Button type="submit" disabled={submitting} className="self-start">
              {submitting ? "Sending..." : "Send me this estimate"}
            </Button>
          ) : null}

          <p role="status" aria-live="polite" className="text-sm text-ink-soft">
            {status}
          </p>
        </form>
      </div>
    </div>
  );
}
