Backbone Sample
=
This sample demonstrates the following combination

- container-less deployment
- require js
- serving resources from the classpath

Running the sample
=

Make sure you have java 8 installed.  Why java 8?  Because I work on this project in my own time, and in my own time I don't have to deal with archaic technology.  
Decide which port to use, for this example, I am assuming port 12345

    mvn package
    java -jar server/target/server.jar 12345

Open a browser and navigate to

    http://localhost:12345
