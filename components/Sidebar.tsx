'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  LayoutDashboard, Shield, Briefcase, PiggyBank, Calculator, Settings,
} from 'lucide-react'

const nav = [
  { href: '/',           label: 'Dashboard',        icon: LayoutDashboard, badge: null },
  { href: '/pillar1',    label: '1st Pillar (AHV)', icon: Shield,          badge: null },
  { href: '/pillar2',    label: '2nd Pillar (BVG)', icon: Briefcase,       badge: null },
  { href: '/pillar3',    label: '3rd Pillar',        icon: PiggyBank,       badge: 'Act by Dec 31' },
  { href: '/calculator', label: 'Calculator',        icon: Calculator,      badge: null },
  { href: '/settings',   label: 'Settings',          icon: Settings,        badge: null },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 flex flex-col z-10">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm tracking-tight">PP</span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-900 text-sm leading-tight">PensionPilot</p>
            <p className="text-xs text-slate-400">Swiss Pension Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group',
                active
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              )}
            >
              <Icon size={17} strokeWidth={active ? 2.2 : 1.8} className="shrink-0" />
              <span className="flex-1 truncate">{label}</span>
              {badge && (
                <span className={clsx(
                  'text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-tight shrink-0',
                  active ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700',
                )}>
                  {badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Profile */}
      <div className="px-4 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
            GS
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">Gabriel Schmid</p>
            <p className="text-xs text-slate-400">Zurich · Age 44</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
