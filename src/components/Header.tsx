import { Search, Bell } from 'lucide-react'
import type { NavTab } from '../types'

interface HeaderProps {
  activeTab: NavTab
  onTabChange: (tab: NavTab) => void
}

const NAV_TABS: NavTab[] = ['Stats', 'Kezdőoldal', 'Hírek', 'Profil', 'Games']

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-6 flex-shrink-0 z-20 gap-8"
      style={{
        height: '52px',
        background: '#111119',
        borderBottom: '1px solid #1e1e2c',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 select-none flex-shrink-0" style={{ minWidth: 140 }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2C11 2 16 7.5 16 12.5C16 15.5 13.8 18 11 18C8.2 18 6 15.5 6 12.5C6 10.2 7.4 8.4 7.4 8.4C7.4 8.4 6.8 11.2 9.2 12.2C9.2 12.2 8.5 9.4 11 8C11 8 10.2 10.8 12.3 11.6C12.3 11.6 14 10 14 12.8C14 14.3 12.7 15.5 11 15.5C9.3 15.5 8 14.3 8 12.8C8 11.5 9 10.5 10 10.2" stroke="#f55500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <span className="text-[15px] font-bold tracking-tight">
          <span style={{ color: '#e4e4ef' }}>Play</span><span style={{ color: '#f55500' }}>Logg</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex items-center gap-1 flex-1 justify-center">
        {NAV_TABS.map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className="relative px-4 py-1.5 rounded-md text-[13px] font-medium transition-all duration-100"
              style={{
                color: isActive ? '#e4e4ef' : '#52526a',
                background: isActive ? '#1a1a26' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#8a8aa0'
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#52526a'
              }}
            >
              {tab}
              {isActive && (
                <span
                  className="absolute bottom-0 left-4 right-4 rounded-t-full"
                  style={{ height: '2px', background: '#f55500' }}
                />
              )}
            </button>
          )
        })}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-shrink-0" style={{ minWidth: 140, justifyContent: 'flex-end' }}>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
          style={{ color: '#52526a' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#8a8aa0'
            ;(e.currentTarget as HTMLButtonElement).style.background = '#1a1a26'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#52526a'
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
          }}
        >
          <Search size={16} strokeWidth={1.8} />
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-md transition-colors relative"
          style={{ color: '#52526a' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#8a8aa0'
            ;(e.currentTarget as HTMLButtonElement).style.background = '#1a1a26'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#52526a'
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
          }}
        >
          <Bell size={16} strokeWidth={1.8} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: '#f55500' }}
          />
        </button>
        {/* User avatar */}
        <button
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
          style={{ background: '#f55500', color: '#fff' }}
        >
          CS
        </button>
      </div>
    </header>
  )
}
