export function LegalLayout({
  title,
  effectiveDate,
  toc,
  children,
}: {
  title: string;
  effectiveDate: string;
  toc: { href: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <div className="prose-legal">
          <h1 className="mb-2 text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="mb-6 text-ink-soft">{effectiveDate}</p>

          <div className="mb-10 rounded-md border border-border p-4">
            <p className="mb-2 font-semibold">On this page</p>
            <ol className="list-decimal space-y-1 pl-5 text-sm">
              {toc.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-primary underline-offset-4 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-8 [&_h2]:scroll-mt-24 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:text-ink-soft [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
