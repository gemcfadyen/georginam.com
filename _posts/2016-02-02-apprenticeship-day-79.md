---
layout: posts
title:  Creating and Publishing a Ruby Gem
---

### 8th Light Apprenticeship - Day 79

The last task to tackle in this week's iteration was to create a Ruby gem for the core rules of the tic tac toe game. This was so that the two different implementations (command line and web app) could depend on the same core, reducing duplication and mimicking setup of a more realistic project.

<!--break-->

How to create a gem though... Looking online a lot of the information assumed you didn't already have a repository in place. There seems to be lots of commands that could create a whole skeleton project for you, whereas I only wanted to create the gem, not the project structure.

After asking around I was able to confirm that all I needed to add was a gemspec file.

A [gemspec file](http://guides.rubygems.org/specification-reference/) contains all the information for a Gem such as the name, version, description and so on. Here is my example (ttt-core.gemspec) from the core tic tac toe repository.

        lib = File.expand_path("../lib", __FILE__)
 		$:.unshift(lib) unless $LOAD_PATH.include?(lib)
		require 'ttt-core/version'

		Gem::Specification.new do |spec|
		  spec.name          = "ttt-core"
  		  spec.version       = TTTCore::VERSION
          spec.authors       = ["Georgina McFadyen"]
          spec.email         = ["gemcfadyen@hotmail.com"]
          spec.description   = "Tic Tac Toe Rules to be used in conjunction with a front end"
          spec.summary       = "Tic Tac Toe Rules"
          spec.homepage      = "https://github.com/gemcfadyen/Apprenticeship-RubyTicTacToe"
          spec.license       = 'MIT'
          spec.files         = `git ls-files`.split($/)
          spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
          spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
          spec.require_paths = ["lib"]

          spec.add_development_dependency 'bundler', '~> 1.11'
          spec.add_development_dependency 'rake', '10.5'
          spec.add_development_dependency 'rspec', '~> 3.4'
        end



In order to build a gem, the following command can be used from the root of the core tic tac toe repository:"

        gem build ttt-core.gemspec

After it is built, it needs installing, so that other repositories on your machine can reference it.

        gem install ./ttt-core-0.0.1.gem


By default, the gem will be visible in the root folder of your core tic tac toe , and also installed under the .rvm home, however I was using a gemset for the ttt-core, so the gem had been put under that gemset path.

This meant, after adding the new gem to the Gemfile of the command line game, it would look at the default .rvm location, and not find it, as the command line game was not using the gemset.

To rectify this, I configured the command line game to use the same gemset by executing:

      rvm 2.2.1@ttt       # (Where 2.2.1@ttt is the name of the gemset)

At this point, the command line game could find the new gem as the GEM_PATHS under gem env had been updated.

I had been thinking how would my continuous integration work now that I have a separate gem. I had been wanting to configure ci for the command line and web app repositories, but was unsure how to do this initially, before the gem was available, as the builds for the command line app would depend on the build for the core repository. So I decided to release the gem to [https://rubygems.org/](https://rubygems.org/) so it would be available for any repository to require and use.

Publishing the gem was a simple task of signing up for an account, then adding the following require statement to the Rakefile, to provide the release task.

      require "bundler/gem_tasks"

Then to release the following task is called:

       bundle exec rake release

The first time it fails, because it does not have access to your rubygem.org account, so you do

      gem push


which prompts you for your user name and password. After running the release task again, it was successfully uploaded and can be seen here: [My published ruby ttt gem!](https://rubygems.org/gems/ttt-core)

Now I have three ruby tic tac toe repositories, two of which (command line & web app) depend on ttt-core. All of which run through continuous integration.

###

Useful links

[Write your own gemspec](http://jeffkreeftmeijer.com/2010/be-awesome-write-your-gemspec-yourself/)

[Write your own gem](http://guides.rubygems.org/make-your-own-gem/)

[Releasing your gem](https://quickleft.com/blog/engineering-lunch-series-step-by-step-guide-to-building-your-first-ruby-gem/)

