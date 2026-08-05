const DATE_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

function addBusinessDays(from: Date, days: number): Date {
  const date = new Date(from);
  let remaining = days;
  while (remaining > 0) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return date;
}

export function estimateDeliveryRange(today = new Date()) {
  const start = addBusinessDays(today, 5);
  const end = addBusinessDays(today, 9);
  return `${DATE_FORMAT.format(start)} – ${DATE_FORMAT.format(end)}`;
}
