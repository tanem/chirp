/** @jsx React.DOM */
var React = require('react');
var Avatar = require('./avatar');
var Tweet = require('./tweet');

module.exports = React.createClass({

  propTypes: {
    tweets: React.PropTypes.array,
    wallStyles: React.PropTypes.object
  },

  avatarMouseOverHandler: function(avatar){
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(function(){
      var clientRect = avatar.getDOMNode().getBoundingClientRect();
      var tweetStyles = {
        top: clientRect.top + 10,
        left: clientRect.right + 10
      };
      React.renderComponent(
        <Tweet
          tweetStyles={tweetStyles} 
          fullName={avatar.props.fullName}
          screenName={avatar.props.screenName}
          text={avatar.props.text}
          profileImage={avatar.props.profileImage}
        />,
        document.querySelector('.tweet-wrapper')
      );
    }, 500);
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
              mouseOverHandler={this.avatarMouseOverHandler}
            />
          );
        }, this)}
      </div>
    );
  }

});
