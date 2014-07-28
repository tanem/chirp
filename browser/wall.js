/** @jsx React.DOM */
var React = require('react');
var Avatar = require('./avatar');

module.exports = React.createClass({

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
      <div className="wall" style={this.state.wallStyles}>
        {this.props.tweets.map(function(tweet){
          return (
            <Avatar key={tweet.id} profileImage={tweet.profileImage} />
          );
        })}
      </div>
    );
  }
});