'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#22c55e', '#f59e0b', '#f43f5e']

const fmt = (v: number) =>
  new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF', maximumFractionDigits: 0 }).format(v)

interface Props {
  ahv: number
  bvg: number
  p3:  number
}

export default function PillarBreakdown({ ahv, bvg, p3 }: Props) {
  const data = [
    { name: '1st Pillar (AHV)', value: ahv },
    { name: '2nd Pillar (BVG)', value: bvg },
    { name: '3rd Pillar',       value: p3  },
  ]

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v: number) => fmt(v)} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
