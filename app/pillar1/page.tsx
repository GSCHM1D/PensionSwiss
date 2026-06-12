import { Shield, Info } from 'lucide-react'
import { chf } from '@/lib/formatters'

const contributions = [
  { year: 2020, amount: 5_400, employer: 5_400 },
  { year: 2021, amount: 5_550, employer: 5_550 },
  { year: 2022, amount: 5_700, employer: 5_700 },
  { year: 2023, amount: 5_850, employer: 5_850 },
  { year: 2024, amount: 6_000, employer: 6_000 },
  { year: 2025, amount: 6_050, employer: 6_050 },
]

export default function Pillar1Page() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <Shield size={20} className="text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">1st Pillar – AHV / IV</h1>
          <p className="text-slate-500 text-sm">State pension (Alters- und Hinterlassenenversicherung)</p>
        </div>
      </div>

      {/* Info box */}
      <div className="card border border-green-100 bg-green-50">
        <div className="flex gap-3">
          <Info size={18} className="text-green-600 mt-0.5 shrink-0" />
          <div className="text-sm text-slate-700 space-y-1">
            <p>
              The <strong>AHV</strong> is Switzerland&apos;s compulsory state pension. Contributions are 8.7 % of gross salary
              (split equally between employee and employer). Benefits are paid from age 65 (men) / 64 (women).
            </p>
            <p>
              The maximum full AHV pension in 2026 is <strong>CHF 2&apos;520 / month</strong> for individuals and
              <strong> CHF 3&apos;780 / month</strong> for couples.
            </p>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-5">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contribution Years</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">38 / 44</p>
          <p className="text-xs text-slate-400 mt-0.5">6 years remaining</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Expected Monthly Pension</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">CHF 2&apos;394</p>
          <p className="text-xs text-slate-400 mt-0.5">~95 % of maximum</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Contributions (employee)</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{chf(420_000)}</p>
          <p className="text-xs text-slate-400 mt-0.5">Lifetime to date</p>
        </div>
      </div>

      {/* Contribution history */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 mb-4">Recent Annual Contributions</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Year</th>
              <th className="pb-2 font-medium">Your share</th>
              <th className="pb-2 font-medium">Employer share</th>
              <th className="pb-2 font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {contributions.map(r => (
              <tr key={r.year} className="hover:bg-slate-50">
                <td className="py-3 font-medium text-slate-900">{r.year}</td>
                <td className="py-3">{chf(r.amount)}</td>
                <td className="py-3">{chf(r.employer)}</td>
                <td className="py-3 font-semibold">{chf(r.amount + r.employer)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gap years alert */}
      <div className="card border border-amber-100 bg-amber-50">
        <p className="font-semibold text-amber-800 text-sm">Contribution gaps detected</p>
        <p className="text-sm text-amber-700 mt-1">
          Missing contributions for <strong>2003</strong> and <strong>2004</strong> (education abroad).
          You may be able to retroactively pay these gaps to increase your pension entitlement.
          Contact the SVA for details.
        </p>
      </div>
    </div>
  )
}
