---
layout: posts
title: Package Refactor
---

### 8th Light Apprenticeship - Day 58

The last few weeks saw a lot of change in tic tac toe. The gui was introduced, the rules from the game were extracted so that they could be shared between the command line game and the gui game, plus a few different patterns had been applied. As such, the packages I originally had in place had become polluted.

<!--break--> 

Having not looked at the tic tac toe program over Xmas, as I glanced down the list of files this morning with fresh perspective, I could see the odd spy in the production packages. I also spotted the game rules in the gui package. I felt today, the first working day of the new year, was a good time to refactor this.

I started by creating three new packages - commandlineapp, game and guiapp. I simply went through every class in the project and allocated it to the new package I felt most appropriate. I did the same with the test classes.

At this point I made sure all the tests still ran. They did, so onto the next check.

I wanted the game class to be standalone. I knew that both the commandline package and the gui app package would need to depend on the game package, but I didn't want any cycles, therefore it was important to break all the dependencies going in different directions.

Once the dependencies were amended (which mainly involved creating some 'agnostic' spy's and stubs rather than those tied to the commandline players or gui players), I took another look through, ensuring the tests were all working.  

Each package had a long list of classes. I felt it was not clear which classes were related, or which belonged to the same family. For example, in the commandlineapp, there is input validation to check that a number, within a certain range has been entered. Several classes make up this validation, and as such, I felt it was clearer if this was grouped together. To make this apparent, I created a  sub package inside commandlineapp to keep this family of classes together. This way, should there be a change of interface, there is one precise location you would need to go and update.

I considered each top level package like this, grouping 'related' classes together using sub packages. Under the game package, I introduced board, rules and player packages. I felt this gave a good representation of the domain. I.e.: By looking in the top level game package you get a feel for the terminology and components used throughout the whole system.

In the past I have not put as much thought into separating packages, usually just grouping classes from the same family together as the system evolved. By introducing the sub packages I felt it would be easier for a new team member to navigate and understand the domain, rather than having a long list of classes to wade through and associate in their head.

