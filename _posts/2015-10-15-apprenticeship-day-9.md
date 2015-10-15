---
layout: posts
title: TDD Grove
---
### 8th Light Apprenticeship - Day 9


The apprentices have been asked to start creating pull requests, so I've raised a few today. A couple of tiny ones started my day, just to remind myself of the PR flow, and I ended my day raising one for my latest story. The simple task of putting a PR together made me look closer at the changes I was about to push, especially in terms of method names, and code layout. 

<!--break-->

Today I focussed on reaching 100% test coverage over my tic tac toe game. The main work lay in using Outside In TDD to drill out the logic of the Game, which I coded from scratch. Before I started I wrote down on paper what I felt the responsibilities of the Game were. I came up with the following:
- Co-ordinating the players
- Report when a game was drawn, thus end the game
- Report when a game was won, thus end the game
- Display the final state of the board

This translated nicely to corresponding acceptance tests. Rather than using a library such as Mockito to test for interactions I created Spy classes for Player (which counted how many times a player had taken a turn) and for Prompt (which kept track of the latest board that had been printed, as well as fake the win and draw message). They were lightweight and easy to create so seemed to work out well. Everything has pros and cons, and I can imagine if you some Fake objects containing different logic paths based on input then they could get complicated. Additionally if they objects you were spying on were in a flux of change, they could be an overhead to maintain. 

Overall I felt I got into the TDD grove today. Whilst I have been using TDD for some time, I had not realised that I often put too much 'production' code in place in one go. Therefore I'm being more mindful of what I'm writing & have been diligently trying to stick to programming just enough code to get the test to pass, then adding a new test case to drill out a bit more.  I also learnt that it's ok to leave an acceptance test red whilst you transition into the 'inner loop' of TDD, in order to drill out the innards of a method introduced in your 'outer loop'. This is where I had been going wrong before. I didn't struggle today in knowing where to begin. My approach of driving the tests from each responsibility, using the test doubles to assert seemed to work well. A pull request has been raised. I hope it will be reviewed by the other apprentices and I can address any comments and merge it tomorrow. 