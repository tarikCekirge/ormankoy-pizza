export const formatCurrency = (value) => {
  if (value === undefined || value === null) return "";
  if (typeof value !== "number") return value;

  const formatted = new Intl.NumberFormat("tr-TR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `${formatted}₺`;
};

export const formatDate = (dateStr) => {
  return new Intl.DateTimeFormat("tr", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
};

export const calcMinutesLeft = (dateStr) => {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
};
