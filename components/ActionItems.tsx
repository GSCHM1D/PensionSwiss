import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { chf } from '@/lib/formatters'

const items = [
  {
    priority: 'high',
    title:    'Maximise Pillar 3a contribution',
    detail:   `Contribute ${chf(1_656)} more before 31 Dec — save ~${chf(497)} in taxes.`,
    href:     '/pillar3',
    impact:   `+ ${chf(497)} saved`,
  },
  {
    priority: 'medium',
    title:    'Fill AHV contribution gaps',
    detail:   `Years 2003 & 2004 are missing. Back-payment ~${chf(1_200)} → higher pension for life.`,
    href:     '/pillar1',
    impact:   '+ CHF 48 / month',
  },
  {
    priority: 'low',
    title:    'Review BVG investment strategy',
    detail:   `Your current allocation is conservative for your age. Switching to a higher-equity BVG strategy could yield +1.5% p.a.`,
    href:     '/pillar2',
    impact:   `+ ${chf(28_000)} at retirement`,
  },
]

const priorityStyle: Record<string, string> = {
  high:   'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low:    'bg-slate-100 text-slate-600',
}

const priorityLabel: Record<string, string> = {
  high: 'High', medium: 'Medium', low: 'Low',
}

export default function ActionItems() {
  return (
    <div className="card h-full">
      <p className="section-title">Actions for 2026</p>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="group">
            <Link href={item.href} className="block border border-slate-100 rounded-xl p-3.5 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <span className={`pill ${priorityStyle[item.priority]}`}>{priorityLabel[item.priority]}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.detail}</p>
                    <p className="text-xs font-semibold text-green-600 mt-1">{item.impact}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-500 shrink-0 mt-1 transition-colors" />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
