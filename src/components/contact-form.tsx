"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const FORM_ENDPOINT = "https://formspree.io/f/mjykbogl";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [privacyChecked, setPrivacyChecked] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: if this hidden field has any value, quietly stop (likely a bot).
    if (data.get("website")) {
      setStatus("Thank you. We will be in touch.");
      form.reset();
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!message) nextErrors.message = "Please describe your project.";

    if (!privacyChecked) {
      setStatus("You must agree to the Privacy Policy to submit this form.");
    }

    if (Object.keys(nextErrors).length || !privacyChecked) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setStatus("Sending...");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!response.ok) throw new Error("Submission failed.");
      setSubmitted(true);
      setStatus("Thank you. We will be in touch within two business days.");
      form.reset();
      setPrivacyChecked(false);
    } catch {
      setStatus("Something went wrong sending your message. Please email us directly instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex max-w-xl flex-col gap-4">
      {/* Honeypot: real users never see or fill this field. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <Label htmlFor="website">Leave this field blank</Label>
        <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required autoComplete="name" maxLength={120} aria-invalid={!!errors.name} />
        {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" maxLength={254} aria-invalid={!!errors.email} />
        {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">
          Phone <span className="text-ink-soft">(optional)</span>
        </Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Project details</Label>
        <Textarea id="message" name="message" rows={6} required maxLength={4000} aria-invalid={!!errors.message} />
        {errors.message ? <p className="text-sm text-destructive">{errors.message}</p> : null}
      </div>

      <div className="flex items-start gap-2.5">
        <Checkbox
          id="consent-privacy"
          name="consentPrivacy"
          checked={privacyChecked}
          onCheckedChange={(checked) => setPrivacyChecked(checked === true)}
          className="mt-0.5"
        />
        <Label htmlFor="consent-privacy" className="font-normal">
          I agree to be contacted about my inquiry and have read the{" "}
          <a href="/privacy" className="text-primary underline-offset-4 hover:underline">
            Privacy Policy
          </a>
          . <span aria-hidden="true">*</span>
        </Label>
      </div>

      <div className="flex items-start gap-2.5">
        <Checkbox id="consent-marketing" name="consentMarketing" className="mt-0.5" />
        <Label htmlFor="consent-marketing" className="font-normal">
          Send me occasional studio updates by email. I can unsubscribe at any
          time.
        </Label>
      </div>

      {!submitted ? (
        <Button type="submit" disabled={submitting} className="self-start">
          {submitting ? "Sending..." : "Send inquiry"}
        </Button>
      ) : null}

      <p role="status" aria-live="polite" className="text-sm text-ink-soft">
        {status}
      </p>
    </form>
  );
}
