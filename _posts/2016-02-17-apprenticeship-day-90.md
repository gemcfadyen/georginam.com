---
layout: posts
title: More JavaScript Configuration
category: apprenticeship
---
### 8th Light Apprenticeship - Day 90

I woke up really early this morning thinking about 'Task Man'.  A few questions were going around in my head - Do I really need a server? Do I need to use post/gets, do I need to persist somewhere? What actually is a `Single Page Application`? 
At around 5am I started googling. 

<!--break--> 

"A Single Page Appliction (SPA) is a web app that loads a single HTML page and dynamically updates that page as the user interacts with the app"

That made sense. I would manipulate the DOM in TaskMan, in a similar fashion used in my tic tac toe. I came across some client side persistence called local storage, so that may also be useful, although I have decided to park persistence for now and get the functionality going. If there is time this week to put persistence in, then I will investigate it more.

I then started to think about the design. The requirement says that you can add, edit, complete and delete tasks, but tasks belong under different lists. For example, you might have a 'Garden' list with tasks such as 'mow the lawn', 'fix the wall', 'clean the pond', and a completely different list called 'Work' which has 'write a HTTP Server', 'Write a SPA', 'Learn to juggle' on it. 

I was trying to work out the interactions in my head. In the end, when I got to work, I drew out my thoughts in my notebook.  I've decided the top of the page will have the ability for you to enter a new list (like Garden, Work). The user can fill in the text box with the name, and press the button 'create'. This will trigger a click handler, which will update the html with the new list, and a box where the user can add their ToDo tasks.

I'll also need to deal with edits, completions and deletions, so I imagine there will be a lot of handling events.

Having the page drawn out helped me clarify where I should start. I put together some basic HTML for the first text box and button then TDD'd out a TaskList and a ToDo object. I used ecma6, so export the classes, and use the built in get and set keywords for the getters and setters. The tests can then import the classes quite easily.

I then started the click handler for the button. I used jQuery to fetch the button, and attach a click event. I used the ecma6 way for this, using the arrow `==>`:

       this.taskListButton.addEventListener("click", (e) => { this.onClick(e); });


For now, the button just pushes and alert so I can see it is hooked together. 

I should mention that a large portion of the day was spent once again configuring the tests, so that logic worked on the command line and the browser. As I'm using ecma6, babel must translate the code down. This generates a new file, full of all the javascript in the project, which is then imported to the html in the script tags.

However, even after the ecma6 has been babbled, the browser still does not understand modules (exports/imports). This means the project has to be packaged. I used webpack. This actually takes care of babel for you as well, so one less dependency to import.

To configure webpack was difficult. You have to provide an entry point to your system (i.e. the main method). My app doesn't have a main method, I want all the JS to be loaded and execute as and when it needs to be. Therefore, I added all the js files in an array and it seemed to work ok.  Configuring jQuery was very difficult too. You have to add a plugin to tell webpack to use jQuery. I should also mention that in the jasmine tests, as previously mentioned for the tic tac toe project, there is a lot of jiggery pokery to get the dom windows setup. I tried to do this through imports (i.e. the ecma6 way) but it appeared impossible to import a library and inject it with an object, which is required - jsdom needs to provide the window to jQuery.  After trouble shooting for a while, and consulting with Skim, he suggested just using the older 'require' statements. We know this works, as it is what we did in the tic tac toe project when setting it up last week.

Now that I have things setup (I think!), I should be able to make more progress tomorrow. I've realised I don't need a server, nor posts and gets. For now, I'm going to ing can be held in memory. I'm still a little unsure about having so many buttons and action listeners.And I hope I won't wake up at 5am thinking about Task Man tomorrow.



