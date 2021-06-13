import Utils from '../../common/utils'
import Api from '../../api/index'
import { IMG_URL } from '../../api/config'

const pageSize = 5
/*
 * 手指触摸动作开始 记录起点X坐标
 */
export function touchstart(e) {
	let { list } = this.state
	//开始触摸时 重置所有删除
	list.forEach(function (v, i) {
		if (v.isTouchMove) v.isTouchMove = false;
	})

	this.startX = e.changedTouches[0].clientX
	this.startY = e.changedTouches[0].clientY
	this.setState({list: list})
}

/*
 * 滑动事件处理
 */
export function touchmove(index, e) {
	let { list } = this.state
	let startX = this.startX, startY = this.startY, touchMoveX = e.changedTouches[0].clientX, touchMoveY = e.changedTouches[0].clientY
	//获取滑动角度
	let angle = this._angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
	list.forEach((v, i) => {
		v.isTouchMove = false
		//滑动超过30度角 return
		if (Math.abs(angle) > 40) return;
		if (i == index) {
			v.isTouchMove = touchMoveX <= startX
		}
	})
	//更新数据
	this.setState({ list: list })
}

/**
* 计算滑动角度
* @param {Object} start 起点坐标
* @param {Object} end 终点坐标
*/
export function angle(start, end) {
	let _X = end.X - start.X, _Y = end.Y - start.Y
	return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
}

/**
 * 删除事件
 * @param {*} item
 */
export async function onDel(item) {
	let res = await Api.delCommit({id: item.id})
	if (res.code !== 1) return Utils.showToast({ title: res.msg || '网络波动，请稍后重试！', icon: 'none' })
	this.pageNo = 1
	Utils.showToast({title: '删除成功！'})
	this._getList()
}

/**
 * 获取列表
 */
export async function getList() {
	let { list } = this.state
	this.setState({ loading: true })
	// showLoading({title: '正在加载...'})
	let res = await Api.getVisitHistory({ page: this.pageNo, count: pageSize })
	this.isLoading = true
	this.setState({ loading: false, list: [{id: 1, title: '123'}, {id: 2, title: '456'}] })
	if (res.code !== 1) return Utils.showToast({ title: res.msg || '网络波动，请稍后重试！', icon: 'none' })
	// list = this.pageNo > 1 ? list.concat(res.data.list) : res.data.list
	// this.pageNo++
	// this.hasMore = !(this.pageNo > 1 && res.data.list.length === 0)
	// this.setState({list: list})
}

/**
 * 是否加载更多
 */
export function onLoadMore() {
	if (this.hasMore) this._getList()
}

/**
 * 预览
 */
export function onReview(url) {
	Utils.previewImage({ current: 0, urls: [url] })
}