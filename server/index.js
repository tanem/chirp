var http = require('http');
var path = require('path');
var fs = require('fs');
var shoe = require('shoe');
var Stweam = require('stweam');
var habitat = require('habitat');

var argv = require('yargs')
  .demand('track')
  .describe('track', 'Set the phrases that will determine what is delivered from Twitter')
  .argv;

var env = habitat.load(path.join(__dirname, '../.env'));

var server = http.createServer(function(req, res){
  if ('/' === req.url) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Charset', 'utf-8');
    fs.createReadStream('static/index.html').pipe(res);
  } else if ('/bundle.js' === req.url) {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Charset', 'utf-8');
    fs.createReadStream('static/bundle.js').pipe(res);
  } else {
    res.statusCode = 404;
    res.end('File not found');
  }
});

server.listen(3000);
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