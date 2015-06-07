
# Say hello to the world with BonjourLeMonde.js

## BonjourLeMonde.js line by line
### Let's use express
The first couple of lines;

    var express = require('express');   // use the express package
    var app = express();                // construct an application

...specify that we use the `express.js` package, which is an extremely commonly used package for manipulating HTTP interactions.
The express package exports an function `express()` that acts as a constructor for an (HTTP) application object.
The constructed `app` object is then the primary protagonist in the rest of this little application.
 

### Now we deal with a request for a greeting in english
The next few lines specify how to deal with a request for an English language greeting;

    // specify what to do when http GET is received on http://<server>/english
    app.get('/english', function(req,res){
        	res.send("Hello world, from England.");
        });

Let's decompose this. Overall, `app.get('/english', ...` tells node.js what to do when it receives an HTTP get on the `http://`*<server>*`/english` URL.

The snippet of code

	function(req,res){
		res.send("Hello world, from England.");
	}
creates an *inline function definition* - of a function that takes two parameters `res` and `req`. 
This function is then *passed as a the second parameter* to the `app.get(...)` function.
As a key part of the way that node.js works - when an HTTP request is received on the registered URL, `http://`*<server>*`/english`, node.js will call
the registered function, passing `req` (request) and `res` (response) objects as parameters. 
Our inline function definition completely ignores `req`, but it uses the `res` object to send an HTTP response.

One key point to notice, is that nothing 'interesting' from a point of user externals happens when the `app.get` itself is executed: 
it's just setting up the functions to be called when an HTTP request is received.

		
### ...and French 
Hopefully, but now, this section of code should be self explanatory;
	
	// specify what to do when http GET is received on http://<server>/francais
	app.get('/francais', function(req,res){
	    res.send("Bonjour tout le monde, de la France");
  	});
  	
### ...and everything else
There's a tiny bit of additional smarts to notice for this last section;
	
	// specify what to do when http GET is received for any other URL
	app.get(/^(.*)$/, function(req,res){
   		res.send("Eh?") ;
	});

...and it's in the first parameter to the HTTP get, `/^(.*)$/`. It's a *regular expression* which will match *any* URL.

This means that, as the code stands, whenever a URL is entered that is not either `http://`*<server>*`/francais` or `http://`*<server>*`/english`,
you get the response

	Eh? 

### Delving deep into the node.js event loop
Since `/^(.*)$/` should  match every URL, you might ask why this doesn't cause *every* request to get an `Eh?` added to the response.

The answer is interesting, because it requires me to explain a little about how node.js works.

Node works by processing (internal) events in an *event loop* so, when an HTTP request is received, node places an *event* on its internal event queue. 
The includes all kinds of information, including the URL that the HTTP request was received on, and the fact that an `HTTP GET` was received.

When this event is picked up by the the node event processing loop, it examines the event, and determines which function it needs to call to process that event.
(Successive calls to `app.get(path, function)` effectively build up a table of different functions to call when `HTTP GET` is received for different URLs).

The subtlety is that each of the functions registered in this program *fully* process that event, and removes it from the queue. 
Since node never does *anything* if it doesn't have more events to process, then even if two functions are registered against the same URL, 
only the first to be invoked will actually be executed. 

Finally: it's not too surprising that, if two functions are registered with paths that match, the first registered wins: 
You can test this out by moving the last `app.get(...)` clause above the other two, and watching what happens.


### Where am I?
One important point to understand about running code in Bluemix is that you can't predict either the IP address or port that your HTTP server is running on.
This is a fairly important thing for node.js runtime to know! Luckily, this kind of *environment* 
information is contained in an environment variable set by the Bluemix runtime;

    var port = (process.env.VCAP_APP_PORT || 3000);
    var host = (process.env.VCAP_APP_HOST || 'localhost');

Notice that, if the environment does *not* set the values, our little server is listening on 

### ...and what can I hear?
To cap it off, a single line of code actually causes the HTTP server to actually start listening for requests - 
on the IP address and Port specified by the environment.

	// listen on the specified IP and Port
	app.listen(port,ip); // listen on the IP address and port
	
## Now add your own!
You can add to the application in any way you like - but one thing you might like to try is simply to add a new language.

Happy coding!

# manifest.yml line by line

The first few lines effectively state the base URL of your node.js server.
** Please note** that in order to avoid clashed with other people playing with this application, you **must replace the hostname**
with something reasonably unique;


	applications:
		- host: you_MUST_create_your_own_name
  		domain: ng.bluemix.net
  

The resulting URL for the application will be **you_MUST_create_your_own_name**`.ng.bluemix.net`

With luck, the rest of the file is sufficiently well commented to be self explanatory.

  
	# the name of the application that you will see if you type 'cf apps'
	name: BonjourLeMondeApp
	# look for the files to 'push' in the current directory
	path: .
	# run this command to initiate the application
	command: node server.js
	# create 1 server instance
	instances: 1
  

# package.json line by line

Again, I am hoping that this is more or less self explanatory. One key thing to note is that our code has a dependency
on `express.js`, a very useful little module that helps making the creation of a simple web server very simple to do.

	{
  		"name": "BonjourLeMonde",
  		"description": "Very simple node.js server using Express",
  		"version": "0.0.1",
  		"private": true,
  		"dependencies": {
    		"express": "3.x"
  		}	
	}
	
	