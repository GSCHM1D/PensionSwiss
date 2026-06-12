'use client'

import { useState } from 'react'
import { Calculator, Info } from 'lucide-react'
import { chf } from '@/lib/formatters'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

interface Params {
  yearsLeft:     number
  extraMonthly:  number
  growthRate:    number
  retirementAge: number
}

interface Result {
  total:        number
  monthlyIncome: number
  ahv:          number
  bvg:          number
  p3:           number
}

function project({ yearsLeft, extraMonthly, growthRate }: Params): Result {
  const r    = growthRate / 100
  const ahv  = 420_000 * Math.pow(1.012, yearsLeft)
  const bvg  = (285_000 + extraMonthly * 0.6 * 12) * Math.pow(1 + r, yearsLeft)
  const p3   = (98_500  + extraMonthly * 0.4 * 12) * Math.pow(1 + r + 0.01, yearsLeft)
  const total = ahv + bvg + p3
  return {
    total,
    monthlyIncome: (bvg * 0.068 + p3 * 0.035 + ahv * 0.068) / 12,
    ahv, bvg, p3,
  }
}

function Scenario({ label, params, highlight }: { label: string; params: Params; highlight?: boolean }) {
  const r = project(params)
  return (
    <div className={`rounded-xl p-4 border ${highlight ? 'border-blue-200 bg-blue-50' : 'border-slate-100 bg-slate-50'}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{chf(r.total)}</p>
      <p className="text-xs text-slate-500 mt-0.5">{chf(r.monthlyIncome)} / month</p>
    </div>
  )
}

export default function CalculatorPage() {
  const [retirementAge, setRetirementAge] = useState(65)
  const [extraMonthly,  setExtraMonthly]  = useState(500)
  const [growthRate,    setGrowthRate]    = useState(4)

  const yearsLeft = retirementAge - 44
  const params    = { yearsLeft, extraMonthly, growthRate, retirementAge }
  const result    = project(params)

  const chartData = [
    {
      name: 'Today',
      AHV: 420_000, BVG: 285_000, 'Pillar 3': 98_500,
    },
    {
      name: `Age ${retirementAge}`,
      AHV: Math.round(result.ahv), BVG: Math.round(result.bvg), 'Pillar 3': Math.round(result.p3),
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
          <Calculator size={20} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Retirement Calculator</h1>
          <p className="text-slate-500 text-sm">Simulate your trajectory — adjust assumptions and compare scenarios</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {/* Controls */}
        <div className="col-span-2 card space-y-6">
          <p className="section-title">Your assumptions</p>

          {/* Retirement age */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="label mb-0">Retirement age</label>
              <span className="text-sm font-bold text-blue-700">{retirementAge} years</span>
            </div>
            <input type="range" min={58} max={70} step={1} value={retirementAge}
              onChange={e => setRetirementAge(Number(e.target.value))} />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>58</span><span>70</span>
            </div>
          </div>

          {/* Extra monthly savings */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="label mb-0">Additional monthly savings</label>
              <span className="text-sm font-bold text-blue-700">{chf(extraMonthly)}</span>
            </div>
            <input type="range" min={0} max={3000} step={100} value={extraMonthly}
              onChange={e => setExtraMonthly(Number(e.target.value))} />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>CHF 0</span><span>CHF 3'000</span>
            </div>
          </div>

          {/* Growth rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="label mb-0">Investment growth rate</label>
              <span className="text-sm font-bold text-blue-700">{growthRate.toFixed(1)}%</span>
            </div>
            <input type="range" min={0} max={10} step={0.5} value={growthRate}
              onChange={e => setGrowthRate(Number(e.target.value))} />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0%</span><span>10%</span>
            </div>
          </div>

          {/* Years until retirement */}
          <div className="rounded-xl bg-slate-50 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Years until retirement</span>
              <span className="font-bold text-slate-900">{yearsLeft} yrs</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-slate-500">AHV growth (fixed)</span>
              <span className="font-bold text-slate-900">1.2% p.a.</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-span-3 space-y-4">
          {/* Main result */}
          <div className="card border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 text-center py-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">Projected total at age {retirementAge}</p>
            <p className="text-5xl font-bold text-slate-900 mt-2">{chf(result.total)}</p>
            <p className="text-lg text-slate-600 mt-2">
              ≈ <span className="font-bold text-slate-800">{chf(result.monthlyIncome)}</span> / month
            </p>
          </div>

          {/* 3 scenarios */}
          <div className="grid grid-cols-3 gap-3">
            <Scenario label="Conservative (2%)" params={{ ...params, growthRate: 2 }} />
            <Scenario label="Your scenario" params={params} highlight />
            <Scenario label="Optimistic (7%)" params={{ ...params, growthRate: 7 }} />
          </div>

          {/* Bar chart */}
          <div className="card">
            <p className="section-title">Today vs. Retirement</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} width={50} />
                <Tooltip formatter={(v: number) => chf(v)} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="AHV"      fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="BVG"      fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pillar 3" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-50 rounded-xl px-4 py-3">
        <Info size={14} className="shrink-0 mt-0.5" />
        <p>
          Projections are illustrative only. AHV grows at 1.2% p.a. (inflation adjustment).
          Monthly retirement income assumes 6.8% BVG conversion rate and 3.5% drawdown for 3rd pillar.
          Consult a licensed pension advisor for personalised advice.
        </p>
      </div>
    </div>
  )
}
