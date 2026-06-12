import { PiggyBank, CheckCircle } from 'lucide-react'
import { chf } from '@/lib/formatters'

const accounts = [
  { name: 'Pillar 3a – ZKB Vorsorgekonto', type: '3a', balance: 62_500, rate: 1.2, maxContrib: 7_056 },
  { name: 'Pillar 3a – VIAC Global 100',   type: '3a', balance: 28_400, rate: 8.4, maxContrib: 7_056 },
  { name: 'Pillar 3b – Savings',           type: '3b', balance: 7_600,  rate: 0.8, maxContrib: null },
]

export default function Pillar3Page() {
  const contributed3a = 5_400
  const max3a = 7_056
  const remaining = max3a - contributed3a

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
          <PiggyBank size={20} className="text-rose-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">3rd Pillar – Private Savings</h1>
          <p className="text-slate-500 text-sm">Tied (3a) and flexible (3b) private pension savings</p>
        </div>
      </div>

      {/* Tax deduction banner */}
      <div className="card border border-green-100 bg-green-50">
        <div className="flex items-start gap-3">
          <CheckCircle size={20} className="text-green-600 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-green-800">Tax deduction available</p>
            <p className="text-green-700 mt-0.5">
              You have contributed <strong>{chf(contributed3a)}</strong> to pillar 3a in 2026.
              You can still deduct up to <strong>{chf(remaining)}</strong> more before 31 December to reduce your taxable income.
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>{chf(contributed3a)} contributed</span>
            <span>Max {chf(max3a)}</span>
          </div>
          <div className="w-full bg-green-100 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${(contributed3a / max3a) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Account list */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 mb-4">Your Accounts</h2>
        <div className="space-y-4">
          {accounts.map(acc => (
            <div key={acc.name} className="border border-slate-100 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`pill ${acc.type === '3a' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'}`}>
                      {acc.type}
                    </span>
                    <p className="font-semibold text-slate-900">{acc.name}</p>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Interest / return: {acc.rate.toFixed(1)} %</p>
                </div>
                <p className="text-xl font-bold text-slate-900">{chf(acc.balance)}</p>
              </div>
              {acc.maxContrib && (
                <p className="text-xs text-slate-500 mt-2">
                  Max annual deductible contribution: {chf(acc.maxContrib)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3a vs 3b explainer */}
      <div className="grid grid-cols-2 gap-5">
        <div className="card border border-rose-100">
          <p className="font-semibold text-slate-800 mb-2">Pillar 3a (tied)</p>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>✓ Tax-deductible contributions (up to CHF 7&apos;056 / year)</li>
            <li>✓ Tax-free growth while invested</li>
            <li>✗ Withdrawable only at retirement (or specific events)</li>
            <li>✗ Annual contribution limit</li>
          </ul>
        </div>
        <div className="card border border-slate-100">
          <p className="font-semibold text-slate-800 mb-2">Pillar 3b (flexible)</p>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>✓ No contribution limits</li>
            <li>✓ Freely accessible at any time</li>
            <li>✗ No tax deduction on contributions</li>
            <li>✗ Returns may be subject to wealth tax</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
