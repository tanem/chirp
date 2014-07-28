/** @jsx React.DOM */
var React = require('react');
var stream = require('stream');
var Wall = require('./wall');

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
    profileImage: chunk.user.profile_image_url,
    fullName: chunk.user.name,
    screenName: chunk.user.screen_name
  });
  React.renderComponent(<Wall tweets={this._tweets} />, document.querySelector('body'));
  done();
};