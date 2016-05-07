var nseq = require('../index.js');

function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message;
    }
}

s = new nseq({"test_val":1});
s.add([
	function (self) {
		console.log("func 1");
		setTimeout(function(){
			self.next(self.test_val);
		},100);
		
	},
	function (self,v) {

		console.log("func 2" , v);
		v = v + 1
		
		setTimeout(function(){
			self.next(v);		
		},100);
	},
	function (self,v) {
		console.log("func 3",v);
		v =  v + 1;
		setTimeout(function(){
			setTimeout(function(){
				setTimeout(function(){
					self.next(self,v);		
				},100);
			},100);
		},100);
	},
	function (self,v) {
		console.log("func 4",v);

		s2 = new nseq({"test_val":200});
		s2.add([
			function (self2) {
				console.log("func BBB 1");
				setTimeout(function(){
					self2.next(self2.test_val);
				},100);
			},
			function (self2,v2) {
				console.log("func BBB 2" , v2);
				v2 = v2 + 1
				setTimeout(function(){
					self2.next(v2);		
				},100);
			},
			function (self2,v2) {
				console.log("func BBB 3",v2);
				v2 =  v2 + 1;
				setTimeout(function(){
					setTimeout(function(){
						setTimeout(function(){
							self2.next(self2,v2);		
						},100);
					},100);
				},100);
			},
			function (self2,v2) {
				console.log("func BBB 4",v2);
				setTimeout(function(){
					self2.next(v2 + 1);		
				},100);
			},function (self2,v2) {
				console.log("func BBB 5",v2);

				assert(v2 == 203,"Internal test failed");
				setTimeout(function(){
					self2.next();
					self.next(v + 1);		
				},100);
			}
		]);
		s2.do();

	},function (self,v) {
		assert(v == 4,"Internal test failed");
		console.log("func 5",v);
		setTimeout(function(){
			self.next();		
		},100);
	}
]);
s.do();