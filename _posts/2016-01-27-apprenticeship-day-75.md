---
layout: posts
title:  Running a Web App Through config.ru
---

### 8th Light Apprenticeship - Day 75

Up until now I have been running my Ruby web app using `ruby tic_tac_toe.rb`. 


<!--break--> 

This file was not a class, it contained the `get` methods, for example, for the opening page:

        require 'sinatra'

        get '/' do
		  @formatted_rows = OneIndexedGridFormatter::new.format(Board.new)
		  @valid_moves = PlayerSymbols::all
 		  erb :landing_page
        end


This is what Sinatra calls a `classic application` which uses the top level DSL. As we have `require 'sinatra'`, Sinatra extends the Object class and the application lives in `Sinatra::Application', which is a subclass of `Sinatra::Base`.

It is possible to just `require 'sinatra/base'` and have a modular application. This way, you need to provide your own subclass. That is, your entry point becomes a class.

         require 'sinatra/base'
         
         class TicTacToeWeb
          
            get '/' do
		      @formatted_rows = OneIndexedGridFormatter::new.format(Board.new)
		      @valid_moves = PlayerSymbols::all
 		      erb :landing_page
            end        
         end

Now if this code is run using `ruby tic_tac_toe.rb`, nothing happens, the application is not started. Instead, if you put `require 'sinatra'`, then a web server will be started, but our route is not found. This is because `require 'sinatra'` will start a server for Sinatra::Application, not for our TicTacToeWeb.

Instead we must use `run`. It is common practise to start web applications through a config.ru file, so inside that, 

       $LOAD_PATH << File.expand_path("../lib", __FILE__)

       require 'tic_tac_toe'

       run TicTacToeWeb


As an aside, when the TicTacToeWeb class was made, I moved it into the lib folder, so it was in the same place as all the other files. This meant the views and public folders could not be found, as by default, Sinatra looks for the views folder relative to the class entry point, which means it was looking in 'lib/views' which didn't exist. To solve this, you can explicitly set the  path of the views folder by doing the following:

         require 'sinatra/base'
         
         class TicTacToeWeb
           
           set :views, File.dirname(__FILE__) + '/../views'
           set :public_folder, File.dirname(__FILE__) + '/../public'
           
            get '/' do
		      @formatted_rows = OneIndexedGridFormatter::new.format(Board.new)
		      @valid_moves = PlayerSymbols::all
 		      erb :landing_page
            end        
         end
         
         
Finally, I had originally copied over the entire contents of my original tic tac toe repository, so that the game logic could be shared with the web application. In fact, in using the load paths, I can add simply add another path (which points to my original tic tac toe game) and share the files without duplicating them. In the future the core game logic will be a separate gem, but for now at least that gets rid of the file duplication.

    $LOAD_PATH << File.expand_path("../lib", __FILE__) << File.expand_path("../../Apprenticeship-RubyTicTacToe/lib", __FILE__) 
  
[How to get started with config.ru ](https://www.digitalocean.com/community/tutorials/how-to-install-and-get-started-with-sinatra-on-your-system-or-vps)