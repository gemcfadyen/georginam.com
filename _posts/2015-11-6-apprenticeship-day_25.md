---
layout: posts
title: Validation
category: apprenticeship
---
### 8th Light Apprenticeship - Day 25

When a player enters an inappropriate input (for example an alpha character rather than a numeric, or a number outside the valid range etc) my tic tac toe game gives back a lovely informative message, personalised to the violation.

<!--break-->

The effort it has taken to do this has been huge and there are some points which I am not happy with.

First off I injected the different validators into the Prompt. Nice and extendable. You can plug in as many as you like. Next however I came across the validators that required the current state of board (to check if the entered number represents an already occupied cell for example). 

Not all validators need the board, so I didn't feel it made sense to pass it in as a method parameter, as, for some validators it would be left unused. Instead I changed to dynamically create the validators at the point the input needs checking, passing the board into the creation of the validators that require it. This feels less closed to modification, as new validators would mean a code change rather than just plugging an extra one in at construction.

The other dislike is that the user enters a one based index. The board works with zero based indices. This means that if the user enters a valid number, the validators that work with the board need to deduct one before asking the board if the value is within its boundary, or is a cell already occupied. This has increased the number of places that a translation to a zero based index, which doesn't feel right.

I'll keep thinking about it over the weekend. I'm back out to a client on Monday, so taking the design further will be a good discussion point in my next iteration meeting on Tuesday.


