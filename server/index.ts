const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Nodefetch = require('node-fetch');
const mapboxgl = require('mapbox-gl');

dotenv.config({ path: '.env' });

const app = express();
app.use(cors());
app.use(express.json());

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_API_KEY;

app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'London';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get('/api/quotes', (_req, res) => {
  const quotes = require('./quotes.json');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json(quotes[randomIndex]);
});

app.get('/api/spotify', async (_req, res) => {
  try {
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    // Get new access token using refresh token
    const authResponse = await Nodefetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`
    });

    const authData = await authResponse.json();

    // Check if authentication was successful
    if (!authData.access_token) {
      console.error('Authentication failed:', authData);
      return res.status(401).json({ error: 'Spotify authentication failed' });
    }

    // Get recently played tracks
    const response = await Nodefetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        'Authorization': `Bearer ${authData.access_token}`
      }
    });

    const data = await response.json();
    
    // Check if we have any recently played tracks
    if (!data.items || data.items.length === 0) {
      return res.json({ 
        message: 'No recently played tracks found',
        track: null
      });
    }
    
    // Extract the most recent track data
    const mostRecentTrack = data.items[0];
    const trackInfo = {
      name: mostRecentTrack.track.name,
      artist: mostRecentTrack.track.artists[0].name,
      album: mostRecentTrack.track.album.name,
      albumImage: mostRecentTrack.track.album.images[0]?.url,
      externalUrl: mostRecentTrack.track.external_urls.spotify,
      playedAt: mostRecentTrack.played_at,
      duration: mostRecentTrack.track.duration_ms,
      popularity: mostRecentTrack.track.popularity
    };
    
    res.json(trackInfo);
  } catch (error) {
    console.error('Spotify API Error:', error);
    res.status(500).json({ error: 'Failed to fetch Spotify data' });
  }
});
