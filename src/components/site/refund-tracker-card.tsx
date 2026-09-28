import { ExternalLink, Search } from "lucide-react";

export function RefundTrackerCard() {
  return (
    <div className="rounded-3xl border border-ink/10 bg-paper p-8">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-amber/20 text-forest">
        <Search className="size-5" />
      </div>
      <h2 className="mt-5 font-display text-2xl font-semibold text-ink">
        Already filed? Track your refund.
      </h2>
      <p className="mt-2.5 text-sm leading-relaxed text-ink/60">
        The IRS updates refund status once every 24 hours. You&apos;ll need
        your Social Security number, filing status, and the exact refund
        amount from your return.
      </p>
      <ol className="mt-5 space-y-2 text-sm text-ink/70">
        <li>1. E-filed returns: check status within 24 hours of filing.</li>
        <li>2. Mailed returns: allow about 4 weeks before checking.</li>
        <li>3. Most refunds arrive within 21 days of acceptance.</li>
      </ol>
      <a
        href="https://www.irs.gov/refunds"
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ember hover:text-ember-dark"
      >
        Check status on IRS.gov
        <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}
