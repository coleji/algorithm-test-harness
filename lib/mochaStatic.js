var assert = require('assert');

function runCases(argSets, implementations, showAllResults) {
	const results = argSets.map(argSet => {
		return implementations.map(i => {
			var start = (new Date()).getTime()
			var results = i.f(argSet)
			var end = (new Date()).getTime()
			console.log(end - start)
			return Object.assign({}, i, {
				argSet: argSet,
				results: results,
				elapsedTime : (end - start)
			})
		})
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
				results: i.results,
				elapsedTime: i.elapsedTime
			}))
		}
		return ret
	})

	results.forEach(r => {
		describe('ArgSet ' + r.argSet, function() {
			r.results.filter((e, i) => i > 0).forEach(e => {
				var timeMsg = (function() {
					var delta = e.elapsedTime - r.results[0].elapsedTime
					if (delta < 0) return delta + "ms slower"
					else if (delta > 0) return delta + "ms faster"
					else return "same time"
				}())
				it('should equal ' + e.name + "(" + timeMsg + ")", function() {
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
