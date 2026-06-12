'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

function buildData() {
  const rows = []
  let ahv  = 420_000
  let bvg  = 285_000
  let p3   = 98_500
  for (let y = 2026; y <= 2047; y++) {
    rows.push({ year: y, AHV: Math.round(ahv), BVG: Math.round(bvg), 'Pillar 3': Math.round(p3) })
    ahv *= 1.012
    bvg *= 1.04
    p3  *= 1.05
  }
  return rows
}

const data = buildData()

const fmt = (v: number) =>
  new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF', maximumFractionDigits: 0 }).format(v)

export default function PensionGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="gAHV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gBVG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gP3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="year" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={v => `CHF ${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} width={80} />
        <Tooltip formatter={(v: number) => fmt(v)} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Area type="monotone" dataKey="AHV"      stroke="#22c55e" fill="url(#gAHV)" strokeWidth={2} />
        <Area type="monotone" dataKey="BVG"      stroke="#f59e0b" fill="url(#gBVG)" strokeWidth={2} />
        <Area type="monotone" dataKey="Pillar 3" stroke="#f43f5e" fill="url(#gP3)"  strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
