---
layout: posts
title: JavaScript
category: apprenticeship
---

### 8th Light Apprenticeship - Day 82


Today's task was to complete a kata in JavaScript using Jasmine for testing. It felt nice to take a break from tic tac toe, so I investigated how to install the tools.

<!--break-->

It turns out that you simply download [the latest jasmine](https://github.com/jasmine/jasmine/releases) which provides you with a folder structure, and some code and test examples. These examples can be run in the browser simply by opening the SpecRunner.html file.

To write new tests and functionality, you can create files in the spec folder (for tests) and src folder (for prod code).

I turned to my go-to kata, which is the roman numeral converter. I find it a useful one as it uses some of the basic structures of a language such as looping, and arrays.  I managed to complete it after a bit of googling for various syntax. At the end I felt the code looked very like Java, with a tiny flavour of Ruby (as there are no explicit types defined, you just use `var` to declare a variable). 

I wasn't sure if it was a good thing that my JavaScript looked like Java code (I'm working hard to try to stop my Ruby looking like Java!), but thankfully one of my mentors came to pair in the afternoon and said it looked ok.

Although I had the tests running through the browser, it is easier if they can run through the command line, so I downloaded node in order to achieve this. 

     brew install node
  
     npm install -g jasmine
  
You can then navigate to a directory and setup an example project by doing `jasmine init` which generates the spec folder and `jasmine examples` to generate a lib folder in this case. It seems that by using node, the file structure is very similar to the RSpec layout. To run the tests you just type `jasmine`.

Together with Enrique we paired on the [Fizz Buzz Kata](https://en.wikipedia.org/wiki/Fizz_buzz). Whilst it is an easy kata, we used it to explore how to represent classes in javascript. We used a prototype class, which you can add methods to. 

I also learnt that to represent a private method in JavaScript you start the name with an underscore. Another quirk is that at the end of the production code file, you need to export it, so that the rest of the world can see it: ` module.exports = FizzBuzz;`

As node was being used to run the tests, you can type `node` on the command line it brings up a terminal. From here you can instantiate objects and try out code, much like the irb in Ruby.

Once we were satisfied with our FizzBuzz implementation we invoked the node terminal and did the following to see the output of the game when 100 turns are taken:

     FizzBuzz = require('./lib/jasmine_examples/fizzbuzz');
     fizzbuzz = new FizzBuzz();
     numbers = [];
     length = 100;
     for(i = 0; i < length; i++ ) {
       numbers.push(i+1);
     }
     
     for (numbers in number) {
       console.log(fizzbuzz.play(number));
     }

It worked a treat and I'd definitely like to pair again next Friday. Not only did I learn good parts of the language, I also learnt a few new vim shortcuts to add to my collection.

### Useful links

[JavaScript](http://www.w3schools.com/js)

[Running node js from the command line](http://stackoverflow.com/questions/21392370/how-to-run-jasmine-tests-on-node-js-from-command-line)

[Jasmine Tutorial](http://code.tutsplus.com/tutorials/testing-your-javascript-with-jasmine--net-21229)

[Running node js in the browser](http://www.richardrodger.com/2013/09/27/how-to-make-simple-node-js-modules-work-in-the-browser/#.VrTPdpOLSrN)



