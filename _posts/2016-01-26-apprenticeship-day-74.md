---
layout: posts
title: Template Method 
category: apprenticeship
---

### 8th Light Apprenticeship - Day 74

One of the review points in this week's IPM was to remove the duplication between the code which prompts and validates the user to enter their choice of game (HvH, HvC..) and the code which prompts and validates the users next move.

<!--break--> 

At first I inlined all the method calls that I had, to see the similarities. This made it obvious that the structure of the methods were the same, but each section of that structure were different. 

At first I thought about using yield blocks for the sections that differ, and pass a lambda in for each one. This would result in something like:
     
     def validate_input
        yield # prompt user
        value = reader.get_input

       while(yield) # some validation condition
          yield  # some reprompt
          value = reader.get_input
     end
     yield(value) # some transformation on the valid input
    end 

This looks rather confusing, as each yield has no context, and actually when attempted, it doesn't appear to be possible! 

The [template method](http://gespinosa.org/2015/template-method-pattern-in-ruby/) was briefly mentioned in the IPM, so I did a quick google, and the suggestions I found were to create a class with a method skeleton inside. This method contains other methods, which are defined in the children, so can be customised as per each implementation requires.

This felt more straight forward than the yield idea, as methods can be named and provide context. My template method therefore ended up looking like: 

    def validated_input
      prompt_user
      value = read_input

     while !valid?(value)
      reprompt
      value = read_input
     end
     convert(value)
    end

The methods prompt_user, valid?, reprompt and convert being defined by the child implementations.

I then extended the class containing this method twice, one for validating the move, and one for validating the player option.

Was this an improvement overall? I'm not 100% sure. To validate the move, the latest state of the board is required. Because I need a common interface for the `validated_input` method, I don't want to pass the board in, as not every child implementation would require it. Therefore, the one that does needs to take it on construction. This means I can not inject the validators, but have to new them up within the code. This meant that whilst I added new unit tests for the new classes, I didn't actually remove any tests from the calling class, as I didn't want to risk the calling code being changed without being alerted.

Other disadvantages are that there are now more classes, which can add complexity. Each one also needs the reader and writer, so seem like little command line prompts themselves.

On the flip side, the loop logic is now reused, and the levels of abstraction are consistent. It is clearer that the structure is the same however the contents of each step differs. 

Lets see what feedback I get as to whether I merge it in.

Meanwhile, I found another article on Sinatra which explained the GET request root quite nicely.

### Sinatra and the GET request

Sinatra is a library that can receive web requests and return responses, leaving us with the task of just generating the responses.

Under the hood, Sinatra starts it's own web server (WEBrick) on your computer, which allows browsers to connect. As the server is running on your local machine, the hostname is `localhost` which tells the browser it will need to establish a connection to and from that machine (your machine).

Browsers and servers communicate using HTTP which defines several methods that a request can use. The most common ones are GET, POST, PUT and DELETE.

GET: Used when your browser needs to get some information from the server. Usually when you click a URL, or enter a URL, a get request will be fired to obtain that resource.

POST: Used when the browser needs to add some data to the server, usually through submitting a form with new data.

PUT: Your browser needs to change some existing data on the server, usually because you submitted a form with new data.

DELETE: Your browser needs to delete some data from the server.

	
### Get Request

At the end of the get request, there is a path. This is the resource path. 

      http://localhost:4567/hello
       
It tells the server which resource you want to act on. Sinatra will pull the path off the end of the URL and use it to decide how to respond to this request. As mentioned earlier, the code you write will determine the contents of the response.
 
           
       Every HTTP request includes a request type (the method) and a resource path (the resource being accessed)
       

The type of request 'GET' and the resource path '/hello' is passed to Sinatra, which will invoke the method `get('/hello')` method you have defined. Whatever this value returns and display it in the browser. 