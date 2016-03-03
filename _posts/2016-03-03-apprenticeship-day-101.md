---
layout: posts
title: Cob Spec As A Vendor Directory
category: apprenticeship
---
### 8th Light Apprenticeship - Day 101

Today I thought I had finished updating my Http Server on several occasions, only to do one last test and find something else to tweak.

<!--break--> 

During the demo Jim had suggested putting a copy of the cob spec repository inside my Http Server repository. This way, the server is along side the tests that run against it.  If the cob spec tests change, I am protected from that, as I have the copy that is in synch with my code base.

I took a fresh clone of the 8th light cob spec repository and copied into a vendor folder. It built and started ok. A great advantage of having the files in my repository, was that I could set the relative paths to the public directory and jar file, improving the experience of the developer cloning my repository and starting it on their machine. They no longer had to do this configuration themselves.

Next, I built my http server. It built ok, the tests started it and ran. I thought I was done. 

I went on to realise later, when starting my server in advance of running the tests (rather than letting the fitnesse test start it), the httpServer was defaulting to one public folder (the original one I developed against), and the test suite was looking at another (the one in the vendor folder). This was because the `CommandLineArgumentParser` had a default value to the public folder, pointing to the original checkout of the cob_spec repo I had made, not the public folder in the vendor folder.

I wanted to change the default of the public directory, and keep it as clean as possible. I knew I could ask my user to clone the repository to a particular repository, but I wondered if there was a nicer way. Talking to Christoph he suggested creating a reference to a `File` and getting its absolute path. That way I could see what the current directory is when the jar is running. A File isn't actually created, but you can still get the path. As it turns out it, the running directory is the root of the checkout, so I could just make the default public directory variable relative to this.

The other trick he suggested was excluding the vendor directory in IntelliJ, so that I could continue to run the tests through IntelliJ without errors about the vendor folder not compiling due to apache libraries being missing. This is because IntelliJ is trying to compile all the source files before running the unit test, whereas when building through gradle, it knows to just build the src folder you are interested in.

It is a little strange to have a maven project (Fitnesse tests) within a folder in a gradle project (my server), but it certainly eases the job of any developer who decides to clone the directory and get it running on their machine. Plus I don't have to worry about the cob_spec tests advancing and my Http server not being kept up to date. That concludes my Http Server journey, for now at least...!