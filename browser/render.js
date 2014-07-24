/** @jsx React.DOM */
var React = require('react');
var stream = require('stream');
var Tweets = require('./tweets');

module.exports = function(){
  return new Render();
};

function Render(el) {
  stream.Writable.call(this, { objectMode: true });
  this._tweets = [];
  this._el = el;
}

Render.prototype = Object.create(stream.Writable.prototype);

Render.prototype._write = function(chunk, encoding, done){
  this._tweets.push({
    id: chunk.id_str,
    text: chunk.text,
    avatar: chunk.user.profile_image_url,
    name: chunk.user.name
  });
  React.renderComponent(<Tweets tweets={this._tweets} />, document.querySelector('body'));
  done();
};