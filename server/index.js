var http = require('http');
var path = require('path');
var fs = require('fs');
var shoe = require('shoe');
var Stweam = require('stweam');
var habitat = require('habitat');
var ecstatic = require('ecstatic');

// Helpful info on the command line.
var argv = require('yargs')
  .demand('track')
  .describe('track', 'Set the phrases that will determine what is delivered from Twitter')
  .default('port', 3000)
  .describe('port', 'Set the port the server will bind to')
  .argv;

// Start the server.
var server = http.createServer(
  ecstatic({ root: path.join(__dirname, '../static') })    
).listen(argv.port, function(){
  var address = server.address();
  console.log('chirp listening at http://%s:%d/', address.address, address.port);
});

// Load the environment variables.
var env = habitat.load(path.join(__dirname, '../.env'));

// Connect to Twitter.
var twitter = new Stweam({
  consumerKey: env.get('chirpConsumerKey'),
  consumerSecret: env.get('chirpConsumerSecret'),
  token: env.get('chirpToken'),
  tokenSecret: env.get('chirpTokenSecret')
});

// Output log messages from the Stweam module.
twitter.on('info', function(msg){
  console.log(msg);
});

// Make the connection to Twitter's public stream.
twitter
  .track(argv.track)
  .start();

// Stream the Twitter response over the connected browser stream.
var sock = shoe(function(stream){
  twitter.pipe(stream);
});

// Bind the shoe instance to to the server.
sock.install(server, '/tweets');
