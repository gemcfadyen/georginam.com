---
layout: posts
title: Beaten by the Board
---
### 8th Light Apprenticeship - Bonus day

A bonus entry, seeing as so much of my time has been invested to try to eliminate the duplication when validating input and reprompting from the command line with custom messages.

There are 3 types of validation in my tic tac toe:
1) Validate the next move provided by the human user [must be a number, must be within grid boundary, must be a vacant position]
2) Validate the re-play option [must be a value in the set Y, N]
3) Validate the users choice of game [must be HumanVsHuman]

Although the validation rules are slightly different, I under estimated how much grief this would cause. I've documented the avenues I went down below. 


<!--break-->

### Approach 1: Strategy Pattern to treat all validation equally
Introduce an interface `InputValidator`. Implement each form of validation as a separate strategy.
Advantages: Each validation [must be a number, must be within grid boundary, must be a vacant position] can be independently tested, and treated the same by client code as the interface is shared. Where multi-validation is required, put all the necessary validators in an collection and iterate through using one loop in order.

Disadvantages: Some validators need the Board, some don't. In order for all validators to be treated the same, there are two options:
1) Pass the board into the isValid() method, and some validators ignore it (dislike).
2) Create the validators at the time they are required, passing the board into their constructor. 
Option (2) means the validators can not be injected or stubbed out in test. This is unfavourable because it feels like a violation of OCP (you would need to make code change to add a new validator to your collection, rather than just plugging a new one in via the constructor).
As options go, I feel (2) is the best of the bad bunch. At least the validators that do not require the board, have no awareness of it.

### Approach 2: Treating validation with the board separately

Am I trying to generalise two things that are not the same? Is validation requiring the board different from the numeric validation and thus should be separate? Hmmm, the interfaces can be thought of as different. Take the numeric validation. It does not need a board object, and is performing validation at a less granular level. However, concerning a users move, its only valid if all three sets of validation pass. If a player enters a valid number, and the program goes onto validate that number with the grid, and it fails, the numeric validation needs to happen again on their next input. 

Getting this order of precedence working on two different sets of validators ends up with very complex looping (whispers: which I couldn't actually get working). You can see an extract of the non-working complexity below. Note that one of the methods hide another loop.


        ValidationResult numberValidationResult = numericValidator.isValid(input);
        if(numberValidationResult.isValid()) {
            numberValidationResult = validationInputWithBoard(compoundValidator, input, currentBoard);
        }
        while (!numberValidationResult.isValid()) {
            clear();
            print(currentBoard);
            display(numberValidationResult.reason());
            numberValidationResult = numericValidator.isValid(input());
            if(numberValidationResult.isValid()) {
                numberValidationResult = validationInputWithBoard(compoundValidator, input, currentBoard);
            }
        }

        return numberValidationResult.userInput();
  
### Let's fall back to the Strategy Pattern approach

Here are the issues I faced.

### Issue 1
Validation with the board requires zero based index. User enters one based index.

To be user friendly, the grid displays starting at 1. Under the hood, the data structure is modelled as an array, which is zero indexed based. 

The validators that need the board, need to work with zero index based indices. This means the input has to either be decremented by one before being passed to the validator (but then the custom message which prints out the reason for your input being invalid would have to increment again to mirror what the user had entered). Or it can be decremented inside the validator. Or the validation in the board can work with one based indices, but that would be inconsistent with the rest of the Board class.

Regardless, if you want a custom rejection message which echo's the value entered by the user, you must do a conversion, duplicating the zero indexed logic. I can not see a way around this.

### Issue 2
When validation fails, different behaviour from the prompt is required

One loop does not suit all when it comes to validating. Depending on which part of the game is reprompting determines the action. Some reprompting requires the board to be printed, others just want to print a message. No board involved. The same loop therefore could not be called for each reprompt scenario.

### Solution 1
Doesn't java 8 have functions... why not pass them in to deal with the differences?

      while (!validationResult.isValid()) {
            beforeValidationMessage.apply(validationResult);
            display(validationResult.reason());
            validationResult = compoundValidator.isValid(input());
        }


Using one loop as essentially a template method with a place holder for a function `beforeValidationMessage.apply(validationResult)` worked, eventually, after I spent time changing all my reprompt messages to adhere to a different format. 

This allowed me to generalise the three types of validation down to two. Hurrah! 
Once again, it's the board that causes the problem causing one of the loops to stay.

### Summary

After reworking the reprompt messages and sticking with the strategy pattern I managed to get two of the reprompt loops looking the same, so introduced a function for the differences. 

The loop which deals with validating a user's move requires the board to re-display it each time, so does not fit into the generalisation. I think the reprompt needs to display the board, so it is not an item to cut out.

3 down to 2 is a start. 

Duplication of translating the zero based indexing again is a necessity which I can't see a way around. 
To try to improve this situation, the decrementing one can be extracted out into a decrementor collaborator, and used in each place it is required, so at least the code which actually does the minus one is in a single place.

`Integer.valueOf(input) - 1)`

I've explored all the avenues I can think of for the remaining duplication, so will mark the story as complete. I'm looking forward to getting the code reviewed to see if there is a simpler way! 