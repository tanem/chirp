var stream = require('stream');

module.exports = function(el){
  return new Renderer(el);
};

function Renderer(el) {
  stream.Writable.call(this, { objectMode: true });
  this._el = el;
}

Renderer.prototype = Object.create(stream.Writable.prototype);

Renderer.prototype._write = function(chunk, encoding, done){
  this._el.textContent = chunk.text;
  done();
};