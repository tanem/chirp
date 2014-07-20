/** @jsx React.DOM */
var React = require('react');
var stream = require('stream');
var Tweet = require('./tweet');

module.exports = function(el){
  return new Renderer(el);
};

function Renderer(el) {
  stream.Writable.call(this, { objectMode: true });
  this._el = el;
}

Renderer.prototype = Object.create(stream.Writable.prototype);

Renderer.prototype._write = function(chunk, encoding, done){
  React.renderComponent(<Tweet tweetText={chunk.text} />, this._el);
  done();
};