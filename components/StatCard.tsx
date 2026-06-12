import clsx from 'clsx'

interface StatCardProps {
  label: string
  value: string
  sub?: string
  accent?: 'blue' | 'green' | 'amber' | 'rose'
  icon?: React.ReactNode
}

const accentMap = {
  blue:  'bg-blue-50  text-blue-600  border-blue-100',
  green: 'bg-green-50 text-green-600 border-green-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  rose:  'bg-rose-50  text-rose-600  border-rose-100',
}

export default function StatCard({ label, value, sub, accent = 'blue', icon }: StatCardProps) {
  return (
    <div className={clsx('card flex items-start gap-4 border', accentMap[accent])}>
      {icon && (
        <div className="mt-0.5 shrink-0">{icon}</div>
      )}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}
