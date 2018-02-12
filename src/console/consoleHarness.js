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
