// Generated by CoffeeScript 1.10.0
var nseq,
  slice = [].slice;

nseq = (function() {
  function nseq(options) {
    var i;
    if (options == null) {
      options = {};
    }
    this._pos = 0;
    this._arr = [];
    for (i in options) {
      this[i] = options[i];
    }
  }

  nseq.prototype.add = function(arr) {
    var f, j, len;
    this._pos = 0;
    for (j = 0, len = arr.length; j < len; j++) {
      f = arr[j];
      this._arr.push(f);
    }
    return this;
  };

  nseq.prototype["do"] = function(arr) {
    var f, j, len;
    if (arr == null) {
      arr = [];
    }
    this._pos = 0;
    for (j = 0, len = arr.length; j < len; j++) {
      f = arr[j];
      this._arr.push(f);
    }
    this.next(this);
    return this;
  };


  /*
  	Clone may not work in old versions of NodeJS, work in v5.10.0
   */

  nseq.prototype.clone = function() {
    var temp;
    temp = {};
    Object.assign(temp, {}, this);
    temp = new nseq(temp);
    return temp;
  };

  nseq.prototype.next = function() {
    var rest, self;
    rest = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    self = this;
    if (typeof rest === "object") {
      if (rest[0] !== self) {
        rest.unshift(self);
      }
    }
    if (typeof self._arr[self._pos] !== "undefined") {
      self._arr[self._pos++].apply(self, rest);
    } else if (typeof self.end === "function") {
      self.end.apply(self, rest);
    }
    return this;
  };

  return nseq;

})();

module.exports = nseq;
