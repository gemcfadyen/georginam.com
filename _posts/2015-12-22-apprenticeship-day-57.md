---
layout: posts
title: Decorating
---

### 8th Light Apprenticeship - Day 57

The decorator pattern allows behaviour to be added to an object without affecting the behaviour of other objects in the same class. Behaviour can be added and removed at runtime by attaching and removing decorators, which are wrappers of the original class, providing some extra functionality around the original method call.

This pattern promotes single responsibility, with each decorator being responsible for one enhancement. Similarly, the open close principle is adhered to, as you can create a new decorator class without making any 
underlying changes to the original class which it is wrapping.

<!--break--> 

My task was to rework my command prompt using the decorator pattern and removing the strategy pattern I had for formatting. This sounded straightforward, however when I started, I realised it didn't seem to be a good fit. 

The formal definition of the decorator pattern states that you do extra functionality before or after delegating to the original method. Originally I thought this would consist of adding the font colour in a decorator then calling the original prompt method. However, because multi statements can be printed out, and each statement can be a different colour, the pattern doesn't fit so easily. 

The prompt in the game does not simply read and write single lines of input/output. The prompt is more sophisticated, and passes the users input to the validators, and if the input is deemed invalid, the prompt knows to reprompt. Reprompting stops only when a valid input is received. This means that there may be several statements printed to the screen from a single method call, and each statement may be of a different colour (informative error messages are printed in a different colour to regular prompts). Some texts are multi colour - for example the board, and the winning statement, which colours the winning symbol in a different colour to enhance the user experience. 

My first attempt at applying the pattern was to extend the CommandPrompt, so that I had access to all the methods. I then overwrote the methods I wanted to decorate, and by exposing the display method (which was formally private) I could flush some ANSCII colours to the output stream prior to calling the original method. This however was not the decorator pattern. I was overriding, not decorating. E.g.:

    @Override
    public void presentGridDimensionsBetween(int lowerBoundary, int upperBoundary) {
        prompt.display(FONT_COLOUR_ANSII_CHARACTERS);
        prompt.presentGridDimensionsBetween(lowerBoundary, upperBoundary);
    }

Because multiple statements and colours are being used, I felt I needed to intercept the original method call, so that the colours could be added in the necessary places. This formed the basis of my second attempt.

Here I did a spike to break all the methods that published text down, to only include single statements that was required for printing. I could then decorate each method correctly. This meant however that client code had to call multiple methods, as often the board is printed as well as a statement to enter a move, or to announce a winner. With this approach, the multi coloured text had to be dropped, as you could only decorate an entire method, not different parts of the text within that method. The read methods however were a much bigger problem.

When incorrect input is read in, the prompt delegates to a validator and reprompts until a good input is provided. E.g.:

    private Function<ValidationResult, Void> functionToRepromptForValidMove(Board currentBoard) {
        return validationResult -> {
            print(currentBoard);
            display(validationResult.reason());
            askUserForTheirMove();
            return null;
        };
    }
    
When the error message is provided, the colour is different, so it is clear why the input was rejected. After that the font colour switches back to the original, and the user is asked again to provide an input.  This could be broken out, which would mean the HumanPlayer would need to call a series of method calls on the prompt. This would allow each call in prompt to be decorated with the appropriate colour. E.g.: writeError could be decorated with the error font colour, whereas askForMove could be decorated with the ordinary font colour. Here is an example of how the HumanPlayer would look after this update:
 
    @Override
    public int chooseNextMoveFrom(Board board) {
        String input = getMove(board);
        ValidationResult validationResult = compoundValidator.isValid(input());

        while (!validationResult.isValid()) {
            prompt.writeError(validationResult.reason());
            input = getMove(board);
        }
        return Integer.valueOf(zeroIndexed(input));
    }

    private String getMove(Board board) {
        prompt.presentsBoard(board);
        prompt.askForMove();
        return prompt.readNextMove(board);
    }
    
Having all this code in the HumanPlayer felt incorrect. Having a series of calls to the prompt feels like feature envy, (A code smell for when a method seems more interested in a class other than the one it is in) and makes the player responsible for the order of the prompt, and reprompting. A similar exercise would need to be done in the controller (to validate replay options, game type selection and dimension selection). The controllers responsibility is to simply coordinate between the game rules and the prompt, so including all the validation logic would bloat the class. 

Similarly, if a new validation type was incorporated, I don't like the thought of the controller and the players needing updating. 

I wanted to keep the human input straightforward, simply to provide input when asked. I thought of alternatives. I could forgo the error colours all together, but then there would simply be no need to decorate at all. Another alternative is to use the error colour for the reprompt when a bad input is entered, but this provides an inconsistent user experience. A final idea is to have each method consist of other abstract methods (template methods), which can be used to set the colours but this seems superfluous, and only adds complexity.

Instead, I re-evaluated the strategy formatter I had originally. There are two instances, pretty and plain. I could see that there was some duplication between the two, but most importantly, the formatters seemed to be at the correct level for decorating, as they dealt only with the text that was meant for display, whereas the prompt deals with more.

I decided therefore to move all the text required for outputting into the formatter. I then created a ColourFormatter, which simply decorated the original texts by adding the ANSII colours to the string and calling the original method. Even the multi colour text works as shown below:

    @Override
    public String winningMessage(String winner) {
        String decoratedWinningSymbol = colour(winner) + FONT_COLOUR_ANSII_CHARACTERS;
        return FONT_COLOUR_ANSII_CHARACTERS + textPresenter.winningMessage(decoratedWinningSymbol);
    }

The board itself provided some stickiness as the border is a different colour to unoccupied indexes and occupied symbols. Instead of polluting the decorator, with a method that doesn't strictly decorate, I left the board formatting separate. This way the board format can change independently, which makes the decorators, and the board formatter adhere to the single responsibility principle.

As a result of the changes, I could simplify the CommandPrompt tests. Previously they were checking what text had been written to the output stream, whereas now I could use a spy and check how many times a certain method had been called. 

Whilst I didn't strictly achieve what the story specified, because of the reasons stated above, I did use the decorator pattern to apply the colours to the text in the formatter, and now have a much great understanding of the pattern.



