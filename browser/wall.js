/** @jsx React.DOM */
var React = require('react');
var Avatar = require('./avatar');
var Tweet = require('./tweet');

module.exports = React.createClass({

  propTypes: {
    tweets: React.PropTypes.array,
    wallStyles: React.PropTypes.object
  },

  getInitialState: function(){
    return {
      tweetIsVisible: false,
      tweetFullName: '',
      tweetScreenName: '',
      tweetText: '',
      tweetProfileImage: '',
      avatarRect: {} 
    };
  },

  avatarMouseOverHandler: function(avatar){

    if (this.activeAvatarKey !== avatar.props.key) {
      
      // Hide the tweet immediately.
      this.setState({
        tweetIsVisible: false
      });

      // Clear any pending timeouts.
      clearTimeout(this.timeoutId);

      // Kick off a display tweet timeout.
      // Moving within the current avatar won't affect the timer.
      this.timeoutId = setTimeout(function(){
        
        // Render but keep invisible.
        this.setState({
          tweetFullName: avatar.props.fullName,
          tweetScreenName: avatar.props.screenName,
          tweetText: avatar.props.text,
          tweetProfileImage: avatar.props.profileImage
        });

        // Get dims.
        var tweetRect = this.refs.tweet.getDOMNode().getBoundingClientRect();
        var avatarRect = avatar.getDOMNode().getBoundingClientRect();

        // Show tweet.
        this.setState({
          tweetIsVisible: true,
          tweetRect: tweetRect,
          avatarRect: avatarRect
        });

      }.bind(this), 1000);
    }

    // Ensure the currently active avatar is kept up to date.
    this.activeAvatarKey = avatar.props.key;

  },

  getTweetPosition: function(avatarRect, tweetRect){

    var result = {};
    var buffer = 10;

    if (avatarRect.bottom + buffer + tweetRect.height <= window.innerHeight - buffer) {
      result.top = avatarRect.bottom + buffer;
    } else {
      result.top = avatarRect.top - buffer - tweetRect.height;
    }

    if (avatarRect.left + avatarRect.width / 2 - tweetRect.width / 2 < buffer) {
      result.left = buffer;
    } else {
      result.left = avatarRect.left + avatarRect.width / 2 - tweetRect.width / 2;
    }

    // TODO: Fix right hand position.
    if (tweetRect.right > (window.innerWidth - buffer)) {
      result.left -= tweetRect.right - (window.innerWidth - buffer);
    }

    return result;

  },

  render: function(){
    
    var tweetPosition = {};

    if (this.state.avatarRect && this.state.tweetRect) {
      tweetPosition = this.getTweetPosition(this.state.avatarRect, this.state.tweetRect);
    }

    // TODO: Animations.
    var tweetStyles = {
      visibility: this.state.tweetIsVisible ? 'visible' : 'hidden',
      top: tweetPosition.top || 0,
      left: tweetPosition.left || 0
    };

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
        <Tweet
          ref='tweet'
          tweetStyles={tweetStyles}
          fullName={this.state.tweetFullName}
          screenName={this.state.tweetScreenName}
          text={this.state.tweetText}
          profileImage={this.state.tweetProfileImage}
        />
      </div>
    );

  }

});
