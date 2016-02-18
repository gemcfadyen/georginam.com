---
layout: posts
title: TDD & JavaScript
category: apprenticeship
---
### 8th Light Apprenticeship - Day 91

JavaScript is making life very difficult at the moment. I know exactly what I want to do, and can even see it working in the browser if I spike the code out, yet, testing it is just impossible. I'm not even trying to do anything complex. I just want to do checks like 'ensure display has been called', or 'ensure dom is now updated with specific tag'.

<!--break--> 

Sometimes whilst testing, jQuery works, sometimes it doesn't. If it doesn't I resort to traversing the document. Sometimes that works and sometimes it doesn't.

Fixtures that are set interfere with all the tests. I thought I was in a green state, yet changing the fixture on one test, makes another fail. Yet the documentation for jasmine-jquery states that the fixture is torn down after each test.

Talking of fixtures, they repeat what is already in my index.html file. As this is duplication, I wanted to load the index.html and use it for the tests. Sounds straightforward. Jasmine looks at the spec folder by default for fixtures. You can set the path directly using `jasmine.getFixtures().fixturesPath='../../', but it doesn't seem to be able to interpret moving up using '..' notation. Similarly, if I set it to __dirpath (the root), again invalid URI. Having spent a good hour trying to change this, I decided to leave the duplication and move on.


Spying on interactions, again out the box functionality. However try to spy on the $('tagId').replaceWith the tests complain it is never called. Run the code in the browser. The tag is replaced as expected.

I moved to writing my own spy, and even that didn't work. Later I realised I had forgotten to append the word `this.` infront of calling a local method, so that was perhaps why, but of course, no error message is provided so looking for issues is like looking for a needle in a haystack. In desperation I even installed jsmockito (which is likely to be banned in 8thLight, but desperate times means desperate measures). Even that would not cooperate. I now understand when I was on client site and a fellow craftsman was pushing back their use of javascript, as it is just so difficult to test.

It was becoming clear that I would not finish the TaskMan stories as there is only one day left to work on them. I don't have a problem writing the production code, and linking the click handlers in. The testing just slows me down so much as you trouble shoot one issue after another. I let Jim know, as I still have a separate story to complete, and the scope for Task Man has decreased.

Now I'm still struggling with testing that the dom has been updated, but I'll continue to troubleshoot. Whilst I started out with a conscious effort to use ecma6, and write lovely clean code, the work arounds within the tests are polluting the code, and I'm not growing any fonder of JavaScript. Maybe implementing the HTTP Server won't be so bad after all this... 