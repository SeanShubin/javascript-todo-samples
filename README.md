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
My samples are in the [sean](https://github.com/SeanShubin/javascript-todo-samples/tree/master/gui/src/main/resources/serve-from-classpath/todo/sean) directory.  
Create a directory of your own and show me how its done!
