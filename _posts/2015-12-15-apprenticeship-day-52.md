---
layout: posts
title: Patterns 
---
### 8th Light Apprenticeship - Day 52

When you work on the same code each day, it becomes very familiar. 
When complexity creeps in, it is not always so apparent, because you have seen it morph so slowly that you didn't notice.

<!--break--> 

That said, I have noticed, as I've added the gui functionality, that my tests have started to become more complicated. I now have spies that are beginning to act as stubs.  Sometimes to test one method, I need to call another so that the state is setup inside the object. These felt like code smells, so something I went through in today's IPM.

Together with one of my mentors, we talked about the area's I had concerns about, and came up with a different pattern that would help address each one. 

We hope that by implementing the Observer pattern for the GuiHuman player, I can treat all players the same, thus remove the special case logic in the gui which determines whether the move should be taken from a player or from the button pressed.

We hope that by introducing a Game class which will contain the GameRules and the GameConfiguration that MVC will simplify the controller classes.

Finally, we hope the decorator pattern will simplify the command line console by managing the colours and prettified display.

Talking of pretty displays, I'm using bash and it doesn't show you what git branch you are working on, or provide tab completion to work for branch names. I found some information on line which I've applied to my shell. Now I know what branch I am on at all times and have nice colours in my terminal.

[Tab completion for git](https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh)

[Displaying branch name in git](http://www.jqno.nl/post/2012/04/02/howto-display-the-current-git-branch-in-your-prompt/)