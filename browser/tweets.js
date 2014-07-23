/** @jsx React.DOM */
var React = require('react');
var Text = require('./text');

module.exports = React.createClass({
  render: function() {
    var tweetNodes = this.props.tweets.map(function(tweet){
      return <Text key={tweet.id} text={tweet.text} />;
    });
    return (
      <ul>{tweetNodes}</ul>
    );
  }
});