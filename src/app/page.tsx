import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { WorkCard } from "@/components/work-card";
import { QuoteQuiz } from "@/components/quote-quiz";

const SERVICES = [
  {
    index: "01",
    title: "Design",
    description:
      "We create a look that reflects your business, with clear layouts and easy navigation that help customers find what they need.",
  },
  {
    index: "02",
    title: "Development",
    description:
      "We turn your design into a working website built for phones, tablets, and computers, with fast-loading pages and features that fit your business.",
  },
  {
    index: "03",
    title: "Launch support",
    description:
      "We test your website extensively before launch to ensure accessibility and help get it online. After launch, we’re available to answer questions and discuss updates as your business grows.",
  },
];

const WORK = [
  {
    image: "/images/placeholder-case-study-1.jpg",
    alt: "Screenshot of the dynamic, filterable product catalog on the Crooked Canopy e-commerce homepage",
    title: "Crooked Canopy",
    description:
      "Built a dynamic, multi-category e-commerce catalog featuring filterable product tags that increased average user time-on-page.",
    href: "https://crookedcanopywoodworks.netlify.app/",
  },
  {
    image: "/images/placeholder-case-study-2.jpg",
    alt: "Screenshot of the high-contrast GL Visuals homepage featuring cinematic media reels",
    title: "GL Visuals",
    description:
      "Designed a sleek, high-impact landing page that seamlessly integrates cinematic media reels, resulting in new client inquiries.",
    href: "https://glvisuals.wixsite.com/gl-visuals",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="mb-4 max-w-2xl text-4xl font-semibold sm:text-5xl">
            High-contrast, high-performance web design.
          </h1>
          <p className="mb-8 max-w-xl text-lg text-ink-soft">
            We build clean, ultra-responsive digital experiences that convert
            visitors into loyal clients.
          </p>
          <Button asChild size="lg">
            <a href="#contact">Start Your Project</a>
          </Button>
        </div>
      </section>

      {/* Recent work */}
      <section id="work" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal as="h2" className="mb-3 text-3xl font-semibold sm:text-4xl">
            Recent work
          </Reveal>
          <p className="mb-8 text-ink-soft">
            Examples of recent websites we have created, shown here with the
            client&rsquo;s permission.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {WORK.map((item, i) => (
              <WorkCard key={item.title} {...item} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 bg-card py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal as="h2" className="mb-8 text-3xl font-semibold sm:text-4xl">
            Services
          </Reveal>
          <div className="border-t border-border">
            {SERVICES.map((service, i) => (
              <Reveal key={service.index} delay={i * 100}>
                <div className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-8 sm:grid-cols-[4rem_1fr]">
                  <span className="font-display text-2xl text-primary">
                    {service.index}
                  </span>
                  <div>
                    <h3 className="mb-1 text-xl font-semibold">{service.title}</h3>
                    <p className="text-ink-soft">{service.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal as="h2" className="mb-4 text-3xl font-semibold sm:text-4xl">
            About us
          </Reveal>
          <Reveal>
            <p className="max-w-2xl text-lg text-ink-soft">
              MadeRidge is a small, hands-on web design studio run by two
              experienced creators. We handle every single project ourselves,
              taking your site from initial sketch to final deployment so your
              vision never gets lost in translation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact / Project Cost Estimator */}
      <section id="contact" className="scroll-mt-24 bg-card py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal as="h2" className="mb-3 text-3xl font-semibold sm:text-4xl">
            Get an instant project estimate
          </Reveal>
          <p className="mb-8 max-w-xl text-ink-soft">
            Answer five quick questions and see a live estimate for your
            project. It takes about a minute.
          </p>
          <Reveal>
            <QuoteQuiz />
          </Reveal>
        </div>
      </section>
    </>
  );
}
