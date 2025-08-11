const quotes = [
  { "quote": "The only way to learn a new programming language is by writing programs in it.", "author": "Dennis Ritchie" },
  { "quote": "Sometimes it's better to leave something alone, to pause, and that's very true of programming.", "author": "Joyce Wheeler" },
  { "quote": "In some ways, programming is like painting. You start with a blank canvas and certain basic raw materials. You use a combination of science, art, and craft to determine what to do with them.", "author": "Andrew Hunt" },
  { "quote": "Everybody should learn to program a computer, because it teaches you how to think.", "author": "Steve Jobs" },
  { "quote": "A good programmer is someone who always looks both ways before crossing a one-way street.", "author": "Doug Linder" },
  { "quote": "Most of the good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.", "author": "Linus Torvalds" },
  { "quote": "Design is where science and art break even.", "author": "Robin Matthews" },
  { "quote": "Computers are good at following instructions, but not at reading your mind.", "author": "Donald Knuth" },
  { "quote": "The spread of computers and the Internet will put jobs in two categories. People who tell computers what to do, and people who are told by computers what to do.", "author": "Marc Andreessen" },
  { "quote": "Coding, it's an endless process of trial and error, of trying to get the right command in the right place, with sometimes just a semicolon making the difference between success and failure.", "author": "Reshma Saujani" },
  { "quote": "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.", "author": "John Woods" },
  { "quote": "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.", "author": "Rick Cook" },
  { "quote": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", "author": "Martin Fowler" },
  { "quote": "The best programs are written so that computing machines can perform them quickly and so that human beings can understand them clearly.", "author": "Donald Knuth" },
  { "quote": "Bad programmers worry about the code. Good programmers worry about data structures and their relationships.", "author": "Linus Torvalds" },
  { "quote": "Debugging is like being the detective in a crime movie where you are also the murderer.", "author": "Filipe Fortes" },
  { "quote": "Talk is cheap. Show me the code.", "author": "Linus Torvalds" },
  { "quote": "If debugging is the process of removing software bugs, then programming must be the process of putting them in.", "author": "Edsger Dijkstra" },
  { "quote": "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", "author": "Bill Gates" },
  { "quote": "First, solve the problem. Then, write the code.", "author": "John Johnson" },
  { "quote": "Code is like humor. When you have to explain it, it’s bad.", "author": "Cory House" },
  { "quote": "Make it work, make it right, make it fast.", "author": "Kent Beck" },
  { "quote": "Clean code always looks like it was written by someone who cares.", "author": "Robert C. Martin" },
  { "quote": "Of course, bad code can be cleaned up. But it’s very expensive.", "author": "Robert C. Martin" },
  { "quote": "Programming is the art of algorithm design and the craft of debugging errant code.", "author": "Ellen Ullman" },
  { "quote": "Premature optimization is the root of all evil.", "author": "Donald Knuth" },
  { "quote": "One of my most productive days was throwing away 1000 lines of code.", "author": "Ken Thompson" },
  { "quote": "Computer science is no more about computers than astronomy is about telescopes.", "author": "Edsger Dijkstra" },
  { "quote": "The purpose of software engineering is to control complexity, not to create it.", "author": "Pamela Zave" },
  { "quote": "Before software can be reusable, it has first to be usable.", "author": "Ralph Johnson" },
  { "quote": "Optimization of clear code is easy. Clarification of optimized code is hard.", "author": "Michael Feathers" },
  { "quote": "Coding like poetry should be short and concise.", "author": "Santosh Kalwar" },
  { "quote": "It's not a bug; it's an undocumented feature.", "author": "Anonymous" },
  { "quote": "Programming is like writing a book... except if you miss out a single comma on page 126 the whole thing makes no sense.", "author": "Unknown" },
  { "quote": "The best way to get a project done faster is to start sooner.", "author": "Jim Highsmith" },
  { "quote": "Good code is its own best documentation.", "author": "Steve McConnell" },
  { "quote": "The best software is written by teams who know how to work together.", "author": "Martin Fowler" },
  { "quote": "The most important skill for a programmer is the ability to learn new things quickly.", "author": "John Resig" },
  { "quote": "Learning to code is useful no matter what your career ambitions are.", "author": "Sheryl Sandberg" },
  { "quote": "An algorithm must be seen to be believed.", "author": "Donald Knuth" },
  { "quote": "When debugging, novices insert corrective code; experts remove defective code.", "author": "Richard E. Pattis" },
  { "quote": "UNIX is basically a simple operating system, but you have to be a genius to understand the simplicity.", "author": "Dennis Ritchie" },
  { "quote": "Abstraction is essential. Complexity is anything that makes software hard to understand or to modify.", "author": "John Ousterhout" },
  { "quote": "All problems in computer science can be solved by another level of indirection.", "author": "David Wheeler" },
  { "quote": "Simplicity is prerequisite for reliability.", "author": "Edsger Dijkstra" },
  { "quote": "Walking on water and developing software from a specification are easy if both are frozen.", "author": "Edward V Berard" },
  { "quote": "Design is the art of arranging code to work today, and be changeable forever.", "author": "Sandi Metz" },
  { "quote": "Compatibility means deliberately repeating other people's mistakes.", "author": "David Wheeler" },
  { "quote": "The best way to predict the future is to invent it.", "author": "Alan Kay" },
  { "quote": "Any sufficiently advanced bug is indistinguishable from a feature.", "author": "Rich Kulawiec" },
  { "quote": "The function of good software is to make the complex appear to be simple.", "author": "Grady Booch" }
]

module.exports = async function handler(_req, res) {
  try {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    return res.status(200).json(quotes[randomIndex])
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load quotes' })
  }
}


