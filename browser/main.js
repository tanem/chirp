var shoe = require('shoe');
var split = require('transform-split');
var parse = require('transform-parse');
var render = require('./render');

var socketStream = shoe('/tweets');

socketStream
  .pipe(split('\r\n'))
  .pipe(parse())
  .pipe(render());