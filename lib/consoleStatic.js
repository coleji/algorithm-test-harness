var readline = require('readline');

process.stdin.setEncoding('utf8');

var rl = readline.createInterface({
	input: process.stdin,
	terminal: false
});

rl.on('line', readLine);
