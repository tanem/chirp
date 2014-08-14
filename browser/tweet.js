/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  
  propTypes: {
    profileImage: React.PropTypes.string,
    fullName: React.PropTypes.string,
    screenName: React.PropTypes.string,
    text: React.PropTypes.string,
    tweetStyles: React.PropTypes.object,
    didUpdate: React.PropTypes.func
  },
  
  componentDidUpdate: function(){
    this.props.didUpdate(this);
  },

  render: function(){
    return (
      <section className="tweet" style={this.props.tweetStyles}>
        <img className="tweet-avatar" src={this.props.profileImage} height="48" width="48" />
        <div className="tweet-heading-text">
          <h1 className="tweet-full-name">{this.props.fullName}</h1>
          <h2 className="tweet-screen-name">@{this.props.screenName}</h2>
        </div>
        <p className="tweet-text">{this.props.text}</p>
      </section>
    );
  }

});
