/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  render: function() {
    var tweetNodes = this.props.tweets.map(function(tweet){
      return (
        <li key={tweet.id}>
          <img src={tweet.profileImage} height="48" width="48" />
          <span>{tweet.fullName}</span>
          <span>@{tweet.screenName}</span>
          <span>{tweet.text}</span>
        </li>
      );
    });
    return (
      <ul>{tweetNodes}</ul>
    );
  }
});