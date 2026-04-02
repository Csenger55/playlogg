import { Router } from 'express'

const router = Router()

// Fetch raw Steam user stats for a given appid
async function fetchSteamStats(steamId: string, appId: number): Promise<Record<string, number> | null> {
  const key = process.env.STEAM_API_KEY
  if (!key) return null

  try {
    const url = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&steamid=${steamId}&key=${key}`
    const res = await fetch(url)
    if (!res.ok) return null

    const data = await res.json() as { playerstats?: { stats?: { name: string; value: number }[] } }
    if (!data.playerstats?.stats) return null

    return Object.fromEntries(data.playerstats.stats.map((s) => [s.name, s.value]))
  } catch {
    return null
  }
}

// GET /api/steam-stats/cs2/:steamId
// CS2 app ID: 730
router.get('/cs2/:steamId', async (req, res) => {
  if (!process.env.STEAM_API_KEY) {
    return res.status(503).json({ error: 'no_api_key' })
  }

  const m = await fetchSteamStats(req.params.steamId, 730)
  if (!m) return res.status(502).json({ error: 'fetch_failed' })

  const kills       = m['total_kills']          ?? 0
  const deaths      = m['total_deaths']         ?? 0
  const wins        = m['total_wins']           ?? 0
  const rounds      = m['total_rounds_played']  ?? 0
  const hsKills     = m['total_kills_headshot'] ?? 0
  const shotsFired  = m['total_shots_fired']    ?? 0
  const shotsHit    = m['total_shots_hit']      ?? 0

  res.json({
    kd_ratio:      deaths  > 0 ? parseFloat((kills / deaths).toFixed(2))          : 0,
    win_rate:      rounds  > 0 ? parseFloat(((wins  / rounds) * 100).toFixed(1))  : 0,
    headshot_pct:  kills   > 0 ? parseFloat(((hsKills / kills) * 100).toFixed(1)) : 0,
    accuracy:      shotsFired > 0 ? parseFloat(((shotsHit / shotsFired) * 100).toFixed(1)) : 0,
    total_wins:    wins,
    total_kills:   kills,
    total_deaths:  deaths,
  })
})

// GET /api/steam-stats/apex/:steamId
// Apex Legends app ID: 1172470
router.get('/apex/:steamId', async (req, res) => {
  if (!process.env.STEAM_API_KEY) {
    return res.status(503).json({ error: 'no_api_key' })
  }

  const m = await fetchSteamStats(req.params.steamId, 1172470)
  if (!m) return res.status(502).json({ error: 'fetch_failed' })

  // Apex Steam stat names (EA exposes a limited set)
  const kills   = m['kills']        ?? m['total_kills'] ?? 0
  const wins    = m['wins']         ?? 0
  const games   = m['games_played'] ?? m['total_games_played'] ?? 0
  const damage  = m['damage_done']  ?? m['damage'] ?? 0
  const revives = m['revives']      ?? 0

  res.json({
    kd_ratio:    0,
    win_rate:    games > 0 ? parseFloat(((wins / games) * 100).toFixed(1)) : 0,
    total_kills: kills,
    total_wins:  wins,
    games_played: games,
    damage_done:  damage,
    revives,
  })
})

export default router
