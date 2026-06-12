import { Briefcase, TrendingUp } from 'lucide-react'
import { chf, pct } from '@/lib/formatters'

const funds = [
  { name: 'Swisscanto BVG 45 Responsible',  allocation: 55, ytd: 6.8,  value: 156_750 },
  { name: 'UBS Pension Fund Index 25',       allocation: 30, ytd: 4.2,  value: 85_500  },
  { name: 'Credit Suisse BVG Low Risk',      allocation: 15, ytd: 2.1,  value: 42_750  },
]

export default function Pillar2Page() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
          <Briefcase size={20} className="text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">2nd Pillar – BVG / Pension Fund</h1>
          <p className="text-slate-500 text-sm">Occupational pension (Berufliche Vorsorge)</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-5">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pension Capital</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{chf(285_000)}</p>
          <p className="text-xs text-slate-400 mt-0.5">Vested benefit (Freizügigkeitsguthaben)</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Interest Rate (2026)</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">1.75 %</p>
          <p className="text-xs text-slate-400 mt-0.5">BVG minimum rate</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Annual Contribution</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{chf(18_600)}</p>
          <p className="text-xs text-slate-400 mt-0.5">You + employer (50 / 50)</p>
        </div>
      </div>

      {/* Fund allocation */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-amber-500" />
          <h2 className="font-semibold text-slate-800">Investment Strategy</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Fund</th>
              <th className="pb-2 font-medium text-right">Allocation</th>
              <th className="pb-2 font-medium text-right">YTD Return</th>
              <th className="pb-2 font-medium text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {funds.map(f => (
              <tr key={f.name} className="hover:bg-slate-50">
                <td className="py-3 font-medium text-slate-900">{f.name}</td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-20 bg-slate-100 rounded-full h-1.5">
                      <div
                        className="bg-amber-400 h-1.5 rounded-full"
                        style={{ width: `${f.allocation}%` }}
                      />
                    </div>
                    {pct(f.allocation, 0)}
                  </div>
                </td>
                <td className={`py-3 text-right font-medium ${f.ytd >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {f.ytd >= 0 ? '+' : ''}{pct(f.ytd)}
                </td>
                <td className="py-3 text-right font-semibold">{chf(f.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BVG key facts */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 mb-4">Key BVG Facts (2026)</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            ['Coordination deduction', 'CHF 26\'460'],
            ['Entry threshold', 'CHF 22\'680'],
            ['Maximum insured salary', 'CHF 90\'720'],
            ['Conversion rate (at 65)', '6.80 %'],
            ['BVG minimum interest rate', '1.75 %'],
            ['Early withdrawal (home ownership)', 'Allowed from age 50'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">{k}</span>
              <span className="font-semibold text-slate-900">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
