import { Shield, Briefcase, PiggyBank } from 'lucide-react'
import StatCard from '@/components/StatCard'
import PensionGrowthChart from '@/components/PensionGrowthChart'
import PensionHealthScore from '@/components/PensionHealthScore'
import ActionItems from '@/components/ActionItems'
import RetirementCountdown from '@/components/RetirementCountdown'
import { chf } from '@/lib/formatters'

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good afternoon, Gabriel 👋</h1>
          <p className="text-slate-500 text-sm mt-0.5">Your Swiss pension overview · June 2026</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Total pension assets</p>
          <p className="text-3xl font-bold text-slate-900 mt-0.5">{chf(803_500)}</p>
        </div>
      </div>

      {/* Retirement countdown */}
      <RetirementCountdown />

      {/* Health score + 3 pillar cards */}
      <div className="grid grid-cols-4 gap-4">
        <PensionHealthScore score={72} />
        <StatCard
          label="1st Pillar (AHV)"
          value={chf(420_000)}
          sub="38 / 44 contribution years"
          accent="green"
          icon={<Shield size={18} className="text-green-500" />}
        />
        <StatCard
          label="2nd Pillar (BVG)"
          value={chf(285_000)}
          sub="+6.8% YTD · above benchmark"
          accent="amber"
          icon={<Briefcase size={18} className="text-amber-500" />}
        />
        <StatCard
          label="3rd Pillar (3a/3b)"
          value={chf(98_500)}
          sub="CHF 1'656 remaining for 2026"
          accent="rose"
          icon={<PiggyBank size={18} className="text-rose-500" />}
        />
      </div>

      {/* Growth chart + Action items */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 card">
          <p className="section-title">Projected total assets to retirement (2047)</p>
          <PensionGrowthChart />
        </div>
        <ActionItems />
      </div>

      {/* 3a tax deadline banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 px-6 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 font-bold text-sm shrink-0">
            202
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-900">Pillar 3a tax deadline in 202 days (31 Dec 2026)</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Contribute CHF 1&apos;656 more to reach the CHF 7&apos;056 maximum and save up to <strong>CHF 497</strong> in cantonal &amp; federal taxes.
            </p>
          </div>
        </div>
        <a href="/pillar3" className="btn-primary bg-amber-500 hover:bg-amber-600 shrink-0">
          Optimise now
        </a>
      </div>
    </div>
  )
}
