---
layout: posts
title: ECMA6 JavaScript
category: apprenticeship
---
### 8th Light Apprenticeship - Day 89

I had psyched myself up to enter the dark times today, as it was thought I would start the HTTP server. However, it turns out that I need to do more JavaScript practise. This week I need to implement a 'TO-DO' list written using clean, idiomatic ECMA6 JS.

<!--break-->

I'm not sure if I am relieved or disappointed. A bit of both, relieved that the server is not on my plate this week, but disappointed that my web tic tac toe must have shown  that I need some more practise. I had found using JavaScript in my tic tac toe a little clumsy, difficult to test, and hard to keep clean. Hopefully doing a pure JS project will help with that. It will also be nice to get away from tic tac toe for a while too.

### What does ECMA 6 offer?

Firstly ECMA6 uses classes as syntax sugar over the prototyped based pattern I used in my web app, so the code should look a bit more like I'm used to.

     class Person {
         constructor(name) {
            this.name = name;
         }
        
        describe() {
           return 'Person called '+this.name;
        }
    }

Instance variables are identified by using the `this` keyword.  For functions, simply use the name. No need to identify them using the `function` keyword.

Getters can be defined as methods prefixed with 'get' and called using:
 `new Person('Frank').name`
        
        class Person {
         constructor(name) {
            this.name = name;
         }
        
        get name() {
           return name;
        }
       }

Function names can also be stated in `[someExpression]` which will evaluate the expression before calling the getter.


It is  possible to import libraries using the `import` keyword. Multiple members can be imported from a given module using the following notation:

      import assert from 'assert';
      import {equal as myAliasNameForEqual, deepEqual, notEqual} from 'assert';
      
You can also provide aliases for your imports, which may help readability.
      
ECMA6 differentiates between variables scoped to a single block, and those that have function level scope. `let` is used to define block-local variables:

       for (var i = 0; i < 3; i++) {
       let j = i * i;
        console.log(j);
       }
       console.log(j); // => error, j is undefined   
       
`const` is the same as `let` except the value is immutable, so it can only be assigned once. 

The approach I took was to look up a feature [here](http://caspervonb.com/javascript/an-overview-of-javascript-in-2015-ecmascript-6/), then find the corresponding koan [here](http://es6katas.org/)

After a few of the koans, I felt I wanted a more realistic project to explore. I googled around for an ECMA6 tutorial and came across this one [Mortgage Calculator](http://ccoenraets.github.io/es6-tutorial/).  You are given some ECMA5 code, and the tutorial translate it step by step into ECMA6. It turns out that a lot of ECMA6 features are not supported in the browser (like deconstruction of objects). There is however a library, [babel](http://babeljs.io/), which allows you to write ECMA6, after which babel will automatically downgrade your code to ECMA5, so that it is more reliable in the browser.

I went through a few of the steps, and then decided to switch to getting a unit tests going, as once I know how to test ecma6 code, I feel I have the tools I need to get going on my TO-DO list story.

### How to setup a ECMA6 Project with Tests

Here we go again, another set of instructions on how to setup a JS project which will run jasmine through node (headless), for ecma6.

1. create the root of your project and generate a project structure using 
`npm install`
2. `jasmine-es6` is used instead of the vanilla jasmine library for tests. Install it using `npm install jasmine-es6` and add it to the dev-dependencies in the package.json file: 
     
         "devDependencies" : {
             "jasmine-es6": "0.1.4"
          }
3. Generate the jasmine test folder by doing `jasmine init`. This will generate a jasmine.json file. Update it to include the helpers:

           "helpers": [
               "../../node_modules/babel-register/lib/node.js",
               "../node_modules/jasmine-es6/lib/install.js",
               "helpers/**/*.js"
           ]

4. At the top of the test spec, it is  necessary to import the jasmine-es6 dependency:
    
           import install from 'jasmine-es6'
           install()
5. Setup a babel project, which will be used to translate your ecma6 code, so that it will run on the browser, which doesn't support all of the ecma6 features

 `npm install babel-cli babel-core --save-dev`       
 
`npm install babel-preset-es2015 --save-dev` 

`npm install http-server --save-dev` (the http-server is a lightweight web server which can be used to run the application locally during development)

6 . In the package.json, update the scripts section to point to the main entry point of your system:

         "scripts": {
           "babel": "babel --presets es2015 js/main.js -o build/main.bundle.js",
           "start": "http-server"
          }


Tomorrow I'll start putting a skeleton together for the TO-DO list, and go through the above steps again. I am not sure if I need every single dependency detailed above but I think I'll be able to get something going by following the above steps.

### Useful Links

[JavaScript Version History](http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/)

[ES6 koans](http://es6katas.org/)

[Introduction to ES6](https://babeljs.io/docs/learn-es2015/)

[Learn ES6](https://github.com/lukehoban/es6features#readme)

[Exploring ES6 (free book online)](http://exploringjs.com/es6/)

[ES6 tools](https://github.com/addyosmani/es6-tools)