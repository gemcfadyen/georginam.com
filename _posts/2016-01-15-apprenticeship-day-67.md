---
layout: posts
title: Running Tests and CI with Ruby
category: apprenticeship
---

### 8th Light Apprenticeship - Day 67

There are multiple ways to run a test in Ruby.  

<!--break--> 

You can simply call `RSpec` and give the file name. However if you want to run all the tests in your system, you navigate to the root directory and simply call RSpec from there.

### Rake

`Rake` is another way of running Ruby tests. It is a build tool (much like gradle or maven are to Java). To get started with Rake, you need a `Rakefile`. Here you define a default task (let's call it :spec), 

      begin
          require 'rspec/core/rake_task
          RSpec::Core::RakeTask.new(:spec)
      rescue LoadError
      end
      
      task :default => :spec


which can then be run from the command line using 

     rake spec
    
or just 
      
      rake

If you do not want to specify a default task, you can call 

       rake spec

and thereafter running just 

       rake 
       
will invoke the spec task, as it will be remembered as the default task.

### Bundler

[Bundler](http://bundler.io/) provides a consistent environment for Ruby projects by tracking the version of Ruby and what gems are being used. This way, the gems you need are in all the development environments.

Within the project you pull down the bundler using:

       gem install bundler
       
Each project requires a `Gemfile`. A simple example may consist of the following lines:

       source 'https://rubygems.org
       gem 'rspec', :require => 'spec'

To check what gems you have in your project, you can list them 
   
        gem list
        
To find out roughly how many gems are installed, do a line count

        gem list | wc -l
        
Call bundle

         bundle install
         
This will pull down the gems in your project listed in the Gemfile, plus any transitive dependencies required they require. You can that the list of gems may then have changed by doing another line count.

Gemfile and Gemfile.lock(generated file) should then be added to the git repository so that other developers on the project, and the deployment environment will all use the same list of dependencies. 

Once bundler is installed you can run all the tests using 
   
         bundle exec rspec
         

### RVM

[RVM](https://rvm.io/) is Ruby Version Manager and also works in harmony with Bundler. RVM lets you deploy each Ruby project with its own self contained environment.

To ensure consistency between versions of Ruby that developers use, create and add to the repository a `.ruby-version` file, containing the version of Ruby the project uses.
   
        2.2.1

To create a `gemset` for your project, create a `.ruby-gemset` file and let it contain the name of your gemset, eg 'ttt'.


To see the gem configuration for your project 
      
         gem env
         
Under the `GEM PATHS` header, the new gemset (ttt) will be present.

Having a gemset avoids conflicts between different version of the same gems. RVM, through the .gemset file you avoid having to commit the actual gems, which would inflate the repository.


### Continuous Integration

So that the status of the project is visible, continuous integration should be used. Minimal setup is required to get a build on [https://travis-ci.org](https://travis-ci.org). Simply add a `.travis.yml` to the root of the project directory, and specify Ruby as the language:

      language: ruby
      
Enable the repository in travis-ci itself, and after committing and pushing the .travis.yml file, the build will execute and the status will be visible on the website. You can then copy over the markdown widget to make the build status visible from the git hub repository.

Travis-ci will clone the project, install the version of ruby specified in the .ruby-version file (through rvm) then execute the command `bundle exec rake` 

To be successful, the Gemfile.lock file needs to be committed and available on the master branch, and the Gemfile must contain the gem 'rake' entry.

### Code Coverage

To inspect code coverage, the gem [simplecov](http://www.rubydoc.info/gems/simplecov/frames) can be used. Add this to the Gemfile, then call 

     bundle install 

to download the gem.

In the spec/spec_helper, at the top, add

     require 'simplecov' 
     
     SimpleCov.start
     SimpleCov.minimum_coverage 100
     
When you run your tests next time, you will see statistics on the coverage, and a warning message if the coverage is below the minimum threshold specified.

You will notice that a coverage folder is generated, where you can navigate to the index.html and view the results on a per class basis through a browser.

### Code coverage and CI

Code coverage can be integrated with CI using [https://coveralls.io/](https://coveralls.io/). Again the gem 'coveralls' needs to be added in the Gemfile, and bundle install called to download it.

The spec/spec_helper.rb file needs to be included to specify:

      require 'coveralls'
      
      Coveralls.wear!
      
Navigate to the coveralls website and enable the repository. The statistics can be viewed, and thresholds set.
      
Now when the tests are run locally, a message '[Coveralls] Outside the CI environment, not sending data.' This means the results gathered are not being pushed to the website, because it is just a local build. However you can generate the coverage report locally by including a file `.coveralls.yml` in your repository containing a secret repo token (generated by coveralls and viewable on their website on your repository)

      repo_token: xxxxxxx
      
This way when you call 

      bundle exec coveralls report
      
At this point you are fully integrated with CI and can code away in safety.


Useful links:

[Adding travis to a ruby project](http://pete-hamilton.co.uk/2012/11/17/adding-travis-ci-to-a-ruby-project/)

[Coveralls for Ruby](https://coveralls.zendesk.com/hc/en-us/articles/201769485-Ruby-Rails)

[CI Status of my Ruby TTT](https://travis-ci.org/gemcfadyen/Apprenticeship-RubyTicTacToe)

[Coverage Status of my Ruby TTT](https://coveralls.io/github/gemcfadyen/Apprenticeship-RubyTicTacToe)

[Uninstalling Ruby Gems](http://ruby-journal.com/how-to-uninstall-all-ruby-gems/)
     

