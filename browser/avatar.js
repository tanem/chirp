/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  
  propTypes: {
    profileImage: React.PropTypes.string,
    mouseOverHandler: React.PropTypes.func
  },

  mouseOverHandler: function(){
    this.props.mouseOverHandler(this);
  },

  render: function() {
    return (
      <img
        className="avatar"
        src={this.props.profileImage}
        height="48"
        width="48"
        onMouseOver={this.mouseOverHandler}
      />
    );
  }

});
