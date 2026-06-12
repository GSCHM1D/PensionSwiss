export function chf(amount: number): string {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function pct(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)} %`
}

export function year(y: number): string {
  return y.toString()
}
