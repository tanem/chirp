var shoe = require('shoe');
var split = require('transform-split');
var parse = require('transform-parse');
var renderer = require('./renderer');

var socketStream = shoe('/tweets');

socketStream
  .pipe(split('\r\n'))
  .pipe(parse())
  .pipe(renderer(document.getElementById('tweets')));