/** @jsx React.DOM */
var React = require('react');
var stream = require('stream');
var Wall = require('./wall');

module.exports = function(wallStyles){
  return new Render(wallStyles);
};

function Render(wallStyles) {
  stream.Writable.call(this, { objectMode: true });
  this._tweets = [];
  this._wallStyles = wallStyles;
}

Render.prototype = Object.create(stream.Writable.prototype);

Render.prototype._write = function(clump, encoding, done){
  this._tweets = clump.map(function(tweet){
    return {
      id: tweet.id_str,
      text: tweet.text,
      profileImage: tweet.user.profile_image_url,
      fullName: tweet.user.name,
      screenName: tweet.user.screen_name
    };
  });
  React.renderComponent(
    <Wall wallStyles={this._wallStyles} tweets={this._tweets} />,
    document.querySelector('.wall-wrapper')
  );
  done();
};
