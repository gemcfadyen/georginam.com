---
layout: posts
title: Ruby Tools
---

### 8th Light Apprenticeship - Day 69

Tuesday is IPM, and today was the longest one yet. It lasted about 3 hours but we covered so much, in so little time. 

<!--break--> 

### Debugging in Ruby

To debug in Ruby, you can you [pry](http://pryrepl.org/). Simply add the gem to the Gemlist and install. This gives you the ability to open up a pry repl. 

Within the code, you find where you want to debug, and add `require 'pry'` . At the point you want to inspect, you put `binding.pry`.  For example

   def choose_move(board)
      binding.pry
      minimax(board, true, board.vacant_indices.size).get_move
   end
   
This binding essentially acts as a break point, so when the code is run, the pry repl kicks in and you have access to the variables in the code which you can query through the repl. It seems that debugging in Ruby is more invasive than java, as you have to add code to the file, whereas in the Java IDE, you just put breakpoints on the side, and the code remains untouched. 

### Profiling in Ruby

As minimax was slow, we worked on different ideas to speed it up. To find out the slowest part,  we profiled the code. We used the in built Ruby [profiler](http://ruby-doc.org/stdlib-2.1.0/libdoc/profiler/rdoc/Profiler__.html). It seemed that the most time was spent in determining all the rows in the grid, and whether those rows are winning rows. 

We tried memoizing the results, which would only calculate the rows, if they had not already been calculated. Another tip was only checking for winning combinations if more than 4 moves had been taken, otherwise there simply wouldn't have been enough turns for a win to exist. Thee was some improvement, but not significant.  We went on to discuss other options like alpha beta pruning, and planting the first move (which is the slowest move). I am going to redo all the steps we did together, to see if the game can be sped up as part of the new iteration. 
  
### Require statements

I had noticed that in my game runner, I had to import all the ruby files that formed part of the game. This is because only my spec files contained 'require' statements, meaning when the classes were loading, they were not pulling in any transitive dependencies they needed. I had wondered about this last week, so now it is confirmed. The rule is 'whoever constructs it, requires it'. Similarly, don't rely on transitive requires. Put all the requires in the class that needs it, even if one of those requires pulls in the dependency transitively.

It is hard for me to quickly pick up good Ruby habits, when I have never really seen any Ruby projects. Over the weekend I watched some videos online of talks by Sandi Metz to try and pick up some tips. I think it will come the more I code and read Ruby. However, I feel there are so many new components and tools which I am trying to understand - Ruby, RSpec, rvm, bundler, pry, profiler, rake, gems, vim, tmux, and with an upcoming web app story, rack and http are being thrown into the mix. I already feel I'm behind in the iteration and it has literally only just begun! I'll keep calm and carry on!
 