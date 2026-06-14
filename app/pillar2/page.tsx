import { Briefcase, TrendingUp, TrendingDown, Info } from 'lucide-react'
import { chf, pct } from '@/lib/formatters'

const CAPITAL    = 285_000
const ANNUAL_CONTRIB = 18_600
const YTD_RETURN     = 6.8
const BENCHMARK      = 5.1

const funds = [
  { name: 'Swisscanto BVG 45 Responsible', alloc: 55, ytd: 6.8  },
  { name: 'UBS Pension Fund Index 25',      alloc: 30, ytd: 4.2  },
  { name: 'CS BVG Low Risk',                alloc: 15, ytd: 2.1  },
]

export default function Pillar2Page() {
  const beatsBenchmark = YTD_RETURN > BENCHMARK

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
          <Briefcase size={20} className="text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">2nd Pillar – BVG / Pension Fund</h1>
          <p className="text-slate-500 text-sm">Occupational pension · Berufliche Vorsorge</p>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <p className="label">Pension capital</p>
          <p className="text-3xl font-bold text-slate-900">{chf(CAPITAL)}</p>
          <p className="text-xs text-slate-400 mt-2">Vested benefit (Freizügigkeitsguthaben)</p>
        </div>
        <div className="card">
          <p className="label">YTD performance</p>
          <p className="text-3xl font-bold text-slate-900">+{pct(YTD_RETURN)}</p>
          <p className={`text-xs font-semibold mt-2 flex items-center gap-1 ${beatsBenchmark ? 'text-green-600' : 'text-red-500'}`}>
            {beatsBenchmark ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {beatsBenchmark ? '+' : ''}{pct(YTD_RETURN - BENCHMARK)} vs benchmark
          </p>
        </div>
        <div className="card">
          <p className="label">Annual contribution</p>
          <p className="text-3xl font-bold text-slate-900">{chf(ANNUAL_CONTRIB)}</p>
          <p className="text-xs text-slate-400 mt-2">You + employer, 50/50 split</p>
        </div>
      </div>

      {/* Investment strategy */}
      <div className="card">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={18} className="text-amber-500" />
          <p className="section-title mb-0">Investment strategy</p>
        </div>
        <div className="space-y-4">
          {funds.map(f => (
            <div key={f.name} className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-slate-800 truncate">{f.name}</p>
                  <span className={`text-sm font-bold shrink-0 ml-2 ${f.ytd >= BENCHMARK ? 'text-green-600' : 'text-slate-500'}`}>
                    {f.ytd >= 0 ? '+' : ''}{pct(f.ytd)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${f.alloc}%` }} />
                  </div>
                  <span className="text-xs text-slate-500 shrink-0 w-8 text-right">{f.alloc}%</span>
                </div>
              </div>
              <p className="text-sm font-bold text-slate-900 shrink-0 w-24 text-right">
                {chf(Math.round(CAPITAL * f.alloc / 100))}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy tip */}
      <div className="flex items-start gap-3 border border-blue-100 bg-blue-50 rounded-2xl p-4">
        <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold">Strategy recommendation</p>
          <p className="mt-0.5">
            At age 44 with 21 years to retirement, your current allocation (55% equities) may be too conservative.
            Switching to a higher-equity BVG strategy could add an estimated <strong>+1.5% p.a.</strong>, worth ~<strong>CHF 28'000</strong> extra at retirement.
            Contact your pension fund to check available options.
          </p>
        </div>
      </div>

      {/* BVG key numbers */}
      <div className="card">
        <p className="section-title">BVG key figures 2026</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {[
            ['Coordination deduction',        'CHF 26\'460'],
            ['Entry threshold',               'CHF 22\'680'],
            ['Maximum insured salary',        'CHF 90\'720'],
            ['BVG minimum interest rate',     '1.75%'],
            ['Conversion rate at 65',         '6.80%'],
            ['Early withdrawal (home)',       'From age 50'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1.5 border-b border-slate-50 gap-4">
              <span className="text-slate-500">{k}</span>
              <span className="font-semibold text-slate-900">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
