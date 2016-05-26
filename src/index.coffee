objectAssign = require('object-assign');
class nseq
	constructor: (options={}) ->
		this._pos = 0
		this._arr = []
		for i of options
			@[i]= options[i]

	add: (arr) ->
		@_pos = 0
		@_arr.push f for f in arr
		@

	do: (arr=[]) ->
		@_pos = 0
		@_arr.push f for f in arr
		@next this
		@
	
	clone: ()-> 
		temp = {}
		#Object.assign temp,{},@
		objectAssign temp,{},@
		temp = new nseq temp
		temp

	next:(rest...)->
		self = @
		if(typeof rest == "object" )
			if rest[0] != self
				rest.unshift self
		if typeof self._arr[self._pos] != "undefined"
			self._arr[self._pos++].apply self,rest
		else if typeof self.end == "function"
			self.end.apply self,rest
		@

module.exports = nseq
