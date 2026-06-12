'use client'

import { useState } from 'react'
import { PiggyBank, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { chf } from '@/lib/formatters'

const MAX_3A = 7_056
const CONTRIBUTED = 5_400
const REMAINING   = MAX_3A - CONTRIBUTED
const pct = (a: number, b: number) => Math.round((a / b) * 100)

/* Rough marginal tax rates: federal + cantonal, for employed persons */
const CANTON_RATES: Record<string, { label: string; rate: Record<string, number> }> = {
  ZH: { label: 'Zurich',    rate: { 60: 0.22, 80: 0.26, 100: 0.30, 130: 0.34, 160: 0.37 } },
  BE: { label: 'Bern',      rate: { 60: 0.25, 80: 0.29, 100: 0.33, 130: 0.36, 160: 0.39 } },
  GE: { label: 'Geneva',    rate: { 60: 0.27, 80: 0.32, 100: 0.37, 130: 0.40, 160: 0.43 } },
  ZG: { label: 'Zug',       rate: { 60: 0.14, 80: 0.17, 100: 0.20, 130: 0.23, 160: 0.25 } },
  SZ: { label: 'Schwyz',    rate: { 60: 0.15, 80: 0.18, 100: 0.21, 130: 0.24, 160: 0.26 } },
  VD: { label: 'Vaud',      rate: { 60: 0.28, 80: 0.33, 100: 0.38, 130: 0.41, 160: 0.44 } },
}

const INCOME_BRACKETS = [
  { label: 'CHF 60\'000',  key: 60 },
  { label: 'CHF 80\'000',  key: 80 },
  { label: 'CHF 100\'000', key: 100 },
  { label: 'CHF 130\'000', key: 130 },
  { label: 'CHF 160\'000', key: 160 },
]

const accounts = [
  { name: 'ZKB Vorsorgekonto 3a',  type: '3a', balance: 62_500, return_pct: 1.2  },
  { name: 'VIAC Global 100 (3a)',  type: '3a', balance: 28_400, return_pct: 8.4  },
  { name: 'Freies Sparkonto (3b)', type: '3b', balance:  7_600, return_pct: 0.8  },
]

export default function Pillar3Page() {
  const [canton, setCanton] = useState('ZH')
  const [income, setIncome] = useState(100)
  const [extra,  setExtra]  = useState(REMAINING)

  const rate    = CANTON_RATES[canton].rate[income]
  const saving  = Math.round(extra * rate)

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center shrink-0">
          <PiggyBank size={20} className="text-rose-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">3rd Pillar – Private Savings</h1>
          <p className="text-slate-500 text-sm">Tied (3a) and flexible (3b) — your most powerful tax lever</p>
        </div>
      </div>

      {/* 3a progress */}
      <div className="card">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="section-title mb-1">2026 Pillar 3a Contribution Progress</p>
            <p className="text-sm text-slate-500">
              Annual maximum: <strong className="text-slate-800">{chf(MAX_3A)}</strong> · Deadline: <strong className="text-slate-800">31 December 2026</strong>
            </p>
          </div>
          <span className={`pill shrink-0 ${REMAINING > 0 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
            {REMAINING > 0 ? `CHF ${REMAINING.toLocaleString('de-CH')} remaining` : 'Fully maxed ✓'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-rose-500 h-3 rounded-full transition-all"
              style={{ width: `${pct(CONTRIBUTED, MAX_3A)}%` }}
            />
          </div>
          <span className="text-sm font-bold text-slate-700 shrink-0">
            {chf(CONTRIBUTED)} / {chf(MAX_3A)}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2">{pct(CONTRIBUTED, MAX_3A)}% of annual maximum used</p>
      </div>

      {/* Tax savings calculator */}
      <div className="card border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={18} className="text-green-600" />
          <p className="font-semibold text-green-900">Tax Savings Calculator</p>
        </div>

        <div className="grid grid-cols-3 gap-5 mb-6">
          <div>
            <label className="label">Your canton</label>
            <select
              value={canton}
              onChange={e => setCanton(e.target.value)}
              className="input"
            >
              {Object.entries(CANTON_RATES).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Gross income</label>
            <select
              value={income}
              onChange={e => setIncome(Number(e.target.value))}
              className="input"
            >
              {INCOME_BRACKETS.map(b => (
                <option key={b.key} value={b.key}>{b.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Additional contribution</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">CHF</span>
              <input
                type="number"
                min={0}
                max={MAX_3A}
                value={extra}
                onChange={e => setExtra(Math.min(MAX_3A, Math.max(0, Number(e.target.value))))}
                className="input pl-11"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-white rounded-xl p-4 border border-green-100">
          <CheckCircle size={28} className="text-green-500 shrink-0" />
          <div className="flex-1">
            <p className="text-lg font-bold text-slate-900">
              Contribute <span className="text-rose-600">{chf(extra)}</span> more → save{' '}
              <span className="text-green-700">{chf(saving)}</span> in taxes
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Based on ~{Math.round(rate * 100)}% marginal rate in {CANTON_RATES[canton].label}. Actual savings depend on your municipality and deductions.
            </p>
          </div>
        </div>
      </div>

      {/* Accounts */}
      <div className="card">
        <p className="section-title">Your Accounts</p>
        <div className="space-y-3">
          {accounts.map(acc => (
            <div key={acc.name} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`pill ${acc.type === '3a' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                  {acc.type}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{acc.name}</p>
                  <p className="text-xs text-slate-400">Return / interest: {acc.return_pct.toFixed(1)}% p.a.</p>
                </div>
              </div>
              <p className="text-lg font-bold text-slate-900">{chf(acc.balance)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3a vs 3b */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <p className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span className="pill bg-rose-50 text-rose-700">3a</span> Tied pension savings
          </p>
          <ul className="text-sm space-y-2">
            {[
              { ok: true,  text: 'Tax-deductible contributions (up to CHF 7\'056 / year)' },
              { ok: true,  text: 'Tax-free growth while invested' },
              { ok: false, text: 'Locked until retirement (age 60–65) or specific events' },
              { ok: false, text: 'Annual contribution cap applies' },
            ].map(({ ok, text }) => (
              <li key={text} className={`flex items-start gap-2 ${ok ? 'text-slate-700' : 'text-slate-400'}`}>
                <span className="mt-0.5 shrink-0">{ok ? '✓' : '✗'}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <p className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span className="pill bg-slate-100 text-slate-600">3b</span> Flexible private savings
          </p>
          <ul className="text-sm space-y-2">
            {[
              { ok: true,  text: 'No contribution limits — save as much as you want' },
              { ok: true,  text: 'Freely accessible at any time' },
              { ok: false, text: 'No tax deduction on contributions' },
              { ok: false, text: 'Returns subject to income / wealth tax' },
            ].map(({ ok, text }) => (
              <li key={text} className={`flex items-start gap-2 ${ok ? 'text-slate-700' : 'text-slate-400'}`}>
                <span className="mt-0.5 shrink-0">{ok ? '✓' : '✗'}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-800">
        <AlertCircle size={16} className="shrink-0 mt-0.5 text-blue-500" />
        <p>
          <strong>Tip:</strong> You can hold up to 5 separate 3a accounts in Switzerland. Splitting your 3a across multiple providers
          reduces the tax hit when you withdraw (each withdrawal is taxed separately at a reduced rate).
        </p>
      </div>
    </div>
  )
}
