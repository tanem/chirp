/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  
  propTypes: {
    fullName: React.PropTypes.string,
    screenName: React.PropTypes.string,
    text: React.PropTypes.string
  },

  render: function() {
    return (
      <div>
        <span className="tweet-full-name">{this.props.fullName}</span>
        <span className="tweet-screen-name">{this.props.screenName}</span>
        { /* Twitter bird */ }
        <p className="tweet-text">{this.props.text}</p>
      </div>
    );
  }

});