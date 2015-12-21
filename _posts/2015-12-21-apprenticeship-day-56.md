---
layout: posts
title: All players are equal
---

### 8th Light Apprenticeship - Day 56

I've managed to get the gui to treat all players the same. Horrah. I have two versions. I'm not sure which is better. As always, there are pro's and con's of both.

<!--break--> 

The first design sets the move on the gui player in the gui controller. At this point, you know you are a gui human player, as that method is only invoked from the event listeners on the gui. The player is pre-loaded with the move made, and then the game is continued. Going forwards, if a new game type is added, which did not include a gui human option (like unbeatable vs unbeatable), then this code would need refactoring.

The second design builds on top of the first. It uses the observer pattern. At first I thought it was a little untidy, but after a couple of small refactors, I'm growing to like it, even favour it. 

Using the observer pattern removes the cast from the gui controller, and places it in the class which is invoked on button press. You would only execute this code as a human from the gui, so it feels the correct place to preload the human player with their move. Additionally, if in future, a new game type was added, that didn't feature a human option, the code would not break as the event listener would not be invoked. 

Disadvantages are that a method to expose the current player is needed in order to gain access to the player in this place.

I've put both out for review, and either way, by applying the observer pattern I have gained a good understanding of what it does. Reading about patterns is one thing, but actually using them gives me a greater understanding.



