import { Shield, Briefcase, PiggyBank, TrendingUp } from 'lucide-react'
import StatCard from '@/components/StatCard'
import PensionGrowthChart from '@/components/PensionGrowthChart'
import PillarBreakdown from '@/components/PillarBreakdown'
import { chf } from '@/lib/formatters'

export default function Dashboard() {
  const ahv   = 420_000
  const bvg   = 285_000
  const p3    = 98_500
  const total = ahv + bvg + p3

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Good afternoon, Gabriel</h1>
        <p className="text-slate-500 mt-1">Your pension overview as of June 2026</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-5">
        <StatCard
          label="Total Pension Assets"
          value={chf(total)}
          sub="All 3 pillars combined"
          accent="blue"
          icon={<TrendingUp size={20} className="text-blue-500" />}
        />
        <StatCard
          label="1st Pillar (AHV)"
          value={chf(ahv)}
          sub="State pension entitlement"
          accent="green"
          icon={<Shield size={20} className="text-green-500" />}
        />
        <StatCard
          label="2nd Pillar (BVG)"
          value={chf(bvg)}
          sub="Occupational pension fund"
          accent="amber"
          icon={<Briefcase size={20} className="text-amber-500" />}
        />
        <StatCard
          label="3rd Pillar (3a/3b)"
          value={chf(p3)}
          sub="Private savings"
          accent="rose"
          icon={<PiggyBank size={20} className="text-rose-500" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 card">
          <h2 className="font-semibold text-slate-800 mb-4">Projected Growth to Retirement</h2>
          <PensionGrowthChart />
        </div>
        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-4">Pillar Breakdown</h2>
          <PillarBreakdown ahv={ahv} bvg={bvg} p3={p3} />
        </div>
      </div>

      {/* Retirement snapshot */}
      <div className="card border border-blue-100 bg-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Retirement Snapshot</p>
            <p className="text-slate-700 mt-1">
              At age 65 (2047) you are projected to have{' '}
              <span className="font-bold text-slate-900">{chf(1_420_000)}</span> in total assets,
              generating an estimated monthly income of{' '}
              <span className="font-bold text-slate-900">{chf(5_800)}</span>.
            </p>
          </div>
          <a href="/calculator" className="btn-primary shrink-0 ml-6">Run calculator</a>
        </div>
      </div>
    </div>
  )
}
