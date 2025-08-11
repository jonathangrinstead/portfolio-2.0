module.exports = async function handler(_req, res) {
  try {
    const quotes = [
      { quote: 'The only way to learn a new programming language is by writing programs in it.', author: 'Dennis Ritchie' },
      { quote: "Sometimes it's better to leave something alone, to pause, and that's very true of programming.", author: 'Joyce Wheeler' },
      { quote: 'In some ways, programming is like painting. You start with a blank canvas and certain basic raw materials. You use a combination of science, art, and craft to determine what to do with them.', author: 'Andrew Hunt' },
      { quote: 'Everybody should learn to program a computer, because it teaches you how to think.', author: 'Steve Jobs' },
      { quote: 'A good programmer is someone who always looks both ways before crossing a one-way street.', author: 'Doug Linder' },
      { quote: 'Most of the good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.', author: 'Linus Torvalds' },
      { quote: 'Design is where science and art break even.', author: 'Robin Matthews' },
      { quote: "Computers are good at following instructions, but not at reading your mind.", author: 'Donald Knuth' }
    ]
    const randomIndex = Math.floor(Math.random() * quotes.length)
    return res.status(200).json(quotes[randomIndex])
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load quotes' })
  }
}

