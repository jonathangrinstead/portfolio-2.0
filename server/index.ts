const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Nodefetch = require('node-fetch');

dotenv.config({ path: '.env' });

const app = express();
app.use(cors());
app.use(express.json());

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

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
