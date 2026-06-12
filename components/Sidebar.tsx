'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  LayoutDashboard,
  Shield,
  Briefcase,
  PiggyBank,
  Calculator,
  Settings,
} from 'lucide-react'

const nav = [
  { href: '/',            label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/pillar1',     label: '1st Pillar (AHV)', icon: Shield },
  { href: '/pillar2',     label: '2nd Pillar (BVG)', icon: Briefcase },
  { href: '/pillar3',     label: '3rd Pillar',   icon: PiggyBank },
  { href: '/calculator',  label: 'Calculator',   icon: Calculator },
  { href: '/settings',    label: 'Settings',     icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 flex flex-col shadow-sm z-10">
      <div className="px-6 py-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">PP</span>
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">PensionPilot</p>
            <p className="text-xs text-slate-400">Swiss Edition</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
            )}
          >
            <Icon size={18} strokeWidth={1.8} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-slate-100">
        <p className="text-xs text-slate-400">© 2026 PensionPilot AG</p>
      </div>
    </aside>
  )
}
