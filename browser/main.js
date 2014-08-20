var Combine = require('stream-combiner');
var shoe = require('shoe');
var split = require('transform-split');
var parse = require('transform-parse');
var clump = require('transform-clump');
var render = require('./render');

// Window dimensions are used to determine how many avatars should be shown.
var numColumns = Math.ceil(window.innerWidth / 48);
var numRows = Math.ceil(window.innerHeight / 48);
var wallStyles = {
  height: numRows * 48,
  width: numColumns * 48
};

// Bind to the server response stream and render it.
var stream = Combine(
  shoe('/tweets'),
  split('\r\n'),
  parse(),
  clump(numColumns * numRows),
  render(wallStyles)
);

// Log any errors from the pipeline.
stream.on('error', console.error.bind(console));