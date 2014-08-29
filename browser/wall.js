/** @jsx React.DOM */

var React = require('react');
var Avatar = require('./avatar');
var Tweet = require('./tweet');
var random = require('rnd');

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

  componentDidUpdate: function(){
    this.startAutoDisplay();
  },

  tweetDidUpdate: function(tweet){

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

  // As soon as the app isn't idle, stop the auto-display.
  mouseMoveHandler: function(){
    clearTimeout(this.autoDisplayIntervalId);
    this.autoDisplayIntervalId = null;
    this.setState({
      tweetIndexToShow: -1,
      tweetIsVisible: false
    });
  },

  // Show random avatars/Tweets every 10s.
  startAutoDisplay: function(){
    if (!this.autoDisplayIntervalId) {
      this.autoDisplayIntervalId = setInterval(function(){
        this.setState({ tweetIndexToShow: random(this.props.tweets.length) });
      }.bind(this), 10000);
    }
  },

  avatarMouseOverAction: function(avatar, showTweetImmediately){

    if (this.activeAvatarKey !== avatar.props.key) {
      
      // Hide immediately.
      this.setState({
        tweetIsVisible: false
      });

      // Clear any pending timeouts.
      clearTimeout(this.displayTweetTimeoutId);

      // Kick off a display tweet timeout.
      // Moving within the current avatar won't affect the timer.
      this.displayTweetTimeoutId = setTimeout(function(){
        this.setState({
          tweetWillShow: true,
          tweetFullName: avatar.props.fullName,
          tweetScreenName: avatar.props.screenName,
          tweetText: avatar.props.text,
          tweetProfileImage: avatar.props.profileImage,
          avatarRect: avatar.getDOMNode().getBoundingClientRect()
        });
      }.bind(this), showTweetImmediately ? 0 : 1000);
    }

    // Ensure the currently active avatar is kept up to date.
    this.activeAvatarKey = avatar.props.key;

  },

  getTweetPosition: function(avatarRect, tweetRect){

    var result = {};
    var buffer = 15;

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
      <div className="wall" style={this.props.wallStyles} onMouseMove={this.mouseMoveHandler}>
        {this.props.tweets.map(function(tweet, i){
          return (
            <Avatar
              isDisplayed={i === this.state.tweetIndexToShow}
              key={tweet.id}
              profileImage={tweet.profileImage}
              fullName={tweet.fullName}
              screenName={tweet.screenName}
              text={tweet.text}
              mouseOverAction={this.avatarMouseOverAction}
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
          didUpdate={this.tweetDidUpdate}
        />
      </div>
    );

  }

});
