/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  getInitialState: function(){
    var numColumns = Math.ceil(window.innerWidth / 48);
    var numRows = Math.ceil(window.innerHeight / 48);
    return {
      containerStyles: {
        height: numRows * 48,
        width: numColumns * 48
      }
    };
  },

  render: function() {
    var tweetNodes = this.props.tweets.map(function(tweet){
      return (
        <img key={tweet.id} src={tweet.profileImage} height="48" width="48" />
        /*
        <li key={tweet.id}>
          <img src={tweet.profileImage} height="48" width="48" />
          <span>{tweet.fullName}</span>
          <span>@{tweet.screenName}</span>
          <span>{tweet.text}</span>
        </li>
        */
      );
    });
    return (
      <div className="container" style={this.state.containerStyles}>
        {tweetNodes}
      </div>
    );
  }
});