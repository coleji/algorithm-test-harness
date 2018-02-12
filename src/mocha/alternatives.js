function getAlternatives() {
	const naive = (args) => {
		var ret = null
		for (var i=0; i<args.length; i++) {
			for (j=i+1; j<args.length; j++) {
				if (ret == null || args[i] * args[j] > ret) ret = args[i] * args[j]
			}
		}
		return ret;
	}
	return [{
		name: "naive",
		f: naive
	}]
}
