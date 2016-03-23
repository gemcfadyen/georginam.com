---
layout: posts
title: Server Client Protocol
category: apprenticeship
---
### 8th Light Apprenticeship - Day 115

Spiking a Clojure server interacting with a Java client was a little experimental but it seemed to be hanging together. 
One piece of feedback I got was around the data that the server was sending to the client. I has assumed this would be in it's final format, whereas the idea was to strip the formatting out, and just send the data in a raw format.

<!--break-->

Json was suggested as this format, and I liked that idea. I used the `data.json` library in Clojure which allows you to treat a string as json using `json/write-str { "some" "json"}`. This meant I did have to append the new line character onto the end of the string, as this signifies the end of the input for the client.

On the Java Client side, I used the `org.json` package, which allows you to create a JSONObject using a string (received from the server). It can then be parsed and the key values retrieved.

Now the server sends 
           (json/write-str { "action" "Display"
                  "1" "HvH",
                  "2" "CvH",
                  "3" "HvC"
                  }) "\n"))

The client then decides how to format this, giving a clear distinction between formatting and data.


