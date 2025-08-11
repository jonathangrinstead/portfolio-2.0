const fs = require('node:fs')
const path = require('node:path')

module.exports = async function handler(_req, res) {
  try {
    const file = path.join(process.cwd(), 'server', 'quotes.json')
    const raw = fs.readFileSync(file, 'utf-8')
    const quotes = JSON.parse(raw)
    const randomIndex = Math.floor(Math.random() * quotes.length)
    return res.status(200).json(quotes[randomIndex])
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load quotes' })
  }
}


