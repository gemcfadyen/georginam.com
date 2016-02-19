---
layout: posts
title: Wrapping up Task Man
category: apprenticeship
---
### 8th Light Apprenticeship - Day 92

This morning I came to work with fresh enthusiasm, and got straight onto trying different techniques to get my jasmine tests to pass. As the code worked ok in the browser I had narrowed the issues down to jQuery in the tests. For some reason, it was not picking up the changes that were being made through the production code. 

<!--break--> 

Initially, because I am using ecma6 code, I was importing the libraries, rather than requiring them. As there was no way to inject the jsdom into the jQuery, I ended up using require, but the $, window and document all had to be declared as `global`

 		let jsdom = require('jsdom').jsdom;
		let doc = jsdom();
 		global.window = doc.defaultView;
 		global.document = window.document;

 		global.$ = require('jQuery'); 


I wondered if this was causing me the trouble. However if global is removed, then the production code does now know what $ is when under test, so it appears it needs to be kept in.

I decided to remove jQuery from the code, and see if the tests would work. This meant that I had to use native javascript to manipulate the dom. I used the document to traverse the tags in the test, and in the production code, used document.createElement and attached the id's and text content. It worked!  It feels like the code has degraded to allow for the tests, but I feel the testing is very important. So for now, I'll go with native javascript so that I can continue to add functionality.

The next thing I introduced was the delete button. If clicked, I wanted it to remove the task and the button from the document. I realised I needed some sort of id to group the dom elements related to a given to-do item. 

I created an IdGenerator which used Math.random to generate an id. I was aware that this was not completely unique, as there is nothing stopping Math.random providing the same number twice. I felt however that it was enough to get going so created an abstraction for the random nature, and used a fake implementation for the tests. Later in the day, after talking through my code with some others, I realised a simple counter would do the trick, allowing me to remove the fake implementation which was a nice simplification. One complexity is that each element needs to have a uniqueId. This meant, to associate the `<p>` and the `<button>` tag to the same To-Do item, I needed to append `<counterValue>.0`, `<counterValue>.1`. For now this is hardcoded into my solution.

I managed to hook up the delete functionality but once again the unit test for it did not work (the fixture didn't seem to have the element removed), where the browser does. A little frustrating, but I'm used to it now. It goes back to it seemingly look like the fixtures are not cleared between test runs. If I move all the logic into one test, assert that the element has been added, then delete , and assert that element has been deleted then the scenario works. I have left it this way, indicating that the test is a scenario through it's name. But clearly something is not quite right with the `window` and `jasmine` setup. At least this proved it.

In conclusion, I have learnt a lot of things from Task Man. I think that writing JavaScript code itself can be kept clean and well designed. I quite like the ecma6 features, although some I couldn't use due to the test issues. I learnt how to 'degrade' the ecma6 code to plain JavaScript so that the browser can interpret it.
I also learnt that it is very difficult to test the dom manipulation. Because of this, the code I wrote degraded, as I could not get jQuery to work, which is perhaps more elegant than native JS Dom manipulation. In the end I felt my code was more of a 'spike' standard than my best work. 

There is a long list of improvements I would like to apply to Task Man - 
 - create a builder for the dom elements so that they are all in one place
 - Remove the duplication of the literals like data attributes, id's
 - Find an elegant way of looking up elements with a particular data-attribute, rather than appending .0, .1 to the end of the id to uniquely identify 
- Group the dom elements associated with a particular To-Do in a more elegant way.
- Use local storage for persisting the tasks (currently if you refresh the tasks all disappear).

Perhaps I'll just start it again at a later date.