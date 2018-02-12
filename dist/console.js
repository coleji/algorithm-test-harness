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
		console.log(main(args.map(i => parseInt(i))))
		process.exit()
	}
	lineNumber++
}

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
