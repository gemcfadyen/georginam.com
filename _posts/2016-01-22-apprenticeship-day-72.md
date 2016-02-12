---
layout: posts
title: Sinatra
category: apprenticeship
---

### 8th Light Apprenticeship - Day 72

After an hour of looking at Sinatra tutorials I could tell it was much easier to get started with than Rack.

<!--break--> 

I found a great [tutorial](http://guides.railsgirls.com/sinatra-app/) which I worked through. It demonstrated post and get requests. I started to think how I could adapt this dummy project into tic tac toe. 

Firstly, I setup a skeleton flow which would load a landing page, then send GET requests to the server side when a link in the grid was clicked. 

For the get request, you can simply provide a method with the root of the request to match. I've been thinking of this as the 'listener' which will jump into action when a cell is clicked. The position the user chose, is passed as a parameter, so for now it is printed out.
    
    get '/move_made' do
      # matches "GET /move_made?position=3"
      turn_taken = params['position']
      p "The player chose position: #{turn_taken}"
    end
    
Once this flow was in place, I decided to spend a little time styling the landing page. Using erb, you can create html files, which are very easy to reference and load in Ruby files. I styled using some simple css....conscious that the look and feel is probably not the most important part of this task, I've laid it to rest.

The next step is to actually get the real game logic integrated into the web app. I've copied the repository for now, and will adapt the file as needed. My optimistic estimate falls on the day of the IPM. There are still some unknowns, will it all hang together, will the game logic have to change a lot, how do I represent the board in the html so that the display can change, why does the app not run through the run.sh like previously... 
   
[Sinatra](http://www.sinatrarb.com/intro.html)

[Escaping html characters](http://www.freeformatter.com/html-escape.html#ad-output)