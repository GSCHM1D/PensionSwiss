export default function RetirementCountdown() {
  const yearsLeft  = 21
  const monthsLeft = 4
  const totalYears = 44        // working life 21→65
  const worked     = totalYears - yearsLeft
  const pct        = Math.round((worked / totalYears) * 100)

  return (
    <div className="flex items-center gap-6 card-sm border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="shrink-0 text-center">
        <p className="text-4xl font-bold text-blue-700 leading-none">{yearsLeft}</p>
        <p className="text-xs text-blue-500 font-medium mt-0.5">years left</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800">
          Retirement at 65 — {monthsLeft > 0 ? `${yearsLeft} yrs ${monthsLeft} mo` : `${yearsLeft} years`} to go
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex-1 bg-blue-100 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-blue-600 shrink-0">{pct}% of career</span>
        </div>
      </div>
    </div>
  )
}
