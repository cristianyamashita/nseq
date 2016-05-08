var nseq = require('nseq');

var n = new nseq({});
n.add([
	function(self) {
		console.log("Func 1");
		self.next();
	},
	function(self) {
		console.log("Func 2");
		self.next();
	},
	function(self) {
		console.log("Func 3");
		self.next();
	},
	function(self) {
		console.log("Func 4");
		self.next();
	},
	function(self) {
		console.log("Func 5");
		self.next();
	}
]);
n.end = function() {
	console.log("Done");
}
n.do();