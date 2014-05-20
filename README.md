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

The Rules
=

- Focus on maintainable code
- Full test coverage, should be able to refactor with confidence
- Use the provided in-memory data store (or create your own, just don't use local storage)
- No mucking about with globals, all tests are run from the same javascript instance to enforce this
- At a minimum, there should be a button that adds items to a list when pressed.
- You can implement a full [todo](http://todomvc.com) app if you like
- Feel free to use CoffeeScript, ClojureScript, ReactJs, AngularJs, etc.
- Feel free not to use libraries if that is your preference
