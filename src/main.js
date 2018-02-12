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
