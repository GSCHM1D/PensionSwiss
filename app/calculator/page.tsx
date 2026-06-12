'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { chf } from '@/lib/formatters'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

function project(params: {
  currentAge: number
  retirementAge: number
  ahv: number
  bvg: number
  p3: number
  monthlySavings: number
  growthRate: number
}) {
  const { currentAge, retirementAge, ahv, bvg, p3, monthlySavings, growthRate } = params
  const years = retirementAge - currentAge
  const r = growthRate / 100

  const futureAhv = ahv * Math.pow(1 + 0.012, years)
  const futureBvg = (bvg + monthlySavings * 6 * 12 * years / years) * Math.pow(1 + r, years)
  const futureP3  = (p3 + monthlySavings * 4 * 12 * years / years) * Math.pow(1 + r + 0.01, years)

  return {
    total: futureAhv + futureBvg + futureP3,
    ahv:   futureAhv,
    bvg:   futureBvg,
    p3:    futureP3,
    monthlyIncome: (futureAhv * 0.068 + futureBvg * 0.068 + futureP3 * 0.04) / 12,
  }
}

function buildChartData(params: ReturnType<typeof project> & { currentAge: number; retirementAge: number }) {
  return [
    { name: 'Current',   AHV: 420_000, BVG: 285_000, 'Pillar 3': 98_500 },
    { name: 'At Retirement', AHV: Math.round(params.ahv), BVG: Math.round(params.bvg), 'Pillar 3': Math.round(params.p3) },
  ]
}

export default function CalculatorPage() {
  const [currentAge,    setCurrentAge]    = useState(44)
  const [retirementAge, setRetirementAge] = useState(65)
  const [monthlySavings,setMonthlySavings]= useState(1_500)
  const [growthRate,    setGrowthRate]    = useState(4.0)

  const result = project({ currentAge, retirementAge, ahv: 420_000, bvg: 285_000, p3: 98_500, monthlySavings, growthRate })
  const chartData = buildChartData({ ...result, currentAge, retirementAge })

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Calculator size={20} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Retirement Calculator</h1>
          <p className="text-slate-500 text-sm">Simulate your pension trajectory with custom assumptions</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="col-span-1 card space-y-5">
          <h2 className="font-semibold text-slate-800">Parameters</h2>

          {[
            { label: 'Current age',      value: currentAge,     setter: setCurrentAge,     min: 18,  max: 64, step: 1,   suffix: 'yrs' },
            { label: 'Retirement age',   value: retirementAge,  setter: setRetirementAge,  min: 58,  max: 70, step: 1,   suffix: 'yrs' },
            { label: 'Monthly savings',  value: monthlySavings, setter: setMonthlySavings, min: 0,   max: 10000, step: 100, suffix: 'CHF' },
            { label: 'Growth rate (BVG/3a)', value: growthRate, setter: setGrowthRate,    min: 0,   max: 12, step: 0.5, suffix: '%'   },
          ].map(({ label, value, setter, min, max, step, suffix }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">{label}</span>
                <span className="font-semibold text-slate-900">{suffix === 'CHF' ? chf(value) : `${value} ${suffix}`}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={e => setter(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="col-span-2 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="card border border-blue-100 bg-blue-50">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Projected Total Assets</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{chf(result.total)}</p>
              <p className="text-xs text-slate-400 mt-0.5">At age {retirementAge}</p>
            </div>
            <div className="card border border-green-100 bg-green-50">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-600">Est. Monthly Income</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{chf(result.monthlyIncome)}</p>
              <p className="text-xs text-slate-400 mt-0.5">All pillars combined</p>
            </div>
          </div>

          <div className="card">
            <h2 className="font-semibold text-slate-800 mb-4">Asset Breakdown: Now vs Retirement</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={v => `CHF ${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} width={80} />
                <Tooltip formatter={(v: number) => chf(v)} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="AHV"      fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="BVG"      fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pillar 3" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-slate-400">
            Projections are estimates only. AHV grows at 1.2 % p.a. (inflation). BVG and Pillar 3a/3b grow at the selected rate.
            Monthly income assumes 6.8 % conversion rate for BVG and 4 % drawdown for 3rd pillar.
          </p>
        </div>
      </div>
    </div>
  )
}
