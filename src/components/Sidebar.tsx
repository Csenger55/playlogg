import { Search, CheckCircle2, Square, Minus, PauseCircle, UserPlus } from 'lucide-react'
import type { Friend } from '../types'
import { friends } from '../data/mockData'

function Avatar({ friend }: { friend: Friend }) {
  const [from] = friend.avatarGradient
  return (
    <div className="relative flex-shrink-0">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold text-white select-none"
        style={{ background: from }}
      >
        {friend.initial}
      </div>
      {friend.isOnline && (
        <span
          className="absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2"
          style={{ background: '#1ed760', borderColor: '#111119' }}
        />
      )}
    </div>
  )
}

function RightIcon({ type }: { type: NonNullable<Friend['rightIcon']> }) {
  const style = { color: '#52526a', flexShrink: 0 }
  switch (type) {
    case 'check':  return <CheckCircle2 size={14} style={{ ...style, color: '#1ed760', opacity: 0.8 }} />
    case 'square': return <Square       size={13} style={style} />
    case 'minus':  return <Minus        size={13} style={style} />
    case 'pause':  return <PauseCircle  size={13} style={style} />
  }
}

function FriendRow({ friend }: { friend: Friend }) {
  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer"
      style={{ transition: 'background 0.1s' }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = '#16161f')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}
    >
      <Avatar friend={friend} />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium truncate leading-snug" style={{ color: '#c8c8dc' }}>
          {friend.name}
        </p>
        <p className="text-[11px] truncate leading-snug" style={{ color: friend.statusColor === 'orange' ? '#f55500' : '#52526a' }}>
          {friend.status}
        </p>
      </div>
      {friend.rightIcon && <RightIcon type={friend.rightIcon} />}
    </div>
  )
}

function SectionLabel({ label, count }: { label: string; count: number }) {
  return (
    <div className="px-3 pt-4 pb-1 flex items-center justify-between">
      <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#3e3e56' }}>
        {label} — {count}
      </span>
    </div>
  )
}

export function Sidebar() {
  const online  = friends.filter((f) => f.isOnline)
  const offline = friends.filter((f) => !f.isOnline)

  return (
    <aside
      className="flex flex-col flex-shrink-0 overflow-hidden"
      style={{ width: '248px', background: '#111119', borderRight: '1px solid #1e1e2c' }}
    >
      {/* Search */}
      <div className="px-3 pt-4 pb-2">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-md"
          style={{ background: '#16161f', border: '1px solid #1e1e2c' }}
        >
          <Search size={13} strokeWidth={1.8} style={{ color: '#3e3e56', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Barátok keresése"
            className="flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#3e3e56]"
            style={{ color: '#c8c8dc' }}
          />
        </div>
      </div>

      {/* Friend list */}
      <div className="flex-1 overflow-y-auto px-0">
        {online.length > 0 && (
          <>
            <SectionLabel label="Online" count={online.length} />
            {online.map((f) => <FriendRow key={f.id} friend={f} />)}
          </>
        )}
        {offline.length > 0 && (
          <>
            <SectionLabel label="Offline" count={offline.length} />
            {offline.map((f) => <FriendRow key={f.id} friend={f} />)}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-3" style={{ borderTop: '1px solid #1e1e2c' }}>
        <button
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-[12px] font-medium transition-colors"
          style={{ color: '#52526a', background: 'transparent' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#16161f'
            ;(e.currentTarget as HTMLButtonElement).style.color = '#8a8aa0'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = '#52526a'
          }}
        >
          <UserPlus size={14} strokeWidth={1.8} />
          Barát hozzáadása
        </button>
      </div>
    </aside>
  )
}
