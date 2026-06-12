interface Props {
  score: number
}

function getMeta(score: number) {
  if (score >= 80) return { label: 'Excellent',        stroke: '#059669', textClass: 'text-emerald-600', bgClass: 'bg-emerald-50' }
  if (score >= 65) return { label: 'Well Positioned',  stroke: '#2563eb', textClass: 'text-blue-600',    bgClass: 'bg-blue-50'    }
  if (score >= 45) return { label: 'On Track',         stroke: '#d97706', textClass: 'text-amber-600',   bgClass: 'bg-amber-50'   }
  return               { label: 'Needs Attention',  stroke: '#dc2626', textClass: 'text-red-600',     bgClass: 'bg-red-50'     }
}

export default function PensionHealthScore({ score }: Props) {
  const r = 52
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const { label, stroke, textClass, bgClass } = getMeta(score)

  return (
    <div className={`card flex flex-col items-center justify-center gap-2 ${bgClass} border-0 h-full`}>
      <p className="label text-center">Pension Health Score</p>
      <div className="relative flex items-center justify-center">
        <svg width={128} height={128} viewBox="0 0 128 128">
          {/* Track */}
          <circle cx="64" cy="64" r={r} fill="none" stroke="#e2e8f0" strokeWidth="9" />
          {/* Progress */}
          <circle
            cx="64" cy="64" r={r}
            fill="none"
            stroke={stroke}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${circ} ${circ}`}
            strokeDashoffset={offset}
            transform="rotate(-90 64 64)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold leading-none ${textClass}`}>{score}</span>
          <span className="text-xs text-slate-400 mt-0.5">/ 100</span>
        </div>
      </div>
      <p className={`text-sm font-bold ${textClass}`}>{label}</p>
      <div className="text-center text-xs text-slate-500 space-y-0.5 mt-1">
        <p>✓ AHV 38 of 44 years complete</p>
        <p>✓ BVG returns above benchmark</p>
        <p className="text-amber-600 font-medium">· 3a not fully maxed this year</p>
      </div>
    </div>
  )
}
