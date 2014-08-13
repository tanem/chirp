var shoe = require('shoe');
var split = require('transform-split');
var parse = require('transform-parse');
var clump = require('transform-clump');
var render = require('./render');

function debounce(fn, delay) {
  var id;
  return function(){
    clearTimeout(id);
    id = setTimeout(fn, delay);
  };
}

var numColumns;
var numRows;
var wallStyles;

function windowResizeHandler() {
  numColumns = Math.ceil(window.innerWidth / 48);
  numRows = Math.ceil(window.innerHeight / 48);
  wallStyles = {
    height: numRows * 48,
    width: numColumns * 48
  };
}

window.addEventListener('resize', debounce(windowResizeHandler, 1000));
windowResizeHandler();

// TODO: Unpipe/repipe streams with new info when window is resized?

var socketStream = shoe('/tweets');
socketStream
  .pipe(split('\r\n'))
  .pipe(parse())
  .pipe(clump(numColumns * numRows))
  .pipe(render(wallStyles));
