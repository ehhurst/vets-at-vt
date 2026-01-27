function toValidDate(value: string | Date): Date | null {
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDateTime(
  iso: string,
  options?: Intl.DateTimeFormatOptions
) {
  const date = toValidDate(iso);
  if (!date) return "Invalid date";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    ...options,
  }).format(date);
}

export function formatDate(iso: string, options?: Intl.DateTimeFormatOptions) {
  const date = toValidDate(iso);
  if (!date) return "Invalid date";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(date);
}

export function formatTimeRange(startISO: string, endISO: string) {
  const start = toValidDate(startISO);
  const end = toValidDate(endISO);
  if (!start || !end) return "Invalid time";

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`;
}
