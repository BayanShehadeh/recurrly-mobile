import dayjs from "dayjs";

/**
 * Formats a date for UI display.
 * Default matches the home balance card: "MM/DD" (e.g. 03/18).
 */
export function formatDate(
  date: string | number | Date,
  format = "MM/DD",
): string {
  const parsed = dayjs(date);

  if (!parsed.isValid()) {
    return "";
  }

  return parsed.format(format);
}

/**
 * Formats a number as currency for UI display.
 * Default: USD with 2 decimal places (e.g. $2,489.48).
 */
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US",
): string {
  if (!Number.isFinite(amount)) {
    return "";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a subscription status for UI display.
 * Example: "active" / "past_due" → "Active" / "Past Due".
 */
export function formatStatusLabel(status: string): string {
  return status
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
