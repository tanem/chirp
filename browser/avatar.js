/** @jsx React.DOM */
var React = require('react');
var Tweet = require('./tweet');

module.exports = React.createClass({
  
  propTypes: {
    profileImage: React.PropTypes.string
  },

  handleMouseOver: function(){
    React.renderComponent(
      <Tweet fullName={this.props.fullName} screenName={this.props.screenName} text={this.props.text} />,
      document.querySelector('.tweet')
    );
  },

  render: function() {
    return (
      <img src={this.props.profileImage} height="48" width="48" onMouseOver={this.handleMouseOver} />
    );
  }

});