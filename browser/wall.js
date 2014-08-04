/** @jsx React.DOM */
var React = require('react');
var Avatar = require('./avatar');

module.exports = React.createClass({

  propTypes: {
    tweets: React.PropTypes.array,
    wallStyles: React.PropTypes.object
  },

  render: function() {
    return (
      <div className="wall" style={this.props.wallStyles}>
        {this.props.tweets.map(function(tweet){
          return (
            <Avatar
              key={tweet.id}
              profileImage={tweet.profileImage}
              fullName={tweet.fullName}
              screenName={tweet.screenName}
              text={tweet.text}
            />
          );
        })}
      </div>
    );
  }

});
