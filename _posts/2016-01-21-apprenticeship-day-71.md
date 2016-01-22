---
layout: posts
title: Rack
---

### 8th Light Apprenticeship - Day 71

Rack provides the standard interface for interacting with HTTP and connecting to web servers. There is the code that accepts a request and code that serves the response. Rack is the interface between the two. 

<!--break--> 

Rack applications are objects (not classes) that respond to the method `call` (which takes a rack environment as a parameter) and return a triplet containing `status code` (HTTP response code), `headers` (a hash) and `body` (an enumberable). This makes up the client.

Rack also provides a `Server` implementation out the box.

The env parameter used in the call method, is a hash that meets the rack spec and defines incoming information. (Outgoing information is the triplet form). Env gives you access to incoming headers, host information and the query string. The env is passed to the application where the app can interact with it.

You can start a rack app by creating a file `config.ru` containing the following:
     
     run Proc.new { |env| ['200', {'Content-Type' => 'text/html'}, ["Hello World"]] }

Then adding a Gemfile with `gem 'rack'`, bundle install then running the command 

      bundle exec rackup config.ru 
      
This will start up a rack server, and list the port that the server has been started on. In your browser you can then navigate to `localhost:<port>' to see the "Hello World" message.

To interact with the server, we can change the config.ru to contain:

     run Proc.new { |env| ['200', {'Content-Type' => 'text/html'}, ["Hello World #{env['QUERY_STRING']}"]] }
     
Restart the server, navigate to localhost:port?message=foo, and the browser will now show `Hello World foo`, as a GET request has been formed and sent to the client.

The whole content of the Rack env can be displayed by modifying the config.ru to show the following:  
          
          run Proc.new { |env| ['200', {'Content-Type' => 'text/html'}, [env.inspect]] }

This will show a hash, something like the following output:

      { 
       "GATEWAY_INTERFACE"=>"CGI/1.1", 
       "PATH_INFO"=>"/", 
       "QUERY_STRING"=>"", 
       "REMOTE_ADDR"=>"::1", 
       "REMOTE_HOST"=>"localhost", 
       "REQUEST_METHOD"=>"GET", 
       "REQUEST_URI"=>"http://localhost:9292/", 
       "SCRIPT_NAME"=>"", "SERVER_NAME"=>"localhost", 
       "SERVER_PORT"=>"9292", 
       "SERVER_PROTOCOL"=>"HTTP/1.1", 
       "SERVER_SOFTWARE"=>"WEBrick/1.3.1 (Ruby/2.2.1/2015-02-26)", 
       "HTTP_HOST"=>"localhost:9292", 
       "HTTP_CONNECTION"=>"keep-alive", 
       "HTTP_ACCEPT"=>"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",      
       "HTTP_UPGRADE_INSECURE_REQUESTS"=>"1", 
       "HTTP_USER_AGENT"=>"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36", 
       "HTTP_ACCEPT_ENCODING"=>"gzip, deflate, sdch", 
       "HTTP_ACCEPT_LANGUAGE"=>"en-US,en;q=0.8", 
       "HTTP_COOKIE"=>"textwrapon=false; wysiwyg=textarea", "rack.version"=>[1, 3], "rack.input"=>#>, "rack.errors"=>#>>, "rack.multithread"=>true, "rack.multiprocess"=>false, "rack.run_once"=>false, "rack.url_scheme"=>"http", "rack.hijack?"=>true, "rack.hijack"=>#, "rack.hijack_io"=>nil, 
       "HTTP_VERSION"=>"HTTP/1.1", 
       "REQUEST_PATH"=>"/", "rack.tempfiles"=>[]
       }


Today was spent experimenting with Rack in order to establish how to run my tic tac toe as a web application. I got to the point where I could display 9 links on a webpage. Each link represented an empty cell, and when one was clicked, it would add `?turn-taken=1` to the url - with the hope the server would receive the GET request, and so could respond in the appropriate manner.

I created one class that displayed the index.html home page with an empty grid, and another that I was a placeholder for the game logic (updating the board with the index chosen checking for a win). I was trying to chain them together in various ways but couldn't seem to get a flow going.

Because I'm well into my iteration now, I checked in with my mentor as I wanted to check if I was going along the right lines. Never having done a web app before, I wasn't sure if I had selected the correct approach (there are so many different articles on line that use all sorts of different gems to create web apps). Seems I had the right idea, but I was missing a root that can be used to route the requests to the correct listeners. 

As this will be my first web app, my mentor suggested I switch to sinatra and erb, which has an easier interface to work with, then switch to using Rack in another iteration. I got a much better idea of what I am trying to achieve today, so tomorrow will need to spike again using sinatra, and establish if the real task of porting my tic tac toe to the web can be done by Tuesday. It seems ambitious at the moment, as it is Friday tomorrow, but I wont know until I start. I think I will timebox another spike for 2 hours in the morning, at which point I hope the path will be clearer, and I can move onto the actual task.


[Rack from the beginning](http://hawkins.io/2012/07/rack_from_the_beginning/)

[Static Sites Ruby](https://devcenter.heroku.com/articles/static-sites-ruby)



[sinatra](http://www.sinatrarb.com/documentation.html)

[erb](https://github.com/rtomayko/tilt)