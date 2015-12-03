---
layout: posts
title: Rock Paper Scissors
---
### 8th Light Apprenticeship - Day 43

I'm happy to say that my gui testing idea worked a treat. My task was to spike it in order to provide an accurate estimate. However, once I had realised how to unit test an end to end flow I just put the actual test in. It is great when things work out.

<!--break--> 

The next priority story is Rock Paper Scissors. I wanted to take small iterative steps, so started using [TDD as if you mean it](http://coderetreat.org/facilitating/activities/tdd-as-if-you-meant-it). Rather than creating a production class, I just implemented the method under test, in the actual test class itself.

I started with the business rules, so that two gestures could be evaluated, and the strongest gesture returned. For example, if you evaluate the gesture Rock and Paper, Paper is the stronger gesture because paper wraps rock.

I ended up with a method that looked something like this:

     private Gesture play(Gesture gesture1, Gesture gesture2) {
        if (gesture1.equals(Gesture.ROCK) &&
                !gesture2.equals(Gesture.PAPER)) {
            return Gesture.ROCK;
        } else if (gesture2.equals(Gesture.ROCK) && !gesture1.equals(Gesture.PAPER)) {
            return Gesture.ROCK;
        } else if (gesture1.equals(Gesture.PAPER) && gesture2.equals(Gesture.ROCK)) {
            return Gesture.PAPER;
        }

        return Gesture.SCISSORS;
    }

Whilst this worked, I felt it didn't read very clearly. I imagined a new developer joining the 'Rock Paper Scissors' team and having to draw out boxes and arrows whilst debugging this method.

I looked to see if one gesture was stronger than them all, in which case they could have each been assigned a ranking. However there is a circular relationship between them, as Rock beats Scissors, Scissors beats Paper and Paper beats Rock.

I still liked the idea of trying to move the 'strength' logic into the Gesture enum itself. I started a brand new test for the Gesture enum and repeated all the test cases again. Now each Gesture has an Id assigned (Rock = 1, Paper = 2, Scissors = 3), and has exactly one other Gesture which it can beat. This time the solution came out simpler. To make it even clearer, I will give context to the numbers in constants.

    public boolean strongerThan(Gesture gesture) {
        if (gesture == PAPER && id == 1) {
            return false;
        }
        if (gesture == SCISSORS && id == 2) {
            return false;
        }

        if (gesture == ROCK && id == 3) {
            return false;
        }

        return true;
    }

The focus today was keeping things simple. The game class asks for user input from the two people playing the game. Usually I would have created a Player class and had a prompt inside which asks for the users input and reads what they have entered. However for the purposes of this exercise I didn't go that far. The game simply prompts for two inputs from the command line. There is no Player object, as I didn't really feel it would give that much to the overall look and feel of the code.

Having created a new repository for this work, I had forgotten to make a branch, therefore at the end of the day, I pushed my work, straight to master. Whilst this was not a problem, as I am the sole developer on this project, and it is not something that will be shipped to any client, I wanted to undo my mistake so that I could raise a pull request when appropriate.

It turns out that a branch is just a pointer to a commit. You can therefore create a new branch which points to any commit that has been done in the past. You can even delete the master branch you have, and recreate it pointing to a new commit. Something I had never thought you could do, or even thought about doing before. 
*Disclaimer:* This is all very dangerous and not something that should be done on a proper project, as the history of your master branch can be completely changed. 

As an extension to the project I can implement extra rules for [Spock and Lizard](https://en.wikipedia.org/wiki/Rock-paper-scissors#Additional_weapons). I'll come back to that towards the end of the iteration if there is time.



