var readline = require('readline');

process.stdin.setEncoding('utf8');

var rl = readline.createInterface({
	input: process.stdin,
	terminal: false
});

rl.on('line', readLine);

var lineNumber = 0

function readLine(line) {
	if (line !== "\n") {
		var args = line.toString().split(' ')
	}
	if (lineNumber == 0) {
		var ints = args
	} else if (lineNumber == 1) {
		console.log(main(args))
		process.exit()
	}
	lineNumber++
}

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
