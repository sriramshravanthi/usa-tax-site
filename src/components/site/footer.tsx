import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Individual Filing", href: "/services#individual-filing" },
      { label: "Self-Employed", href: "/services#self-employed" },
      { label: "Pricing", href: "/pricing" },
      { label: "Audit Support", href: "/services#audit-support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Find a Tax Pro", href: "/find-a-pro" },
      { label: "Contact", href: "/contact" },
      { label: "Reviews", href: "/#reviews" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog & Guides", href: "/resources" },
      { label: "Refund Estimator", href: "/tools" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream-soft pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-semibold text-ink"
            >
              <span className="grid size-8 place-items-center rounded-full bg-ink text-cream">
                <span className="font-display italic">A</span>
              </span>
              Amberly Tax Co.
            </Link>
            <p className="mt-4 max-w-[22ch] text-sm text-ink/55">
              Straightforward individual tax help, coast to coast.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/55 transition-colors hover:text-ember"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink/10 pt-6 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Amberly Tax Co. All rights reserved.</p>
          <p className="max-w-2xl leading-relaxed">
            Amberly Tax Co. is a fictional brand built for demonstration
            purposes. Pricing, credentials, and statistics shown on this site
            are illustrative placeholders, not real financial or legal claims.
          </p>
        </div>
      </div>
    </footer>
  );
}
