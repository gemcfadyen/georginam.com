---
layout: posts
title: Ruby Kata
---

### 8th Light Apprenticeship - Day 61

Starting a new language involves a lot of setup and configuration that I didn't expect. Yesterday half a day was spent installing rvm and ruby. Today I realised that the setup didn't work when I opened a new terminal. The instructions I had followed were [here](http://usabilityetc.com/articles/ruby-on-mac-os-x-with-rvm/) 

<!--break--> 

This meant that every time I wanted to use rvm, I needed to do `source /Users/Georgina/.rvm/scripts/rvm` to set the runtime environment. To avoid this, I had added the source to my .bashrc. It soon became apparent that my .bashrc was not actually being loaded when I opened a new terminal, as my 'pretty' prompt for git was not displaying either, and that was also configured in the .bashrc.

After a while, a craftsman helped me eliminate the errors. We got the .bashrc loading by adding it to source in the .bash_profile file. 

The other thing we noticed was that the rvm install had updated .bashrc, .bash_profile and .profile to include rvm in the path. This was only required in one place, so we left it in the .bashrc, but removed it from everywhere else. 

After re-installing ruby through rvm the environment was working much better.

I managed to get a HelloWorld working (always a good place to start!) then I started with a roman numeral converter. Being very familiar with the algorithm, I tried to concentrate on the syntax. I had to do quite a lot of googling, and refer to the koans to find examples of a for loop, defining arrays, and constants. I got off to a good start, with the obvious tests (0, 1, 5), and did some refactoring.  After that I added the test case for 2. At this point the coding became really difficult. I couldn't understand why until I realised I was translating the opposite way around in my tests than I had previously done in the java version. 

After switching around my translation I finished the kata off and submitted it for review. The comments I got back were really useful. In Ruby it is apparently very unusual to use a for loop, instead you can use a Range which returns an enumeration. You can assign a variable name to each enumeration so that you can refer to which iteration you are in.

In RSpec, if you have a new instance of a class being created outside of a test, and each test using that instance, it would remember state, unlike in JUnit where a new instance is created each time. To fix this, you can use the let or begin statement. `let(:converter) {RomanNumeral.new}`. Let is a optimisation technique (memoization) to speed up processing by caching. However in RSpec, the value is cached for a given example but not across tests. It is also lazy evaluated, so will not be considered until the first time a method invokes it. 

Before allows you to execute code before or after each example. They take a symbol which indicates the scope. Before(:each) blocks are run after each example whereas before(:all) are executed once before all the examples in a group.

         before(:each) do
            @convert = RomanNumeral.new
         end
 
This means however that you need to refer to the 'attribute' convert with the '@' symbol in the tests, which is the Ruby syntax for a member variable. For example, 
 
        it "@converts 0 to empty string" do   
            expect(@convert.to_numeral(0)).to eq("")
        end
 
Another concept is attr_reader and attr_writer. This lets you initialise member variables, and provide getter and setter methods under the covers.  It is not good practise however to use attr_reader or attr_writer in test code, although to practise the syntax I did configure the following for demonstration purposes: 

     attr_reader :convert
     attr_writer :convert

    def initialize(attributes)
      @convert = RomanNumerals.new
    end 

    it "converts 0 to empty string" do
       expect(@convert.to_numeral(0)).to eq("")
    end
 
In the above example you can see an 'initialized' method. This acts like a constructor.
 
To run a Ruby application outside of the tests you can provide a bash script. Inside the bash script you can write Ruby code, to import a Ruby file, create a new instance and invoke a method. It is important to include the load path, otherwise the runner does not know where to look for the rb files.

     #!/usr/bin/env ruby
     ### setup load path here ###
     $LOAD_PATH << File.expand_path("../../lib", __FILE__)

     require 'roman_numerals.rb' 

     (0..3).map {|i| puts RomanNumerals.new.to_numeral(i) }
     
### vim

Two new plugins were used today - [vimux](https://github.com/benmills/vimux) and [vimux-ruby-tests](https://github.com/pgr0ss/vimux-ruby-test). This means that within tmux, I can spit the vim terminal (:vs) so that the test can be on one side and the production code on the other. When I run the tests (,r), a new tmux panel will appear at the bottom (if there is not one open) to display the test results.

Other new shortcuts were:

`ctrl-w` to jump from one split vim pane to the other

`:e` path-to-file' to open a file from vim

`:%s/word-in-file/renamed/g`  replace all occurrences of 'word-in-file' with 'renamed'.