---
layout: posts
title: Boy Scout Rule
---
### 8th Light Apprenticeship - Day 46

A few weeks back, I introduced colours to my command line gui for tic tac toe. The result was a very pretty output, but a rather polluted command prompt class.

<!--break--> 

Whilst testing output was written to the command line, I had to include the colour codes, for example: 
          
             assertThat(writer.toString().contains("[7] is not a valid game type\n\n"
                + FONT_COLOUR_ANSII_CHARACTERS
                + "Enter 1 to play Human vs Human\n"), is(true));

(The `FONT_COLOUR_ANSII_CHARACTERS` had to be included in all the assertions).

With the recent updates that have taken place, to re-organise the Game class to coordinate between the game rules and the command line prompt, I had to make some updates to the CommandPrompt. This time I needed to check the board had been displayed. As different colours are used for the player symbols (X, O), and for the border of the grid, checking the output was getting complicated.

I therefore decided it was time to separate the formatting of colours out into it's own class, which is then injected to the constructor. This adheres to the Dependency injection principle, so for tests, I can inject a 'PlainConsole' whereas for the application I can inject the 'PrettyConsole'.

Back to the gui side, another irritant was the fact that when the game was over, and there was a win or a draw, the status appears, which makes the board 'jump'. This is because all the elements on the panel are centre oriented. When the status box appears below the board, the centre of the panel changes slightly, hence the user see's a shift. I got around this by displaying a text box with no text for the duration of the game. This means at the end of the match, when the status appears, the centre has not changed, therefore the board does not shift.

I also managed to finish off the updates to the command line side of the Game, such that now there is a CommandLineGameController which coordinates activities between the GameRules and the CommandPrompt. This removed the duplication of the game rules that existed on the gui side and the command line side. There are still a few hazy patches in terms of how the design will be effected once there are different Game Types (i.e. currently on the gui side, I'm not calling the player for anything, as all the information is available from the gui itself, so when different player types are introduced I feel I will have to do something special for the Human Player). But for now I think the design is more consistent than it was. I'm going to compile a list of pro's, con's and questions for my review meeting tomorrow.

With Rock Paper Scissors, it dawned on me that the game was only human vs human. This meant that whoever took the second go would always win because they can see what the first player chose. Reading the requirement, it didn't actually mention a computer player, however I introduced one. Now that there were two types of player, computer and human, I needed an object to represent them. The difficulty came in TDD-ing the Random number generator in the computer player, who randomly chooses an id between 1 and 3 to represent ROCK, PAPER and SCISSORS. 

I knew that eventually I wanted to use a `SecureRandom`, but wanted to TDD step by step. I've ended up with a few levels of abstraction, maybe too many. The TDD approach felt a bit contrived, as I knew the SecureRandom needed to do the following:

        Random random = new SecureRandom();
        return random.nextInt(MAX_NUMBER) + MIN_NUMBER;
        
So the wrapper I have, which allows a dummy random generator to be configured for the tests, ended up looking like: 

    @Override
    public int generateToMaxOf(int upperBoundary) {
       return random.generateValue(upperBoundary) + lowerBoundary;
    }
   

...somewhat similar ;-) Now the game is Human vs Computer, so a little more exciting for my mentors to try out tomorrow.

It was definitely a day of high productivity and tying up loose ends. I've left teh campsite cleaner than I found it.