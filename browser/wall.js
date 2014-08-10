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
      tweetFullName: '',
      tweetScreenName: '',
      tweetText: '',
      tweetProfileImage: ''
    };
  },

  tweetDidUpdateHandler: function(tweet){

    // At this point the tweet has been rendered to the DOM
    // but is still invisible. In this state we can grab it's
    // dimensions so it can be positioned correctly.
    if (this.state.tweetWillShow) {
      this.setState({
        tweetWillShow: false,
        tweetIsVisible: true,
        tweetRect: tweet.getDOMNode().getBoundingClientRect()
      });
    }
  },

  avatarMouseOverHandler: function(avatar){

    if (this.activeAvatarKey !== avatar.props.key) {
      
      // Hide immediately.
      this.setState({
        tweetIsVisible: false
      });

      // Clear any pending timeouts.
      clearTimeout(this.timeoutId);

      // Kick off a display tweet timeout.
      // Moving within the current avatar won't affect the timer.
      this.timeoutId = setTimeout(function(){
        this.setState({
          tweetWillShow: true,
          tweetFullName: avatar.props.fullName,
          tweetScreenName: avatar.props.screenName,
          tweetText: avatar.props.text,
          tweetProfileImage: avatar.props.profileImage,
          avatarRect: avatar.getDOMNode().getBoundingClientRect()
        });
      }.bind(this), 1000);
    }

    // Ensure the currently active avatar is kept up to date.
    this.activeAvatarKey = avatar.props.key;

  },

  getTweetPosition: function(avatarRect, tweetRect){

    var result = {};
    var buffer = 10;

    // First up, try positioning the tweet below the avatar.
    // If there is no room, position above.
    if (avatarRect.bottom + buffer + tweetRect.height <= window.innerHeight - buffer) {
      result.top = avatarRect.bottom + buffer;
    } else {
      result.top = avatarRect.top - buffer - tweetRect.height;
    }

    // If there is left overflow, reposition to the buffer size.
    // Otherwise horizontally center it wrt the avatar.
    if (avatarRect.left + avatarRect.width / 2 - tweetRect.width / 2 < buffer) {
      result.left = buffer;
    } else {
      result.left = avatarRect.left + avatarRect.width / 2 - tweetRect.width / 2;
    }

    // If there is right overflow, reposition to the right buffer.
    if (result.left + tweetRect.width > window.innerWidth - buffer) {
      result.left -= result.left + tweetRect.width - (window.innerWidth - buffer);
    }

    return result;

  },

  render: function(){
    
    var tweetStyles = {};

    // If the tweet should be shown, then update the position.
    if (this.state.tweetIsVisible) {
      var tweetPosition = this.getTweetPosition(this.state.avatarRect, this.state.tweetRect);
      tweetStyles = {
        top: tweetPosition.top || 0,
        left: tweetPosition.left || 0
      };
    }

    // TODO: Animations?
    tweetStyles.visibility = this.state.tweetIsVisible ? 'visible' : 'hidden';

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
          didUpdateHandler={this.tweetDidUpdateHandler}
        />
      </div>
    );

  }

});
