---
layout: posts
title: Pairing Tour Day 8
category: apprenticeship
---
### 8th Light Apprenticeship - Day 128

Today I was on a large client site with two of our craftsmen. Over the last few months they have been helping the client introduce git for source control, and standardise the code structure so that it can be built and deployed using gradle.
 
<!--break-->

Whilst they have been doing this, the development team at the client have continued with functional change, which has been committed to the older source control system. Today was switchover day. The changes made in the old source control system needed to be merged into the git repository.

There were three months of changes to consolidate, which we could see was 300 commits. One pair set about using git rebase, but there were a lot of merge conflicts. This meant, that in one day, only 91 commits had been merged together, leaving 200 remaining.

Enrique and I tried a more naive approach, and copied all the source files from the old source control system into the git repository, overwriting any changes in git. Once happy with that, each file needed to be diff'd in order to bring back any changes that were made on the git branch.

Neither approach was fast, and neither approach resulted in a successful build at the end of the day. 

The team said they had learned a lesson. They could have made this switchover easier if they had merged changes every week. This would have reduced the number of conflicts, and made resolving them easier as the detail would have been more fresh in the developers mind.


