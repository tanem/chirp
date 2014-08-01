var shoe = require('shoe');
var split = require('transform-split');
var parse = require('transform-parse');
var clump = require('transform-clump');
var render = require('./render');

var socketStream = shoe('/tweets');

// Hmmmmmmm...
var numColumns = Math.ceil(window.innerWidth / 48);
var numRows = Math.ceil(window.innerHeight / 48);
var wallStyles = {
  height: numRows * 48,
  width: numColumns * 48
};

socketStream
  .pipe(split('\r\n'))
  .pipe(parse())
  .pipe(clump(numColumns * numRows))
  .pipe(render(wallStyles));
