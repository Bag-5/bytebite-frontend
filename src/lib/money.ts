export function formatGhanaCedis(value: number) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 2,
  }).format(value);
}
