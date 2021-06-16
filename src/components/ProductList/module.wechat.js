export function onLazyLoad(params) {
	let group = {}
	this.props.products.map((item, i) => {
		let id = item.id
		wx.createIntersectionObserver().relativeTo('.listBox',{bottom: 30}).observe('.item-'+ item.id, (ret) => {
			let baseGroup = this.state.group
			group[id] = group[id] || ret.intersectionRatio > 0
			if (group[id] !== baseGroup[id]) {
				this.setState({group: {...baseGroup,...group}, isUpdateGroup: true})
			}
		})
	})
}