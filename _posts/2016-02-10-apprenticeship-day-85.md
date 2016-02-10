---
layout: posts
title: JavaScript Testing
---
### 8th Light Apprenticeship - Day 85

In order to complete the spike on integrating JavaScript into my web application, I wanted to get a unit test working. On the surface of things, it sounded straight forward enough - just install node, jasmine and jQuery and away you go.

<!--break--> 

The reality was totally different. I had already tried to get a running test, and kept getting errors around `$ is not a reference` and `Cannot find jQuery`. I paired with Skim, who knows a lot about javascript, but he had not used js within a Ruby project before, so we had to do a lot of trouble shooting.

He suggested to install jQuery locally rather than globally. This involved downloading jquery-2.0.0 which provides you with a package structure containing a `package.json` file. In here, you can add other dependencies that you need for testing (such as jasmine, jasmine-jquery, jsdom) which are then installed using `node install`.

This took us the whole morning, so it was after lunch when we actually looked at the test I had written.  I'm pleased that I generally had the right idea. The test needs to have some html to work with, and you can set this up by setting a fixture. For my test, I want to check that a post request is sent when a link is clicked. This meant I set up a fixture containing the html for a `<a>` tag. 

This felt a little like duplication. After all this link html is already in the erb file. However Skim said it's very common that the fixtures duplicate, or end up similar to the erb's. 

In order to link the fixture to the document, there was a lot of setup. JSdom has to create a default view, which becomes the Window, which you then have to use to set the document. After that it is necessary to `require` the javascript under test. Because this is plain javascript, it would get executed as soon as it is required, which is too early. At this point, the fixtures are not setup. Therefore Skim suggested wrapping the production javascript in a block and giving it a variable name - BoardHandler. This meant in the test, I can control when the javascript is loaded, by calling `window.BoardHandler.bindEvents()` after the fixtures are set.  To run the tests in a headless manner (ie without the browser) it is necessary to set the path to the jasmine.json. This can be achieved by calling the following, rather than just 'jasmine'.

`JASMINE_CONFIG_PATH=spec/javascript/support/jasmine.json jasmine`

At this point I was really glad I had asked for a pair to help with the setup, as I would not have known to include jsdom for the window and document setup. I also didn't realise the js would get executed straight away before the fixtures were set. 

The spike ended up taking an entire day rather than the half day allocated, but most of it was spent setting up the test framework, which would have been needed for the real work. The tasks I have identified to complete the actual story are as follows:

### Tasklist

- Set up JavaScript Tests on the real branch

- Write a board handler in javascript which sends a POST request when a link is clicked

- Update the web app routing so that when a user takes a move from the web gui, the body of the response is a JSON representation of the grid, game status rather than returning the fully populated html

- Write a board presenter in javascript which will transform the JSON into a table, which can be inserted into the dom through the javascript.

I better get started...! :-)



