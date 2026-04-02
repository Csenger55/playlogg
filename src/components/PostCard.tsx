import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink } from 'lucide-react'
import type { Post } from '../types'

interface PostCardProps {
  post: Post
}

function Thumbnail({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  return (
    <div className="absolute inset-0" style={{ background: '#0e0e18' }}>
      {/* Subtle atmospheric light — single source, low opacity */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 78% 18%, ${color}22 0%, transparent 55%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />
      {/* Playing: very subtle pulse */}
      {isPlaying && (
        <div
          className="absolute inset-0 glow-pulse"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${color}0d 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  )
}

export function PostCard({ post }: PostCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted]     = useState(false)
  const [elapsed, setElapsed]     = useState(0)
  const [hovered, setHovered]     = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const DURATION = 7200

  const hasKick = !!post.kickChannel

  useEffect(() => {
    if (!hasKick && isPlaying) {
      intervalRef.current = setInterval(() => setElapsed((p) => Math.min(p + 1, DURATION)), 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPlaying, hasKick])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying((p) => !p)
  }

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  const progressPct = (elapsed / DURATION) * 100
  const showControls = isPlaying || hovered

  /* ── Kick embed URL ── */
  const kickEmbedSrc = post.kickChannel
    ? `https://player.kick.com/${post.kickChannel}?autoplay=true&muted=${isMuted ? 1 : 0}`
    : null

  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{
        background: '#15151d',
        border: '1px solid #1e1e2c',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={(e) => {
        setHovered(true)
        ;(e.currentTarget as HTMLDivElement).style.borderColor = '#27273a'
      }}
      onMouseLeave={(e) => {
        setHovered(false)
        ;(e.currentTarget as HTMLDivElement).style.borderColor = '#1e1e2c'
      }}
    >
      {/* Video / Thumbnail area */}
      <div
        className="relative overflow-hidden"
        style={{ paddingBottom: hasKick && isPlaying ? '56.25%' : '52%' }}
        onClick={!hasKick ? togglePlay : undefined}
      >
        <div className="absolute inset-0">

          {/* ── Kick live embed (when playing) ── */}
          {hasKick && isPlaying ? (
            <iframe
              src={kickEmbedSrc!}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
          ) : (
            /* ── CSS thumbnail (paused / no Kick) ── */
            <>
              <Thumbnail color={post.gameColor} isPlaying={false} />

              {/* Play button overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={togglePlay}
                style={{ opacity: showControls || !isPlaying ? 1 : 0, transition: 'opacity 0.15s' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(0,0,0,0.55)',
                    border: '1.5px solid rgba(255,255,255,0.18)',
                  }}
                >
                  <Play size={18} fill="white" className="text-white ml-0.5" />
                </div>
              </div>

              {/* Top badges */}
              <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-3 pointer-events-none">
                {post.isLive ? (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded"
                    style={{ background: '#e83c3c', color: '#fff' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Élő</span>
                  </div>
                ) : <div />}
                <div
                  className="px-2 py-0.5 rounded text-[10px] font-semibold"
                  style={{ background: 'rgba(0,0,0,0.6)', color: '#c8c8dc' }}
                >
                  {post.game}
                </div>
              </div>

              {/* Stat badge */}
              {post.stat && (
                <div className="absolute bottom-3 right-3 pointer-events-none">
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded"
                    style={{ background: 'rgba(0,0,0,0.65)', color: post.gameColor }}
                  >
                    {post.stat}
                  </span>
                </div>
              )}

              {/* Progress bar (simulated) */}
              {!hasKick && isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div
                    className="h-full"
                    style={{ width: `${progressPct}%`, background: post.gameColor, transition: 'width 1s linear' }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info row */}
      <div className="flex items-start justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold leading-snug" style={{ color: '#e4e4ef' }}>
            {post.title}
          </p>
          <p className="text-[12px] mt-0.5 leading-snug" style={{ color: '#52526a' }}>
            {post.description}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[11px]" style={{ color: '#3e3e56' }}>{post.timestamp}</span>
            <span style={{ color: '#27273a' }}>·</span>
            <span className="text-[11px]" style={{ color: '#3e3e56' }}>{post.author}</span>
          </div>
        </div>

        {/* Controls */}
        {isPlaying && (
          <div
            className="flex items-center gap-1 flex-shrink-0 mt-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            {!hasKick && (
              <span className="text-[10px] tabular-nums mr-1" style={{ color: '#52526a' }}>
                {formatTime(elapsed)}
              </span>
            )}
            <button
              className="w-6 h-6 flex items-center justify-center rounded transition-colors"
              style={{ color: '#52526a' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#8a8aa0')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#52526a')}
              onClick={() => setIsMuted((m) => !m)}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
            <button
              className="w-6 h-6 flex items-center justify-center rounded transition-colors"
              style={{ color: '#52526a' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#8a8aa0')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#52526a')}
              onClick={togglePlay}
            >
              <Pause size={13} />
            </button>
            {hasKick && (
              <a
                href={`https://kick.com/${post.kickChannel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center rounded transition-colors"
                style={{ color: '#52526a' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#8a8aa0')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#52526a')}
              >
                <ExternalLink size={12} />
              </a>
            )}
            {!hasKick && (
              <button
                className="w-6 h-6 flex items-center justify-center rounded transition-colors"
                style={{ color: '#52526a' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#8a8aa0')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#52526a')}
              >
                <Maximize2 size={12} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
