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

function main(args) {
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
