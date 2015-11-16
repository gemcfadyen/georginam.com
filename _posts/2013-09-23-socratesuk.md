---
layout: posts
title: The First SoCraTes Uk
---
### Socrates uk

I made the brave decision to go the first Socrates UK conference last weekend. Brave because I knew there would be nothing but men there, and also brave because I knew it would be full of people who knew more than me.

<!--break-->

The _“un-conference”_ was held in the Cotswolds on the Farncome estate – a huge area of land with beautiful views, made nicer by the fact the sun decided to shine. Starting on Thursday evening with everyone introducing themselves followed by a flash of lightening talks. Some interesting topics included 
how to control people at meetings using hand-signals (something that Socrates adopted for the rest of the conference)
what happens when a team spends a whole year doing continuous improvement rather than business delivery
the decline of the IDE (I don't think so)
how often should you commit.

The first evening was closed after a _fish-bowl session_ – something I had not observed before. A panel in the centre of the room discuss a topic “What are the values of Software Craftsmanship”. To make a comment or point, you must be in one of the chairs making up the panel. As people join the panel, those already there have to leave. The end of the discussion proved that the values and meaning of software craftsmanship means different things to different people – some feel they need to teach the practises, others want to learn the practises. The theme of personal responsibility kept re-occurring – we must be accountable for what we do and work in the most efficient and comfortable way to produce high quality software.

Friday morning the hard work started – 7am meet for a run. 10 budding software craftsman runners showed up only to be faced by a huge hill a few minutes in... a few of us had to resort to walking, but just like in software we did not give up and everyone did two laps to work up an appetite for breakfast. 

The first session I attended was a _hands-on architect session_ – working in groups of 5 we had to come up with a high level design for a sandwich shop whist thinking about managing the risks, reducing costs and designing a strategy without focussing on particular technologies.
 Next up was “Great Code vs Clean Code”. Inspired by Randall Hyde, Great code was defined by high performant  - code which often has to be written in a certain way to behave optimally. Debate was had as to whether such code could be clean, as its often unintuitive written. Conclusions were drawn quoting Uncle Bob's Clean Code, as we must strive to write as clean code as possible within the boundary which we have.

I decided to _give back to the conference by hosting a session_ - _“Leave your IDE at home”_ - an hour kata using cyber-dojo.com. 4 or 5 pairs came along and the round up discussion where we analysed the red/green refactoring cycles of the different groups was enjoyed by all – so much so that the session was repeated the next day.

People were on hand to pair, and eager for a [pair-bear](http://blog.adrianbolboaca.ro/2012/12/teddy-bear-pair-programming/) I invited Alexandru Bolboaca to pair on my current kata – [Noughts And Crosses.](https://github.com/gemcfadyen/NoughtsAndCrosses)
The session was very useful with Alex helping me spot patterns in my code which could be generalised. All too soon the first day was over, dinner was served and most craftsmen ended up in the bar.

This was the first time I had _coded late in to a Friday night with drinks in hand!_ Whilst I continued to work on the noughts and crosses game, a fellow craftsman [Carlos Ble](https://www.twitter.com/carlosble) from the canary Island asked if he could pair. Always keen to get different feedback I agreed, and together we refactored some more of the code resulting in a much more readable set of methods. Alas as midnight hit, people started to trickle back to their rooms ready for a rest...

Saturday I attended a _DDD hands on_ session – working in groups to implement a shipping service from a domain perspective. Pairing with a rather arrogant 'craftsman' was not so enjoyable, especially in contrast to the productive pairing received the day before. Never the less I took in what I could then headed to a reverse refactoring kata – oh what fun!! Starting with a simple 'Hello World' program the aim was to make it as complicated as possible!  https://github.com/gemcfadyen/socrates_refuctoring In the space of an hour we managed to use automatic refactors to introduce a Builder, reflection, inheritance, terrible variable names and generally over engineer the solution as much as possible. The product of which I am going to use at work to demonstrate over engineering, and get my team members to refactor it using their IDE back to something more sensible.

Saturday night drew in and rather than coding I took part in a game called WareWolf – one round in which I won. A game where you have to convince people of your innocence whilst 'killing' villagers in a town. Around midnight I decided to retire, the conference over bar a countryside walk on the Sunday morning.

In summary, I felt very welcome at Socrates UK and pairing with talented developers was very productive, getting different opinions and suggestions. Many a tips were made, and interested articles listed. Going forwards at work I've setup weekly sessions for my team members to mentor each other on their pet projects so that we can continue to reap the benefits of collaborative input.

Useful links:

- [Short committing cycles:](http://blog.activelylazy.co.uk/2013/02/27/short-commit-cycles/)

- [TDD Where did it all go wrong:](http://vimeo.com/68375232) 

- [Command line one liners:](https://github.com/arturoherrero/tkn/blob/master/examples/command-line-one-liners.md)

- [Refucturing](http://sc2010subs.wordpress.com/2010/08/07/refuctoring-master-class-jason-gorman-keith-bank-account/)
