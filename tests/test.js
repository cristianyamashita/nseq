var nseq = require('../index.js');
var assert = require('assert');




describe("nseq usage", function() {

	it("simple sequence request", function(done) {
		var s = new nseq({
			val: 100
		});
		s.end = function(val) {
			assert.equal(200, val);
			done();
		};
		s.add([
			function(self) {
				self.next(self.val + 50);
			},
			function(self, val) {
				self.next(val + 50);
			},
			function(self, val) {
				self.end(val);
			}
		])
		s.do();
	});

	it("sequence request time call back", function(done) {
		var s = new nseq({
			val: 100
		});
		s.end = function(val) {
			assert.equal(200, val);
			done();
		};
		s.add([
			function(self) {
				setTimeout(function() {
					self.next(self.val + 50);
				}, 10)
			},
			function(self, val) {
				setTimeout(function() {
					self.next(val + 50);
				}, 10)
			},
			function(self, val) {
				setTimeout(function() {
					self.end(val);
				}, 10)
			}
		])
		s.do();
	});


	it("deep sequence", function(done) {
		var s = new nseq({
			"val": 1
		});
		s.add([
			function(self) {
				setTimeout(function() {
					self.next(self.val);
				}, 1);
			},
			function(self, v) {
				v = v + 1
				setTimeout(function() {
					self.next(v);
				}, 1);
			},
			function(self, v) {
				v = v + 1;
				setTimeout(function() {
					setTimeout(function() {
						setTimeout(function() {
							self.next(self, v);
						}, 1);
					}, 1);
				}, 1);
			},
			function(self, v) {
				s2 = new nseq({
					"val": v + 1
				});
				s2.add([
					function(self2) {
						setTimeout(function() {
							self2.next(self2.val);
						}, 1);
					},
					function(self2, v2) {
						v2 = v2 + 1
						setTimeout(function() {
							self2.next(v2);
						}, 1);
					},
					function(self2, v2) {
						v2 = v2 + 1;
						setTimeout(function() {
							setTimeout(function() {
								setTimeout(function() {
									self2.next(self2, v2);
								}, 1);
							}, 1);
						}, 1);
					},
					function(self2, v2) {
						setTimeout(function() {
							self2.next(v2 + 1);
						}, 1);
					},
					function(self2, v2) {
						setTimeout(function() {
							self2.next();
							self.next(v2 + 1);
						}, 1);
					}
				]);
				s2.do();
			},
			function(self, v) {
				assert.equal(8, v);
				done();
			}
		]);
		s.do();
	});

	describe.skip('not yet implemented', function() {

		it("send argument at go, and receive at first step");

		it("receive self at the end");

		it("send .end(cb) instead of .end=, or both");

		it("clone sequence with assert", function(done) {
			var s = new nseq({
				val: 100
			});
			s.end = function(val) {
				assert.equal(200, val);
				setTimeout(done, 100);
			};
			s.add([
				function(self) {
					setTimeout(function() {
						self.next(self.val + 50);
					}, 10)
				},
				function(self, val) {
					setTimeout(function() {
						self.next(val + 50);
					}, 10)
				},
				function(self, val) {
					setTimeout(function() {
						self.end(val);
					}, 10)
				}
			])
			s.do();
			var s2 = s.clone();
			s2.val = 90;
			s2.end = function(val) {
				assert.equal(200, val);
			};

		});
	});
});