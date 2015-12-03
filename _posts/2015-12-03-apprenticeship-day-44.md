---
layout: posts
title: Readability
---
### 8th Light Apprenticeship - Day 43

This morning I took a look over Rock Paper Scissors game I wrote yesterday. I want my code to be really readable and looking at the method that has the crux of the business logic in, I still was not 100% satisfied.

<!--break--> 

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
    
 I wasn't too keen on the magic numbers, so inlined the constants.
 
     public boolean strongerThan(Gesture gesture) {
        if (gesture == PAPER && id == ROCK.id) {
            return false;
        }
        if (gesture == SCISSORS && id == PAPER.id) {
            return false;
        }

        if (gesture == ROCK && id == SCISSORS.id) {
            return false;
        }

        return true;
    }
 
I felt this was a little more readable, but the fact I had repeated `if` blocks made the code look slightly less professional than I wanted. 

I also felt it wasn't clear why one gesture was stronger than the other. I re-read the requirements again. The requirement just used language such as 'Rock beats scissors', and actually didn't give any reasons why. However from my childhood I could remember the reasons. They are:
 
Rock beats scissors because rocks blunt scissors
 
Paper beats rock because paper wraps rock
 
Scissors beats paper because scissors cut paper.
 
I managed to work this into my method through refactoring - namely extracting out methods for each gesture. Now the method shows the context as to why one gesture is strong than another.
    
      public boolean strongerThan(Gesture gesture) {
        return !paperWrapsRock(gesture)
                && !scissorsCutPaper(gesture)
                && !rockBluntsScissors(gesture);
    }


I also think this will lend itself better if Spock and Lizard are introduced. They can have their own methods with their own rules in.