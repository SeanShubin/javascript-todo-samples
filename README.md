Javascript Todo Samples
=
This sample demonstrates the following combination

- container-less deployment
- require js
- serving resources from the classpath
- various styles of a "todo" application with test coverage and backed by a REST'ish data store

Running the sample
=

Make sure you have java 8 installed  
Decide which port to use.  For example, for port 12345:

    mvn package
    java -jar server/target/server.jar 12345

Open a browser and navigate to

    http://localhost:12345

Don't like the way I did it?
=
My samples are in the [sean](https://github.com/SeanShubin/javascript-todo-samples/tree/master/gui/src/main/resources/serve-from-classpath/todo/sean) directory.  
Create a directory of your own and show me how its done!

Application Requirements
=
- When you press the button
 - A new item is added to the data store
 - The newly added item is displayed in the browser
- When the page is displayed
 - All existing items in the data store are displayed in the browser
- (optional) implement a full [todo](http://todomvc.com) app

Metrics
=
- Meet customer need
- Can confidently refactor
- Clearly express intent
- No duplicate code
- Concise as possible

The Rules
=
- Feel free to use CoffeeScript, ClojureScript, ReactJs, AngularJs, etc.
- Feel free not to use libraries if that is your preference
- Fell free to use any test framework you like
