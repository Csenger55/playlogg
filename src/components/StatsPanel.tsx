import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react'

interface StatRow {
  label: string
  value: string
  trend: 'up' | 'down' | 'neutral'
  bar?: number  // 0–100
}

const stats: StatRow[] = [
  { label: 'K/D arány',       value: '1.84', trend: 'up',      bar: 72 },
  { label: 'Győzelmi arány',  value: '62%',  trend: 'up',      bar: 62 },
  { label: 'Pont / meccs',    value: '78.4', trend: 'down',    bar: 48 },
  { label: 'Meccsek',         value: '124',  trend: 'neutral', bar: 55 },
  { label: 'Headshot %',      value: '41%',  trend: 'up',      bar: 41 },
]

const trendColor = { up: '#1ed760', down: '#e83c3c', neutral: '#52526a' }

export function StatsPanel() {
  return (
    <div className="rounded-lg overflow-hidden" style={{ background: '#15151d', border: '1px solid #1e1e2c' }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #1e1e2c' }}>
        <span className="text-[13px] font-semibold" style={{ color: '#c8c8dc' }}>Statisztikák</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{ background: '#f5550018', color: '#f55500', border: '1px solid #f5550030' }}>
          CS2
        </span>
      </div>

      {/* Stats */}
      <div className="px-4 py-3 space-y-3.5">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px]" style={{ color: '#52526a' }}>{s.label}</span>
              <div className="flex items-center gap-1">
                {s.trend === 'up'      && <TrendingUp   size={10} style={{ color: trendColor.up }} />}
                {s.trend === 'down'    && <TrendingDown size={10} style={{ color: trendColor.down }} />}
                {s.trend === 'neutral' && <Minus        size={10} style={{ color: trendColor.neutral }} />}
                <span className="text-[12px] font-semibold tabular-nums" style={{ color: '#c8c8dc' }}>
                  {s.value}
                </span>
              </div>
            </div>
            {s.bar !== undefined && (
              <div className="h-0.5 rounded-full overflow-hidden" style={{ background: '#1e1e2c' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${s.bar}%`,
                    background: trendColor[s.trend],
                    opacity: 0.6,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 pb-3">
        <button
          className="flex items-center gap-1 text-[12px] font-medium transition-colors"
          style={{ color: '#3e3e56' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#8a8aa0')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#3e3e56')}
        >
          Összes megtekintése <ArrowRight size={12} />
        </button>
      </div>
    </div>
  )
}
