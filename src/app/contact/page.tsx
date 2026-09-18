import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a project quote from MadeRidge Website Design.",
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="mb-3 text-3xl font-semibold sm:text-4xl">
          Request a project quote
        </h1>
        <p className="mb-8 text-ink-soft">
          We collect only what we need to respond to your inquiry: your name,
          your email, and a description of the project. Phone number is
          optional.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
