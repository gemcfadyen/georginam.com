---
layout: posts
title: Top or Bottom
---
### 8th Light Apprenticeship - Day 6

Over the weekend, my gut instinct was still telling me to stick with Outside In, to prevent creating superflous entites or methods in my program. At this stage, it's what I'd most likely to do if faced with a real client program, especially if the entities were not all known up front. What I was pondering was how to introduce a Player and a Prompt through a high level test, when I wasn't using an out the box mocking framework to verify interactions. In short, I realised the experiment I wanted to try was to avoid using Mockito rather than avoid using Outside In TDD.

<!--break-->

So without Mockito, what should I do? Go against my gut and switch to bottom up approach? Or write my own mocks? I decided to go with the latter, to try something new, but not to doubt my instinct. 
I used my high level tests to force me to introduce each collaborator. Each time a new collaborator was introduced, I switched to unit testing that one collaborator and it's methods introduced in the high level test. 

I found using this approach, for classes like Player, which also had a Prompt, parts of the prompt were being padded out without their own specific unit tests. Rather the prompt was also being tested through the Players unit test - A pattern I've seen before when using Chicago style TDD. I did however, in some cases, go back to add specific tests even though in theory the Player tests already covered it.

Did my high level tests look better having not used Mockito? I'm not sure. There was still a number of things to setup, especially around the Prompt and feeding the moves the player wants to take next. At first I wrote a FakePrompt class. Then later I was trying to find a way to force a real Prompt to be created, but couldn't. Upon reflection I realised that I could transform the FakePrompt into the real one by passing the Reader and Writer in through the constructor. This resulted in more code reuse and fewer classes, always a bonus.

In conclusion, I'm debating whether writing your own mocks is re-inventing the wheel when there are mocking framworks out there to help. Whilst I agree that you should not over use mocks, and that, if they involve a lot of setup, they can take away from the focus of the test, when used sparingly in the right places, they can be easy enough to understand. Using Outside In TDD I feel also leads to a fluent API and susinct set of entities.

As an aside, I wasn't sure I'd manage to complete the tic tac toe story today in time for tomorrow's IPM. It was slightly rushed, but I did make it and I'm forward to getting some feedback on it and taking it to the next level.

- [My Solution](https://github.com/gemcfadyen/Apprenticeship-JavaTicTacToe)