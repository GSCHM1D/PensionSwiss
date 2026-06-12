import clsx from 'clsx'

interface StatCardProps {
  label: string
  value: string
  sub?: string
  accent?: 'blue' | 'green' | 'amber' | 'rose'
  icon?: React.ReactNode
}

const styles = {
  blue:  { border: 'border-blue-100',  bg: 'bg-blue-50',  title: 'text-blue-600'  },
  green: { border: 'border-green-100', bg: 'bg-green-50', title: 'text-green-600' },
  amber: { border: 'border-amber-100', bg: 'bg-amber-50', title: 'text-amber-600' },
  rose:  { border: 'border-rose-100',  bg: 'bg-rose-50',  title: 'text-rose-600'  },
}

export default function StatCard({ label, value, sub, accent = 'blue', icon }: StatCardProps) {
  const s = styles[accent]
  return (
    <div className={clsx('card border h-full', s.border, s.bg)}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <p className={clsx('text-xs font-semibold uppercase tracking-wide', s.title)}>{label}</p>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  )
}
