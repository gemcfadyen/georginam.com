---
layout: posts
title: JavaScript Namespaces
category: apprenticeship
---
### 8th Light Apprenticeship - Day 88

JavaScript lures you into a false sense of safety (all unit tests green), only to blow up in the browser. 

Seemingly it was never designed for large scale programming, so support for building reusable modules is limited. Certain work arounds need to be done to allow the JavaScript code to work both through Node for headless unit tests, and through the browser.

<!--break--> 

When loaded in the browser, JavaScript is loaded into a global namespace. If the namespace is loaded several times, the last assignment wins. This is why libraries such as ajax have all their functions (e.g.: `$.ajax`) as properties of the `$` namespace.

      var $ {};
      (
       function() {
            var $.ajax = function() {
                ...      
            };
            
           var privateFunction = function() {
              ...
           }; 
      })();

This allows anyone loading this file with the `<script>` tag to call $.ajax, but privateFunction, which isn't prefixed with the `$` tag is private and can't be seen.

Within Node, there is no DOM or script tags, so `require` is used to import a file and return a namespace object. Imagine you wrote a class `Display`, within this, you export it using `module.exports=Display`.

For Node therefore, you use `module.exports` to export the file, allowing the unit tests to see the code, but for the browser you simply use the `<script>` tags, which essentially imports it.

In order to make it work on both sides, a runtime check is made to see if `module.exports` exits. If it does, the namespace we defined is used, otherwise, `require` is called to import the dependencies. For example, within Display you would place:


     if (typeof module !== 'undefined' && module.exports) {
        module.exports = Display;
     }

and for a functionality that uses a `Display`, it would be `required` using

     var Display = Display || require('../../lib/javascript/Display');

This code somewhat pollutes the files, but the advantage is that you can safely run your jasmine test, then be surprised that Javascript works in the browser rather than being confident with your tests, only to be disappointed when your app doesn't work in the browser.

### Useful links

[Namespaces in the browser and node](https://github.com/evanj/js-module-experiments/blob/master/node_and_browser/mylib_test.js)

[Code example](http://www.evanjones.ca/js-modules.html)
