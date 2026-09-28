export interface TaxDeadline {
  label: string;
  date: Date;
}

function nextOccurrence(month: number, day: number, from: Date): Date {
  const year = from.getFullYear();
  const candidate = new Date(year, month - 1, day);
  if (candidate.getTime() <= from.getTime()) {
    return new Date(year + 1, month - 1, day);
  }
  return candidate;
}

export function getUpcomingDeadlines(from: Date = new Date()): TaxDeadline[] {
  const deadlines: TaxDeadline[] = [
    { label: "Federal filing deadline", date: nextOccurrence(4, 15, from) },
    { label: "Q2 estimated tax payment", date: nextOccurrence(6, 15, from) },
    { label: "Q3 estimated tax payment", date: nextOccurrence(9, 15, from) },
    { label: "Extension filing deadline", date: nextOccurrence(10, 15, from) },
    { label: "Q4 estimated tax payment", date: nextOccurrence(1, 15, from) },
  ];
  return deadlines.sort((a, b) => a.date.getTime() - b.date.getTime());
}
