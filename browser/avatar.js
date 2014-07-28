/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <img src={this.props.profileImage} height="48" width="48" />
    );
  }
});