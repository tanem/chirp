var http = require('http');
var path = require('path');
var fs = require('fs');
var shoe = require('shoe');
var Stweam = require('stweam');
var habitat = require('habitat');
var ecstatic = require('ecstatic');

var argv = require('yargs')
  .demand('track')
  .describe('track', 'Set the phrases that will determine what is delivered from Twitter')
  .argv;

var env = habitat.load(path.join(__dirname, '../.env'));

var server = http.createServer(
  ecstatic({ root: path.join(__dirname, '../static') })    
).listen(3000);

console.log('chirp listening on port 3000');

var twitter = new Stweam({
  consumerKey: env.get('chirpConsumerKey'),
  consumerSecret: env.get('chirpConsumerSecret'),
  token: env.get('chirpToken'),
  tokenSecret: env.get('chirpTokenSecret')
});

twitter.on('info', function(msg){
  console.log(msg);
});

twitter
  .track(argv.track)
  .start();

var sock = shoe(function(stream){
  twitter.pipe(stream);
});

sock.install(server, '/tweets');
