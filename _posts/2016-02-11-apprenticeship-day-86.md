---
layout: posts
title: Writing Your Own Rake Task
category: apprenticeship
---
### 8th Light Apprenticeship - Day 86

Running jasmine tests from within a Ruby project means my folder structure is non-standard for a JS project.

<!--break--> 

I didn't want to keep all my javascript tests straight under 'spec', as they would be muddled up with the RSpec tests. Instead, I created a 'javascript' folder under spec to keep the JS tests together. This meant, to run the jasmine tests in a headless manner, the environment variable 'JASMINE_CONFIG_PATH' had to be set, so that the Jasmine runner would know where to find the javascript test specs. To achieve this, you can type a command as follows, which sets an environment variable then calls jasmine to invoke the tests:

     `JASMINE_CONFIG_PATH=spec/javascript/support/jasmine.json jasmine`
     
This was becoming a little tiresome to include every time the tests were to be run, so I looked up how to create a custom Rake Task to run jasmine tests. 

In Rake, it is possible to set environment variables using: 

     ENV[variable] = value
     
This meant, I could include the following at the start of the rake file:

     ENV['JASMINE_CONFIG_PATH'] = "spec/javascript/support/jasmine.json"
     
     
Rake can also be configured to execute bash commands. You simply require the library 'fileutils' then you can use the 'sh' command. In order to call jasmine, I simply wrote a task which would execute 'jasmine' on the command line:

      task :jasmine do
          sh 'jasmin'
      end
      
Now I can run `rake jasmine` and the javascript tests will execute in a headless fashion from the command line, without me having to set the environment variable explicitly.

During the day as I updated the Ruby web application, I would choose which test suite to run by typing `rake` to invoke the default task, configured to run the RSpec tests, or `rake jasmine` to invoke the Jasmine tests.

At the end of the day, I configured the default task (which is the command invoked when you only type `rake` on the command line) to run the RSpec tests, then automatically call the Jasmine tests.

This was simply a case of proving the default task an array of two tasks (:spec and :jasmine) to run, rather than just :spec as it was originally.

    task :default => [:spec, :jasmine]

Now I can run `rake` and all my tests from RSpec and JS will be invoked. This should also be useful when running through CI.


