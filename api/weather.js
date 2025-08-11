module.exports = async function handler(req, res) {
  try {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY
    if (!WEATHER_API_KEY) {
      return res.status(500).json({ error: 'Missing WEATHER_API_KEY' })
    }

    const { city, lat, lon } = req.query ?? {}

    let url
    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${WEATHER_API_KEY}`
    } else {
      const safeCity = city || 'London'
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(safeCity)}&appid=${WEATHER_API_KEY}`
    }

    const response = await fetch(url)
    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch weather data' })
  }
}

