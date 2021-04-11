export default {
	// 节流
	throttle(func, delay) {
		let timer = null
		return (cont) => {
			let context = this
			let args = arguments
			if (!timer) {
				timer = setTimeout(function () {
					func.call(context, cont, args)
					timer = null
				}, delay)
			}
		}
	},

	// 防抖
	debounce(fn, wait) {
		let timeout = null
		return function () {
			if (timeout !== null) clearTimeout(timeout)
			timeout = setTimeout(fn, wait)
		}
	},
}