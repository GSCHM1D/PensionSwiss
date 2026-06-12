import { Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import { chf } from '@/lib/formatters'

const CONTRIB_YEARS  = 38
const MAX_YEARS      = 44
const EXPECTED_MONTHLY = 2_394
const MAX_MONTHLY    = 2_520

const history = [
  { year: 2020, you: 5_400, employer: 5_400, status: 'ok' },
  { year: 2021, you: 5_550, employer: 5_550, status: 'ok' },
  { year: 2022, you: 5_700, employer: 5_700, status: 'ok' },
  { year: 2023, you: 5_850, employer: 5_850, status: 'ok' },
  { year: 2024, you: 6_000, employer: 6_000, status: 'ok' },
  { year: 2025, you: 6_050, employer: 6_050, status: 'ok' },
]

export default function Pillar1Page() {
  const pct = Math.round((CONTRIB_YEARS / MAX_YEARS) * 100)
  const pensionPct = Math.round((EXPECTED_MONTHLY / MAX_MONTHLY) * 100)

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
          <Shield size={20} className="text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">1st Pillar – AHV / IV</h1>
          <p className="text-slate-500 text-sm">State pension · Alters- und Hinterlassenenversicherung</p>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-3 gap-4">
        {/* Contribution years */}
        <div className="card">
          <p className="label">Contribution years</p>
          <p className="text-3xl font-bold text-slate-900">{CONTRIB_YEARS} <span className="text-lg text-slate-400">/ {MAX_YEARS}</span></p>
          <div className="mt-3 bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">{MAX_YEARS - CONTRIB_YEARS} years remaining · Retires 2047</p>
        </div>

        {/* Expected pension */}
        <div className="card">
          <p className="label">Expected monthly pension</p>
          <p className="text-3xl font-bold text-slate-900">{chf(EXPECTED_MONTHLY)}</p>
          <div className="mt-3 bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${pensionPct}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">{pensionPct}% of max ({chf(MAX_MONTHLY)})</p>
        </div>

        {/* Lifetime contributions */}
        <div className="card">
          <p className="label">Total contributions (your share)</p>
          <p className="text-3xl font-bold text-slate-900">{chf(420_000)}</p>
          <p className="text-xs text-slate-400 mt-3">Employer matched the same amount</p>
          <p className="text-xs text-green-600 font-semibold mt-1">Contribution rate: 8.7% of gross salary</p>
        </div>
      </div>

      {/* Gaps alert */}
      <div className="flex items-start gap-3 border border-amber-200 bg-amber-50 rounded-2xl p-4">
        <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-amber-900 text-sm">Contribution gaps detected: 2003 & 2004</p>
          <p className="text-sm text-amber-700 mt-0.5">
            Missing 2 years (study abroad). Back-payment costs approximately <strong>CHF 1&apos;200</strong> and
            would increase your pension by an estimated <strong>CHF 48 / month</strong> — fully recovered in 2 years.
          </p>
        </div>
        <button className="btn-primary bg-amber-500 hover:bg-amber-600 shrink-0 text-xs">
          Contact SVA
        </button>
      </div>

      {/* Contribution history */}
      <div className="card">
        <p className="section-title">Recent annual contributions</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="pb-2.5 font-semibold">Year</th>
              <th className="pb-2.5 font-semibold">Your share</th>
              <th className="pb-2.5 font-semibold">Employer</th>
              <th className="pb-2.5 font-semibold">Total</th>
              <th className="pb-2.5 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {history.map(r => (
              <tr key={r.year} className="hover:bg-slate-50">
                <td className="py-3 font-semibold text-slate-900">{r.year}</td>
                <td className="py-3 text-slate-700">{chf(r.you)}</td>
                <td className="py-3 text-slate-700">{chf(r.employer)}</td>
                <td className="py-3 font-semibold text-slate-900">{chf(r.you + r.employer)}</td>
                <td className="py-3">
                  <CheckCircle size={15} className="text-green-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AHV facts */}
      <div className="card">
        <p className="section-title">AHV key facts 2026</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {[
            ['Contribution rate (employee + employer)', '8.7% of gross salary'],
            ['Minimum full pension (individual)', 'CHF 1\'260 / month'],
            ['Maximum full pension (individual)', 'CHF 2\'520 / month'],
            ['Maximum couple pension', 'CHF 3\'780 / month'],
            ['Full entitlement requires', '44 contribution years'],
            ['Retirement age (men / women)', '65 / 65 (since 2024)'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1.5 border-b border-slate-50 gap-4">
              <span className="text-slate-500">{k}</span>
              <span className="font-semibold text-slate-900 text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
