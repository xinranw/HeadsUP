var express = require('express');   // use the express package
var app = express();                // construct an application
var secrets = require('./secrets');

var accountSid = secrets.accountSid;
var authToken = secrets.authToken; 

//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 

// specify what to do when http GET is received on http://<host>:<port>/english
app.get('/english', function(req,res){
  res.send("Hello world, from England.");
}
);  

app.get('/text', function(req, res){
  var number = req.param('number');
  var messageBody = req.param('messageBody');
  client.messages.create({ 
    to: number, 
    from: "+14846854868", 
    body: messageBody
  }, function(err, message) { 
    console.log(err);
    console.log(message); 
    return;
  });
});

// specify what to do when http GET is received for any other URL
app.get(/^(.*)$/, function(req,res){
 res.send("Eh?") ;
});

// extract the host address and port that has been set by the environment
// Default to localhost:3000 when running locally
var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');

// listen on the specified IP and Port
app.listen(port,host); // listen on the IP host and port 
