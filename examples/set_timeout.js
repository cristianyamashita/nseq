var nseq = require('nseq');

var n = new nseq({});
n.add([
	function(self) {
		console.log("Func 1 : ", (new Date()).getTime());
		setTimeout(function() {
			self.time = self.time * 2;
			self.next();
		}, self.time);

	},
	function(self) {
		console.log("Func 2 : ", (new Date()).getTime());
		setTimeout(function() {
			self.time = self.time * 2;
			self.next();
		}, self.time);
	},
	function(self) {
		console.log("Func 3 : ", (new Date()).getTime());
		setTimeout(function() {
			self.time = self.time * 2;
			self.next();
		}, self.time);
	},
	function(self) {
		console.log("Func 4 : ", (new Date()).getTime());
		setTimeout(function() {
			self.time = self.time * 2;
			self.next();
		}, self.time);
	},
	function(self) {
		console.log("Func 5 : ", (new Date()).getTime());
		setTimeout(function() {
			self.time = self.time * 2;
			self.next();
		}, self.time);
	}
]);
n.time = 100;
n.end = function() {
	console.log("Done");
}
n.do();