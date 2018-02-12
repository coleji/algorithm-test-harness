function getAlternatives() {
	const naive = (args) => {
		var ret = args[0] * args[1]
		for (var i=0; i<args.length; i++) {
			for (j=i+1; j<args.length; j++) {
				if (args[i] * args[j] > ret) ret = args[i] * args[j]
			}
		}
		return ret;
	}

	const imperative = args => {
		if (args[0] > args[1]) {
			var firstMax = args[0]
			var secondMax = args[1]
		} else {
			var firstMax = args[1]
			var secondMax = args[0]
		}
		for (var i=2; i<args.length; i++) {
			if (args[i] > firstMax) {
				secondMax = firstMax
				firstMax = args[i]
			} else if (args[i] > secondMax) {
				secondMax = args[i]
			}
		}
		return firstMax * secondMax
	}

	const functional = (args) => {
		const findMax = arr => arr.reduce((agg, e, i, a) => {
			if (e > agg.max) {
				return {max: e, i: i}
			} else return agg
		}, {
			max: arr[0],
			i: 0
		})

		const firstMax = findMax(args)
		const secondMax = findMax(args.filter((e, i) => {
			return i != firstMax.i
		}))
		return firstMax.max * secondMax.max
	}
	return [/*{
		name: "naive",
		f: naive
	}, */{
		name: "functional",
		f: functional
	}]
}
