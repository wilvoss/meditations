class QuoteObject {
  constructor(spec) {
    this.quote = spec.quote == undefined ? '' : spec.quote;
    this.attribution = spec.attribution == undefined ? '' : spec.attribution;
  }
}

var Quotes = [
  new QuoteObject({
    quote: 'Curiosity is one of the great secrets of happiness.',
    attribution: 'Bryant H. McGill',
  }),
  new QuoteObject({
    quote: 'I have no special talents. I am only passionately curious.',
    attribution: 'Albert Einstein',
  }),
  new QuoteObject({
    quote: 'The future belongs to the curious.',
    attribution: 'Anonymous',
  }),
  new QuoteObject({
    quote: 'Curiosity is the engine of achievement.',
    attribution: 'Ken Robinson',
  }),
  new QuoteObject({
    quote: 'The important thing is not to stop questioning. Curiosity has its own reason for existing.',
    attribution: 'Albert Einstein',
  }),
  new QuoteObject({
    quote: 'Curiosity is the most powerful thing you own.',
    attribution: 'Anonymous',
  }),
  new QuoteObject({
    quote: 'Your curiosity is your growth point always.',
    attribution: 'Danielle LaPorte',
  }),
  new QuoteObject({
    quote: 'Curiosity is the fuel for discovery, inquiry, and learning.',
    attribution: 'Anonymous',
  }),
  new QuoteObject({
    quote: 'When you’re curious you find lots of interesting things to do.',
    attribution: 'Walt Disney',
  }),
  new QuoteObject({
    quote: 'Curiosity about life in all aspects, I think, is still the secret of great creative people.',
    attribution: 'Leo Burnett',
  }),
  new QuoteObject({
    quote: 'If you can let go of passion and follow your curiosity, your curiosity just might lead you to your passion.',
    attribution: 'Elizabeth Gilbert',
  }),
  new QuoteObject({
    quote: 'To be curious about that which is not one’s concern while still in ignorance of oneself is absurd.',
    attribution: 'Plato',
  }),
  new QuoteObject({
    quote: 'May you always have a beautiful soul with a fierce demeanor and a curiosity to know.',
    attribution: 'Anonymous',
  }),
  new QuoteObject({
    quote: 'Be curious. Read widely. Try new things. What people call intelligence just boils down to curiosity.',
    attribution: 'Aaron Swartz',
  }),
  new QuoteObject({
    quote: 'Curiosity keeps leading us down new paths.',
    attribution: 'Walt Disney',
  }),
  new QuoteObject({
    quote: 'Be curious, not judgmental.',
    attribution: 'Walt Whitman',
  }),
  new QuoteObject({
    quote: 'Life must be lived and curiosity kept alive.',
    attribution: 'Eleanor Roosevelt',
  }),
  new QuoteObject({
    quote: 'Much of what I stumbled into by following my curiosity and intuition turned out to be priceless later on.',
    attribution: 'Steve Jobs',
  }),
  new QuoteObject({
    quote: 'The public have an insatiable curiosity to know everything, except what is worth knowing.',
    attribution: 'Oscar Wilde',
  }),
  new QuoteObject({
    quote: 'Curiosity is the lust of the mind.',
    attribution: 'Thomas Hobbes',
  }),
  new QuoteObject({
    quote: 'Curiosity is the one thing invincible in nature.',
    attribution: 'Freya Stark',
  }),
  new QuoteObject({
    quote: 'Curiosity is the hunger of the human mind.',
    attribution: 'Rose Wilder Lane',
  }),
  new QuoteObject({
    quote: 'Awaken the curiosity within you.',
    attribution: 'ATGW',
  }),
  new QuoteObject({
    quote: 'Learning is by nature, curiosity.',
    attribution: 'Plato',
  }),
  new QuoteObject({
    quote: 'Blessed are the curious for they shall have adventures.',
    attribution: 'Anonymous',
  }),
  new QuoteObject({
    quote: 'Curiosity is one of the most valuable characteristics one can possess. When coupled with fearlessness and determination, that’s freedom.',
    attribution: 'Anonymous',
  }),
  new QuoteObject({
    quote: 'Don’t let anyone rob you of your imagination, your creativity, or your curiosity. It’s your place in the world; it’s your life. Go on and do all you can with it, and make it the life you want to live.',
    attribution: 'Mae Jemison',
  }),
  new QuoteObject({
    quote: 'Ideas come from curiosity.',
    attribution: 'Walt Disney',
  }),
  new QuoteObject({
    quote: 'Creativity grows out of two things: curiosity and imagination.',
    attribution: 'Benny Goodman',
  }),
  new QuoteObject({
    quote: 'Never lose your curiosity.',
    attribution: 'Anonymous',
  }),
  new QuoteObject({
    quote: 'Let your curiosity lead you down a road that is less traveled.',
    attribution: 'ATGW',
  }),
  new QuoteObject({
    quote: 'It is so important to allow children to bloom and to be driven by their curiosity.',
    attribution: 'May-Britt Moser',
  }),
  new QuoteObject({
    quote: 'Curiosity is life.',
    attribution: 'Mark Parker',
  }),
  new QuoteObject({
    quote: 'The best in business have boundless curiosity and open minds.',
    attribution: 'Robin Sharma',
  }),
  new QuoteObject({
    quote: 'Replace fear of the unknown with curiosity.',
    attribution: 'Billy Cox',
  }),
  new QuoteObject({
    quote: 'Live in the leading — the spaces in between the rules.',
    attribution: 'Stefan Mumaw',
  }),
  new QuoteObject({
    quote: 'Have no fear of perfection — you’ll never reach it.',
    attribution: 'Salvador Dali',
  }),
  new QuoteObject({
    quote: 'Good design is like a refrigerator — when it works, no one notices, but when it doesn’t, it sure stinks.',
    attribution: 'Irene Au',
  }),
  new QuoteObject({
    quote: 'Digital design is like painting, except the paint never dries.',
    attribution: 'Neville Brody',
  }),
  new QuoteObject({
    quote: 'The alternative to good design is always bad design. There is no such thing as no design.',
    attribution: 'Adam Judge',
  }),
  new QuoteObject({
    quote: 'Creativity is nothing but a mind set free.',
    attribution: 'Torrie T. Asai ',
  }),
  new QuoteObject({
    quote: 'Design transcends agenda. It speaks to the politics of optimism.',
    attribution: 'Paul Bennett',
  }),
  new QuoteObject({
    quote: 'It’s through mistakes that you actually can grow. You have to get bad in order to get good.',
    attribution: 'Paula Scher',
  }),
  new QuoteObject({
    quote: 'Get rid of everything that is not essential to making a point.',
    attribution: 'Christoph Niemann',
  }),
  new QuoteObject({
    quote: 'The role of the designer is that of a good, thoughtful host anticipating the needs of their guests.',
    attribution: 'Charles Eames',
  }),
  new QuoteObject({
    quote: 'Graphic design will save the world right after rock and roll does.',
    attribution: 'David Carson',
  }),
  new QuoteObject({
    quote: 'Creativity is nothing but the way to solve new problems.',
    attribution: 'Anonymous',
  }),
  new QuoteObject({
    quote: 'Make it simple, but significant.',
    attribution: 'Don Draper',
  }),
  new QuoteObject({
    quote: 'Design can be art. Design can be simple. That’s why it’s so complicated.',
    attribution: 'Paul Rand',
  }),
  new QuoteObject({
    quote: 'Simplicity is the ultimate sophistication.',
    attribution: 'Leonardo da Vinci',
  }),
  new QuoteObject({
    quote: 'Whitespace is like air: it is necessary for design to breathe.',
    attribution: 'Wojciech Zieliński',
  }),
  new QuoteObject({
    quote: 'Look at usual things with unusual eyes.',
    attribution: 'Vico Magistretti',
  }),
  new QuoteObject({
    quote: 'People ignore designs that ignore people.',
    attribution: 'Frank Chimero',
  }),
  new QuoteObject({
    quote: 'You don’t have to be ‘a creative’ to be creative.',
    attribution: 'Droby Ben-Menachem',
  }),
  new QuoteObject({
    quote: 'I love deadlines. I like the whooshing sound they make as they fly by.',
    attribution: 'Douglas Adams',
  }),
  new QuoteObject({
    quote: 'For every complex problem, there is an answer that is clear, simple, and wrong.',
    attribution: 'H. L. Mencken',
  }),
  new QuoteObject({
    quote: 'Design is thinking made visual.',
    attribution: 'Saul Bass',
  }),
  new QuoteObject({
    quote: 'The best way to predict the future is to create it.',
    attribution: 'Abraham Lincoln',
  }),
  new QuoteObject({
    quote: 'Recognizing the need is the primary condition for design.',
    attribution: 'Charles Eames',
  }),
  new QuoteObject({
    quote: 'How well we communicate is determined not by how well we say things, but how well we are understood.',
    attribution: 'Andrew Grove',
  }),
  new QuoteObject({
    quote: 'Good design is obvious. Great design is transparent.',
    attribution: 'Joe Sparano',
  }),
  new QuoteObject({
    quote: 'Where do new ideas come from? The answer is simple: differences. Creativity comes from unlikely juxtapositions.',
    attribution: 'Nicholas Negroponte',
  }),
  new QuoteObject({
    quote: 'Do not seek praise. Seek criticism.',
    attribution: 'Paul Arden',
  }),
  new QuoteObject({
    quote: 'Styles come and go. Good design is a language, not a style.',
    attribution: 'Massimo Vignelli',
  }),
  new QuoteObject({
    quote: 'It is not enough that we build products that function, that are understandable and usable, we also need to build products that bring joy and excitement, pleasure and fun, and, yes, beauty to people’s lives.',
    attribution: 'Don Norman',
  }),
  new QuoteObject({
    quote: 'Design is not just what it looks like and feels like. Design is how it works.',
    attribution: 'Steve Jobs',
  }),
  new QuoteObject({
    quote: 'If you think good design is expensive, you should look at the cost of bad design.',
    attribution: 'Ralf Speth',
  }),
  new QuoteObject({
    quote: 'You don’t think your way to creative work. You work your way to creative thinking.',
    attribution: 'George Nelson',
  }),
  new QuoteObject({
    quote: 'If you do it right, it will last forever.',
    attribution: 'Massimo Vignelli',
  }),
  new QuoteObject({
    quote: 'I have several times made a poor choice by avoiding a necessary confrontation.',
    attribution: 'John Cleese',
  }),
  new QuoteObject({
    quote: 'Everything is designed. Few things are designed well.',
    attribution: 'Brian Reed',
  }),
  new QuoteObject({
    quote: 'If I had asked people what they wanted, they would have said faster horses.',
    attribution: 'Henry Ford',
  }),
  new QuoteObject({
    quote: 'Design is a solution to a problem. Art is a question to a problem.',
    attribution: 'John Maeda',
  }),
  new QuoteObject({
    quote: 'There is no design without discipline. There is no discipline without intelligence.',
    attribution: 'Massimo Vignelli',
  }),
  new QuoteObject({
    quote: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.',
    attribution: 'Antoine de Saint-Exupery',
  }),
  new QuoteObject({
    quote: 'There is no such thing as a boring project. There are only boring executions.',
    attribution: 'Irene Etzkorn',
  }),
  new QuoteObject({
    quote: 'Simplicity is about subtracting the obvious and adding the meaningful.',
    attribution: 'John Maeda',
  }),
  new QuoteObject({
    quote: 'Sometimes when you innovate, you make mistakes. It is best to admit them quickly, and get on with improving your other innovations.',
    attribution: 'Steve Jobs',
  }),
  new QuoteObject({
    quote: 'Simplicity is not the goal. It is the by-product of a good idea and modest expectations.',
    attribution: 'Paul Rand',
  }),
  new QuoteObject({
    quote: 'Design is more important than technology in most consumer applications.',
    attribution: 'Dave McClure',
  }),
  new QuoteObject({
    quote: 'Only those who attempt the absurd will achieve the impossible.',
    attribution: 'M.C. Escher',
  }),
  new QuoteObject({
    quote: 'The details are not the details. They make the design.',
    attribution: 'Charles Eames',
  }),
  new QuoteObject({
    quote: 'Great design is a multi-layered relationship between human life and its environment.',
    attribution: 'Naoto Fukasawa',
  }),
  new QuoteObject({
    quote: 'Everything should be made as simple as possible, but not simpler.',
    attribution: 'Albert Einstein',
  }),
  new QuoteObject({
    quote: 'Creativity is only as obscure as your reference.',
    attribution: 'Anonymous',
  }),
  new QuoteObject({
    quote: 'Get in over your head as often and as joyfully as possible.',
    attribution: 'Alexander Isley',
  }),
  new QuoteObject({
    quote: 'Any intelligent fool can make things bigger and more complex. It takes a touch of genius — and a lot of courage — to move in the opposite direction.',
    attribution: 'E. F. Schumacher',
  }),
  new QuoteObject({
    quote: 'No. I don’t think the Empire had Wookiees in mind when they designed it, Chewie.',
    attribution: 'Han Solo',
  }),
  new QuoteObject({
    quote: 'Any product that needs a manual to work is broken.',
    attribution: 'Elon Musk ',
  }),
  new QuoteObject({
    quote: 'Artists can have greater access to reality; they can see patterns and details and connections that other people, distracted by the blur of life, might miss. Just sharing that truth can be a very powerful thing.',
    attribution: 'Jay-Z',
  }),
  new QuoteObject({
    quote: 'A designer is an emerging synthesis of artist, inventor, mechanic, objective economist, and evolutionary strategist.',
    attribution: 'Buckminster Fuller',
  }),
  new QuoteObject({
    quote: 'A user interface is like a joke. If you have to explain it, it’s not that good.',
    attribution: 'Martin LeBlanc, Iconfinder',
  }),
  new QuoteObject({
    quote: 'Design isn’t crafting a beautiful textured button with breathtaking animation. It’s figuring out if there’s a way to get rid of the button altogether.',
    attribution: 'Edward Tufte',
  }),
  new QuoteObject({
    quote: 'Innovators have to be open. <br /> They have to be able to imagine things that others cannot and be willing to challenge their own preconceptions.',
    attribution: 'Malcolm Gladwell',
  }),
  new QuoteObject({
    quote: 'I would be happy to learn just half the stuff I already thought I learned.',
    attribution: 'Unknown',
  }),
  new QuoteObject({
    quote: 'The work you do while you procrastinate is probably the work you should be doing for the rest of your life.',
    attribution: 'Jessica Hische',
  }),
  new QuoteObject({
    quote: 'As we decrease uncertainty, we give ourselves permission to increase fidelity.',
    attribution: 'Jonathan Irwin',
  }),
  new QuoteObject({
    quote: 'Curiosity about life in all its aspects, I think, is still the secret of great creative people.',
    attribution: 'Leo Burnett',
  }),
  new QuoteObject({ quote: 'Less is more work.', attribution: 'Patric McCue' }),
  new QuoteObject({
    quote: 'Design is an opportunity to continue telling the story, not just to sum everything up.',
    attribution: 'Tate Linden',
  }),
  new QuoteObject({
    quote: 'The most profound technologies are those that disappear. They weave themselves into the fabric of everyday life until they are indistinguishable from it.',
    attribution: 'Mark Weiser',
  }),
  new QuoteObject({
    quote: 'Here is one of the few effective keys to the design problem: the ability of the designer to recognize as many of the constraints as possible; their willingness and enthusiasm for working within these constraints.',
    attribution: 'Charles Eames',
  }),
  new QuoteObject({
    quote: 'Good design is obvious. Great design is transparent.',
    attribution: 'Joe Sparano',
  }),
  new QuoteObject({
    quote: 'When you believe a thing, believe it all the way, implicitly and unquestionably.',
    attribution: 'Walt Disney',
  }),
  new QuoteObject({
    quote: 'Content precedes design. Design in the absence of content is not design, it’s decoration.',
    attribution: 'Jeffrey Zeldman',
  }),
  new QuoteObject({
    quote: 'The soul never thinks without an image.',
    attribution: 'Aristotle',
  }),
  new QuoteObject({
    quote: 'Do good work for good people.',
    attribution: 'Aaron Draplin',
  }),
  new QuoteObject({
    quote: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    attribution: 'Aristotle',
  }),
  new QuoteObject({
    quote: 'Design creates culture. Culture shapes values. Values determine the future.',
    attribution: 'Robert L. Peters',
  }),
  new QuoteObject({
    quote: 'If you’re not prepared to be wrong, you’ll never come up with anything original.',
    attribution: 'Sir Ken Robinson',
  }),
  new QuoteObject({
    quote: 'The best ideas come as jokes. Make your thinking as funny as possible.',
    attribution: 'David Ogilvy',
  }),
  new QuoteObject({
    quote: 'Everyone designs who devises courses of action aimed at changing existing situations into preferred ones.',
    attribution: 'Herbert Simon',
  }),
  new QuoteObject({
    quote: 'Learning is any chance in a system that produces more or less permanent change in its capacity for adapting to its environment.',
    attribution: 'Herbert Simon',
  }),
  new QuoteObject({
    quote: 'Engineering, medicine, business, architecture and painting are concerned not with the necessary but with the continent - not with how things are but with how they might be - in short, with design.',
    attribution: 'Herbert Simon',
  }),
  new QuoteObject({
    quote: 'Without change there is no innovation, creativity, or incentive for improvement. Those who initiate change will have a better opportunity to manage the change that is inevitable.',
    attribution: 'William Pollard',
  }),
  new QuoteObject({
    quote: 'Art, freedom and creativity will change society faster than politics.',
    attribution: 'Victor Pinchuk',
  }),
  new QuoteObject({
    quote: 'We have to continually be jumping off cliffs and developing our wings on the way down.',
    attribution: 'Kurt Vonnegut',
  }),
  new QuoteObject({
    quote: 'Others have seen what is and asked why. I have seen what could be and asked why not.',
    attribution: 'Pablo Picasso',
  }),
  new QuoteObject({
    quote: 'Imagination is everything. It is the preview of life’s coming attractions.',
    attribution: ' Albert Einstein',
  }),
  new QuoteObject({
    quote: 'Learn the rules like a pro, so you can break them like an artist.',
    attribution: 'Pablo Picasso',
  }),
  new QuoteObject({
    quote: 'You can never solve a problem on the level on which it was created.',
    attribution: 'Albert Einstein',
  }),
  new QuoteObject({
    quote: 'There is a vitality, a life force, an energy, a quickening that is translated through you into action, and because there is only one of you in all time, this expression is unique. And if you block it, it will never exist through any other medium and will be lost.',
    attribution: 'Martha Graham',
  }),
  new QuoteObject({
    quote: 'A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.',
    attribution: 'Douglas Adams',
  }),
  new QuoteObject({
    quote: 'Design cannot rescue failed content.',
    attribution: 'Edward R. Tufte',
  }),
  new QuoteObject({
    quote: 'So that is the design process or the creative process. Start with a problem, forget the problem, the problem reveals itself or the solution reveals itself and then you reevaulate it. This is what you are doing all the time.',
    attribution: 'Paul Rand',
  }),
  new QuoteObject({
    quote: 'Real web designers write code. Always have, always will.',
    attribution: 'Jeffrey Zeldman',
  }),
  new QuoteObject({
    quote: 'Sketches are social things. They are lonely outside the company of other sketches and related reference material. They are lonely if they are discarded as soon as they are done. And they definitely are happiest when everyone in the studio working on the project has spent time with them.',
    attribution: 'Bill Buxton',
  }),
  new QuoteObject({
    quote: 'Designing a product is designing a relationship.',
    attribution: 'Steve Rogers',
  }),
  new QuoteObject({
    quote: 'The dumbest mistake is viewing design as something you do at the end of the process to ‘tidy up’ the mess, as opposed to understanding it’s a ‘day one’ issue and part of everything.',
    attribution: 'Tom Peterson',
  }),
  new QuoteObject({
    quote: 'Thinking about design is hard, but not thinking about it can be disastrous.',
    attribution: 'Ralph Caplan',
  }),
  new QuoteObject({
    quote: 'As a designer, you have to think in time and see things in sequence. You have to see information as a narrative form.',
    attribution: 'Paul Mijksenaar',
  }),
  new QuoteObject({
    quote: 'Small, noncomparative, highly labeled data sets usually belong in tables.',
    attribution: 'Edward R. Tufte',
  }),
  new QuoteObject({
    quote: 'If a picture is worth a thousand words, a prototype is worth a thousand meetings',
    attribution: 'IDEO.org',
  }),
  new QuoteObject({
    quote: 'Let’s agree no engineer would design a door to be slammed in order to close properly.',
    attribution: 'Roscoe Webster',
  }),
  new QuoteObject({
    quote: 'A design can excel at one challenge only by compromising at others.',
    attribution: 'Steven Pinker',
  }),
  new QuoteObject({
    quote: 'There’s a fine line between minimalism and not trying very hard.',
    attribution: 'Tom Pappalardo',
  }),
  new QuoteObject({
    quote: 'You cannot defend your design without knowing what you’re designing for.',
    attribution: 'I.M.Pei',
  }),
  new QuoteObject({
    quote: 'Design is a human ritual of understanding.',
    attribution: 'Maggie Macnab',
  }),
  new QuoteObject({
    quote: 'The user experience design of a product essentially lies between the intentions of the product and the characteristics of your user.',
    attribution: 'David Kadavy',
  }),
  new QuoteObject({
    quote: 'The truth is out there.',
    attribution: 'The X-Files',
  }),
  new QuoteObject({
    quote: 'Indifference towards people and the reality in which they live is actually the one and only cardinal sin in design.',
    attribution: 'Dieter Rams',
  }),
  new QuoteObject({
    quote: 'Research conquers doubt. It aligns everyone around the incontestable. Research is the key to clarity—in startups, enterprises, and life itself.',
    attribution: 'Laura Busche',
  }),
  new QuoteObject({
    quote: 'Design is one of the few disciplines that is a science as well as an art. Effective, meaningful design requires intellectual, rational rigor along with the ability to elicit emotions and beliefs. ',
    attribution: 'Debbie Millman',
  }),
  new QuoteObject({
    quote: 'Products shouldn’t just work well, they must unfold well.',
    attribution: 'Laura Busche',
  }),
];
