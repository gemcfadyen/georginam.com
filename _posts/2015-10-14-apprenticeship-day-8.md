---
layout: posts
title: Prep work
category: apprenticeship
---
### 8th Light Apprenticeship - Day 8

I've been asked to help one of our Craftsman provide Java training to a client. As an apprentice I'm really thrilled to have been asked and trusted to assist. It will of course require preparation, namely familiarising myself with the materials, doing the exercises that we will be teaching, and picking a few parts of the course that I can help to deliver. This meant my iteration had to be slightly re-planned. As in client projects, priorities change all the time, and today I got a taste for context switching.

<!--break-->

This morning I started implementing improvements to the exception handling in my tic tac toe game. It took a bit longer than expected. I realised that I had one line of code in the constructor (a call to super()) for each custom exception that was added. I removed the code and started again. Maybe radical, but I want to be disciplined and stick to the rule of not writing any line of production code without it being covered by a specific test. My co-mentor also asked me to think about the option of checking for the exception at a higher level, and reacting through the 'business logic' there. I pondered on this for a while and did a little spike.

Going this way would mean the Player should check for the custom exception and then re-prompt if one was thrown. I felt that the code didn't look nice (there would be a 'continue' statement in a while loop). 
Applying similar logic to when the prompt writes would be even worse (every time the prompt writes a message, I'd need to check if an exception had been thrown and re-write if necessary). I felt the trade off was not worth it. The scenario to need this logic would be somewhat far fetched, and I doubt I'll ever see happen. It would go something like this: 
(1) Prompt fails to read input (2) Prompt throws IOException which is wrapped and re-thrown as a runtime exception (3) The issue causing the IOException magically fixes itself (4) Re-prompt user for input
Its point 3 that I find hard to imagine ever happening. Once I discussed with my co-mentor he agreed, but was glad I thought about it. It reminded me that it's always good to remember the bigger picture and think about alternatives, even if they end up not being appropriate.  I did create a 'fake' reader and writer for tests, which worked nicely. There is a good article on testing doubles here:

- [Testing Doubles](https://blog.8thlight.com/uncle-bob/2014/05/14/TheLittleMocker.html)

I paired with Jim on the Roman Numerals kata. He showed me a way of drilling out the algorithm in tiny steps through 4 tests. I practised it this evening, and also did a version whereby I introduce the adding logic (2 -> "II") earlier on, to drill out the 'adding' loop sooner. I'll get back to practising it next week, as my presentation has been deferred to allow to prep for the training course. Again, a good article on taking baby steps to reach an algorithm can be read here, the approach is known as the Transformation Priority Premise:

-[Transformation Priority Premise](https://blog.8thlight.com/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html)

The third context of the day was Zagaku. It also had prep work. In pairs we had to make updates to another Craftsman's code, and raise a pull request. Although we were instructed to only spend around one hour on this, we didn't want to leave the tests in a red state, so pushed on for another 30 minutes until we saw green. Along the way I was pleased I could explain some background on maven and git, as well as teach my pair a few new shortcuts. 

Tomorrow I hope to context switch less. My focus will be on completing the test coverage for tic tac toe. This should leave me at least Friday's Wasa and Monday to focus on the training prep. It's only day two of my iteration but already it feels like there is not much left of it!