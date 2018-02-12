function getTestCases() {
	const INT_LIMIT = 200000;
	const INTERATIONS = 10;
	const ARG_SET_SIZE = 10
	function rand() {
		return Math.floor(Math.random() * INT_LIMIT)
	}
	var ret = [
		[0,0,0,0,0,0,0]
	]
	console.log(200000 * 200000)
	for (var i=0; i<INTERATIONS; i++) {
		var e = [];
		for (var j=0; j < ARG_SET_SIZE; j++) {
			e.push(rand())
		}
		ret.push(e)
	}
	return ret
}
