---
layout: posts
title:  Routing in Rack
---

### 8th Light Apprenticeship - Day 80


Yesterday I had published my ttt-core gem, but had to add the command line and web app repositories to the same gemset as the core lived in. This was so that all apps were publishing gems and looking for gems in the same folder.

<!--break-->

In fact, if I had used the bundler command to install the gem, I think the gem would have been installed in a common place, and all projects pulling it in would have found it.

    bundle gem ttt-core-2.0.0

As my iteration had finished, and Jim was away, I took a stab at estimating the next few items on my backlog. I found last week I spent almost double the estimated time on the web story, so wanted to provide some more accurate estimates for this week.

The first story was to create another web app, but using Rack rather than Sinatra this time. I had done a spike using Rack a couple of weeks ago, but had not covered the routing or testing. I definitely felt I had a better idea of what I was trying to achieve this time, so added a new task to spike the routing, timboxed to 1 point.

In Sinatra, the routing is provided for you, and the developer simply provides a method with the name of the route in:

      get '/route'
      post'/route'

In rack, you need to inspect the request that comes in, extract the route, then tell the application what to do.  I kept things simple, and used used some if statements:

    route = env['REQUEST_PATH']  # Extract Route From Request
    p "The route is: "   + route.to_s

    req = Rack::Request.new(env)   # Create a request from the env

    if route == "/bob"
      return  Bob.new(@app).call(env)
    else
      return Frank.new(@app).call(env)
    end


Once this spike code was working, I could introduce logic like the following in the new tic tac toe rack app:

     if route == '/'
      show_player_options
    elsif route == '/player_options'
      show_initial_board
    elsif route == '/next_move'
     show_board
    end


Online I also saw examples, of a map being used from route => controller. This way, you setup the map upfront, then can use the route extracted from the request to lookup the relevant controller (all of which need to share a common interface) to invoke. I like this design as it is more polymorphic.

There were also some examples where a map was used for routing, as shown below, but I did't get a chance to try it out:

    def initialize
      @app = Rack::Builder.new do
        # copy contents of your config.ru into this block
        map '/route1' do
          run SampleApp.new
        end

        map '/route2' do
          run SampleApp.new
        end
      end
    end


At the end of the day I had my weekly review, and have to write another web app keeping the design simpler than previously.

In the Sinatra application, there is a lot of pre-processing on the web human players. They are created, sorted (so that the application knows the player at the start of the array is the next player to take a turn), and pre-loaded with the chosen move.  This meant that I didn't have to make any changes to my core game.

I had thought that was a good thing, however Jim pointed out that the complexity had been pushed into the web side of things, in the form of the player processing.  He explained that by changing the core game, to perhaps have a second entry point that the web app could use, to make a specific move on a board, it may eliminate the need for a loadable player.

I had also used a player factory to create the right combination of players. This is seen as a 'Java' way of doing things, and with Ruby, because there is no type safety, it is a bit more risky. There is no compiler to ensure that the interfaces stay in sync, so inheritance should be used sparingly.

I'll take this feedback on board as I write the Rack web app, and hope I can come up with a simpler approach.


### Useful Links:

[Simple Rack Router](https://erikeldridge.wordpress.com/2010/02/21/simple-ruby-rack-router/)

[Rack tutorial](https://isotope11.com/blog/build-your-own-web-framework-with-rack-and-ruby-part-2)

[Unit testing with Rack](http://dev.af83.com/2011/02/22/rails-3-controllers-unit-testing-with-rack.html)

[Using session in a rack app](http://stackoverflow.com/questions/10451392/how-do-i-set-get-session-vars-in-a-rack-app)

[RSpec to test Sinatra](http://tarynsauer.tumblr.com/post/72337538488/using-rspec-to-test-sinatra-controller)
