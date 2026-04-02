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
      { quote: "Computers are good at following instructions, but not at reading your mind.", author: 'Donald Knuth' },
      { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: 'Martin Fowler' },
      { quote: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
      { quote: "Code is like humor. When you have to explain it, it's bad.", author: 'Cory House' },
      { quote: 'Programming is thinking, not typing.', author: 'Robert C. Martin' },
      { quote: 'The best programs are written so that computing machines can perform them quickly and so that human beings can understand them clearly.', author: 'Donald Knuth' },
      { quote: 'The competent programmer is fully aware of the limited size of his own skull. He therefore approaches his task with full humility.', author: 'Edsger Dijkstra' },
      { quote: "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.", author: 'Emanuel Sanders' },
      { quote: 'Deleted code is debugged code.', author: 'Jeff Sickel' },
      { quote: 'The most important property of a program is whether it accomplishes the intention of its user.', author: 'C.A.R. Hoare' },
      { quote: "A language that doesn't affect the way you think about programming is not worth knowing.", author: 'Alan Perlis' }
    ]
    const randomIndex = Math.floor(Math.random() * quotes.length)
    return res.status(200).json(quotes[randomIndex])
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load quotes' })
  }
}

