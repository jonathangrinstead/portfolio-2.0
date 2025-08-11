module.exports = async function handler(_req, res) {
  try {
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN
    const client_id = process.env.SPOTIFY_CLIENT_ID
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET

    if (!refresh_token || !client_id || !client_secret) {
      return res.status(500).json({ error: 'Missing Spotify env vars' })
    }

    const authResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    })

    const authData = await authResponse.json()
    if (!authData.access_token) {
      return res.status(401).json({ error: 'Spotify authentication failed', details: authData })
    }

    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { Authorization: `Bearer ${authData.access_token}` },
    })
    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      return res.status(200).json({ message: 'No recently played tracks found', track: null })
    }

    const mostRecentTrack = data.items[0]
    const trackInfo = {
      name: mostRecentTrack.track.name,
      artist: mostRecentTrack.track.artists[0].name,
      album: mostRecentTrack.track.album.name,
      albumImage: mostRecentTrack.track.album.images[0]?.url,
      externalUrl: mostRecentTrack.track.external_urls.spotify,
      playedAt: mostRecentTrack.played_at,
      duration: mostRecentTrack.track.duration_ms,
      popularity: mostRecentTrack.track.popularity,
    }

    return res.status(200).json(trackInfo)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch Spotify data' })
  }
}


