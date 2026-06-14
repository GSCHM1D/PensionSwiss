export function daysUntilYearEnd(): number {
  const today = new Date()
  const yearEnd = new Date(today.getFullYear(), 11, 31)
  return Math.ceil((yearEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}
