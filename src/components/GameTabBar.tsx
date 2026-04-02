import { Plus } from 'lucide-react'
import type { GameTab } from '../types'

interface GameTabBarProps {
  activeGame: string
  onSelect: (id: string) => void
  tabs: GameTab[]
  onAdd?: () => void
}

export function GameTabBar({ activeGame, onSelect, tabs, onAdd }: GameTabBarProps) {
  return (
    <div className="flex items-center gap-2 no-scrollbar overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab.id === activeGame
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-md text-[12px] font-semibold flex-shrink-0 transition-all duration-150"
            style={{
              background: isActive ? tab.color + '18' : 'transparent',
              color: isActive ? tab.color : '#52526a',
              border: `1px solid ${isActive ? tab.color + '40' : '#1e1e2c'}`,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.color = '#8a8aa0'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#27273a'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.color = '#52526a'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#1e1e2c'
              }
            }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: isActive ? tab.color : '#3e3e56' }}
            />
            {tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}
          </button>
        )
      })}

      <button
        onClick={onAdd}
        className="flex items-center gap-1.5 px-3 py-2 rounded-md text-[12px] font-medium flex-shrink-0 transition-all duration-150"
        style={{
          color: '#3e3e56',
          border: '1px solid #1e1e2c',
          background: 'transparent',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = '#8a8aa0'
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#27273a'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = '#3e3e56'
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#1e1e2c'
        }}
      >
        <Plus size={13} strokeWidth={2} />
        Csoport
      </button>
    </div>
  )
}
