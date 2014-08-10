/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  
  propTypes: {
    profileImage: React.PropTypes.string,
    mouseOverAction: React.PropTypes.func
  },

  mouseOverAction: function(){
    this.props.mouseOverAction(this);
  },

  render: function() {
    return (
      <img
        className="avatar"
        src={this.props.profileImage}
        height="48"
        width="48"
        onMouseOver={this.mouseOverAction}
      />
    );
  }

});
