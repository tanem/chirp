/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  
  propTypes: {
    profileImage: React.PropTypes.string,
    mouseOverAction: React.PropTypes.func
  },

  componentDidUpdate: function(){
    if (this.props.isDisplayed) {
      this.props.mouseOverAction(this, true);
    }
  },

  mouseOverAction: function(){
    this.props.mouseOverAction(this);
  },

  render: function() {
    var classString = 'avatar';
    if (this.props.isDisplayed) classString += ' avatar-hover';
    return (
      <img
        className={classString}
        src={this.props.profileImage}
        height="48"
        width="48"
        onMouseOver={this.mouseOverAction}
      />
    );
  }

});
