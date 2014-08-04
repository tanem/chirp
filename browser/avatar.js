/** @jsx React.DOM */
var React = require('react');
var Tweet = require('./tweet');

module.exports = React.createClass({
  
  propTypes: {
    profileImage: React.PropTypes.string
  },

  handleMouseOver: function(){
    var clientRect = this.getDOMNode().getBoundingClientRect();
    var tweetStyles = {
      top: clientRect.top + 10,
      left: clientRect.right + 10
    };
    React.renderComponent(
      <Tweet
        tweetStyles={tweetStyles} 
        fullName={this.props.fullName}
        screenName={this.props.screenName}
        text={this.props.text}
        profileImage={this.props.profileImage}
      />,
      document.querySelector('.tweet-wrapper')
    );
  },

  render: function() {
    return (
      <img className="avatar" src={this.props.profileImage} height="48" width="48" onMouseOver={this.handleMouseOver} />
    );
  }

});
