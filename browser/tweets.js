/** @jsx React.DOM */
var React = require('react');
var Text = require('./text');
var Avatar = require('./avatar');
var Name = require('./name');

module.exports = React.createClass({
  render: function() {
    var tweetNodes = this.props.tweets.map(function(tweet){
      return (
        <li key={tweet.id}>
          <Avatar avatar={tweet.avatar} />
          <Name name={tweet.name} />
          <Text text={tweet.text} />
        </li>
      );
    });
    return (
      <ul>{tweetNodes}</ul>
    );
  }
});