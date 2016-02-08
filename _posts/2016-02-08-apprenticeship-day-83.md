---
layout: posts
title: Ajax
---

### 8th Light Apprenticeship - Day 83


Having completed my Rack web app at the end of last week, I started investigating the use of AJAX. However, in starting up the web app I started to notice exceptions in the logs. 

The exception implied that the cookie headers were missing.

<!--break-->

        NoMethodError: undefined method `[]' for nil:NilClass
        /Users/Georgina/.rvm/gems/ruby-2.2.1/gems/rack-1.6.4/lib/rack/utils.rb:321:in `set_cookie_header!'
        /Users/Georgina/.rvm/gems/ruby-2.2.1/gems/rack-1.6.4/lib/rack/session/abstract/id.rb:363:in `set_cookie'
        /Users/Georgina/.rvm/gems/ruby-2.2.1/gems/rack-1.6.4/lib/rack/session/abstract/id.rb:351:in `commit_session'
        /Users/Georgina/.rvm/gems/ruby-2.2.1/gems/rack-1.6.4/lib/rack/session/abstract/id.rb:226:in `context'


Functionally, the app was not effected, so all the business logic remained in tact, however I did try to get rid of the exception.

Trying to find documentation on Rack is quite difficult, but I found a couple of articles, which showed you how to explicitly set the cookie.

As I use the [`Rack::Session::Cookie`](http://www.rubydoc.info/github/rack/rack/Rack/Session/Cookie) middleware to enable the session, I have an entry `rack.session` in the environment where the user choice is persisted. When you set up the session cookie, you provide a map of settings such as expiry time. It looked as though it was this map that needed to be set on the cookie header. I therefore tried the following:
  
       headers = {}
       Rack::Utils.set_cookie_header!(headers, 'rack.session', cookie)
       [200, headers, load_html_page]

This did not resolve the issue, so onto the next attempt.

Rather than returning an array of three explicit values (status, header, body), there is a `Rack::Request` object that can be formed. On this, you can set a cookie. 

    response = Rack::Response.new [template], 200, {}
    response.set_cookie("rack.session", env['rack.session'])
    response.finish

Again, no improvement seen.

As this was taking some time to work out, and I was not coming across any new helpful links online, I reached out to some craftsmen but unfortunately they could not offer any advice. I will mention it my IPM tomorrow and hopefully get some light shedded.

[Setting a cookie with Ruby Rack](http://stackoverflow.com/questions/3295083/how-do-i-set-a-cookie-with-a-ruby-rack-middleware-component)

[example session](https://github.com/hayduke19us/simple_session/blob/master/lib/simple_session/base.rb)

[Rack session cookie](http://chneukirchen.org/repos/rack/lib/rack/session/cookie.rb)


### AJAX 

The next task was to look a little into AJAX (Asynchronous JavaScript and XML). AJAX is exchanging of data between a client and a server, which allows part of a web page to be updated, without reloading the entire page. This is because AJAX allows data to be loaded in the background. It allows webpages to be updated asynchronously by exchanging data with the server behind the scenes.

JQuery provides methods for AJAX Functionality. AJAX allows you to request text, HTML, XML or JSON from a remote server using HTTP Get and HTTP Post, and you can load the external data directly into the selected HTML elements of your web page.

AJAX is based on internet standards and uses a XMLHttpRequest object to retrieve data from a web server, and JavaScript/DOM to display and use the data.

### XMLHttpRequest

To create a XMLHttpRequest object, `xhttp = new XMLHttpRequest();`

To send a request to a server, you must call `open` with the type of request (GET/POST), the url of the server/file location, and async set to true for asynchronous or false for synchronous. Sending asynchronous requests improves performance because many server side tasks are time consuming. Having the setting as synchronous means other functionality can be executed while the server processes the response.

The `send()` method will then send the request to the server (for GET)

     xhttp.open("GET", "ajax_info.txt", true);

     xhttp.send();

For POST, `send(string)` is used, so you can specify the data you want to send. 

    xhttp.open("POST", "ajax_test.asp", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
    xhttp.send("fname=Henry&lname=Ford");

Post is preferred when you need to update a file or database on the server, if you need to send a lot of data to the server or if you are sending user input.

Using Ajax, a post request can be achieved by:

     function loadDoc() {
       $.ajax( {
         type: "POST",
         url 'my_path',
         data: 'player=1',
         success: success,
         dataType: 'text'
       });
     }
     
The success is a callback (so you define another success function), which is executed if the response from the server comes back with a 200 status code. I found I could get the url 'my_path', to display by implementing the following success method:

      function success(data) {    
         document.write(data);
      }
I've still not tried testing it, although I hear Jasmine spies should help.

With the web application task, I have felt bombarded with lots of different technologies, and at times I've not been sure whether I'm using Rack or not, jquery or not, ajax or not. As each task is completed, things become a little clearer, so I'll ask lots of questions at tomorrows IPM meeting to clarify where I need to apply the javascript and ajax calls.

[Jasmine-JQuery](https://github.com/velesin/jasmine-jquery)

[JQuery Post](http://api.jquery.com/jquery.post/)










