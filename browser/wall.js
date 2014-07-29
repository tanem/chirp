/** @jsx React.DOM */
var React = require('react');
var Avatar = require('./avatar');

module.exports = React.createClass({

  propTypes: {
    tweets: React.PropTypes.array
  },

  getInitialState: function(){
    var numColumns = Math.ceil(window.innerWidth / 48);
    var numRows = Math.ceil(window.innerHeight / 48);
    return {
      wallStyles: {
        height: numRows * 48,
        width: numColumns * 48
      }
    };
  },

  render: function() {
    return (
      <div style={this.state.wallStyles}>
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