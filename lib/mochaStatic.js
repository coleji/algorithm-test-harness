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
