var assert = require('assert');

function runCases(argSets, implementations, showAllResults) {
	const results = argSets.map(argSet => {
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
			results: decoratedImplementations.map(i => ({
				name: i.name,
				results: i.results
			}))
		}
		return ret
	})

	results.forEach(r => {
		describe('ArgSet ' + r.argSet, function() {
			r.results.filter((e, i) => i > 0).forEach(e => {
				it('should equal ' + e.name, function() {
					assert.equal(e.results, r.results[0].results);
				});
			})
		});
	})
}

runCases(getTestCases(), [{
	name: "main",
	f: main
}].concat(getAlternatives()))
