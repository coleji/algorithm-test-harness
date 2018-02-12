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
