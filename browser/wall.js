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
      tweetProfileImage: ''
    };
  },

  // TODO: Position it properly!
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
        this.setState({
          tweetIsVisible: true,
          tweetFullName: avatar.props.fullName,
          tweetScreenName: avatar.props.screenName,
          tweetText: avatar.props.text,
          tweetProfileImage: avatar.props.profileImage
        });
      }.bind(this), 1000);
    }

    // Ensure the currently active avatar is kept up to date.
    this.activeAvatarKey = avatar.props.key;

  },

  // Just describe the UI at any point in time and let React take care of the rest :)
  render: function() {
    
    // Could perhaps add a class for animation?
    var tweetStyles = {
      display: this.state.tweetIsVisible ? 'block' : 'none'
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
