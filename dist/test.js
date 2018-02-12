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

function runCases(argSets, implementations, showAllResults) {
	return argSets.map(argSet => {
		return implementations.map(i => Object.assign({}, i, {
			argSet: argSet,
			results: i.f(argSet)
		}))
	}).filter(decoratedImplementations => {
		return showAllResults || decoratedImplementations.reduce((foundIssues, e, i, arr) => {
			if (foundIssues) return foundIssues;
			else if (i == 0) return foundIssues;
			else if (e.results != arr[0].results) return true
			else return foundIssues;
		})
	}).map(decoratedImplementations => {
		var ret = {
			argSet: decoratedImplementations[0].argSet,
		}
		decoratedImplementations.forEach(i => {
			ret[i.name] = i.results
		})
		return ret;
	})
}

console.log(runCases(getTestCases(), [{
	name: "main",
	f: main
}].concat(getAlternatives())))

function main(args) {
	const findMax = arr => arr.reduce((agg, e, i) => {
		if (null == agg.max) {
			return {max: e, i: i}
		} else {
			if (e > agg.max) {
				return {max: e, i: i}
			} else return agg
		}
	}, {
		max: null,
		i: null
	})
	const firstMax = findMax(args)
	const secondMax = findMax(args.filter((e, i) => i != firstMax.i))
	return firstMax.max * secondMax.max
}

function getTestCases() {
	return [
		[1,2,3],
		[2,3,4,9,5,9,1]
	]
}
