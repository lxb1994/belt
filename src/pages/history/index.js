import * as React from 'react';
import { View, Text, Image, Button, navigateTo } from 'remax/one';
import { hideLoading, showLoading, previewImage, showToast } from 'remax/wechat';
import Styles from './index.css';

import Api from '../../api/index'
import { IMG_URL } from '../../api/config'

import Loading from '../../components/loading/index'

const pageSize = 5
export default class Mine extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			loading: false
		}
		this.hasMore = false
		this.pageNo = 1
		this.isLoading = false
		this.startX = 0
		this.startY = 0
	}

	componentDidMount() {
		this.getList()
	}

	async getList() {
		let { list } = this.state
		this.setState({ loading: true })
		// showLoading({title: '正在加载...'})
		let res = await Api.getVisitHistory({
			page: this.pageNo,
			count: pageSize
		})
		this.isLoading = true
		this.setState({ loading: false })
		if (res.code === 1) {
			list = this.pageNo > 1
				? list.concat(res.data.list)
				: res.data.list
			this.pageNo++
			this.hasMore = !(this.pageNo > 1 && res.data.list.length === 0)
			// this.setState({list: list})
		} else {
			showToast({ title: res.msg, icon: 'none' })
		}
		this.setState({ list: [{ id: 1, theme_title: '123', created_at: '2014-03-13', theme_style_id: '12312123', theme_style_title: '产品名称', image: '/upload/member-img/2021-05-24/ee6b4d4fe38f5569466baaa385b8832a.png' }, { id: 2, theme_title: '123', created_at: '2014-03-13', theme_style_id: '12312123', theme_style_title: '产品名称', image: '/upload/member-img/2021-05-24/ee6b4d4fe38f5569466baaa385b8832a.png' }, { id: 3, theme_title: '123', created_at: '2014-03-13', theme_style_id: '12312123', theme_style_title: '产品名称', image: '/upload/member-img/2021-05-24/ee6b4d4fe38f5569466baaa385b8832a.png' }] })
	}

	onLoadMore = () => {
		if (this.hasMore) this.getList()
	}

	onReview = (url) => {
		previewImage({
			current: url,
			urls: [url]
		})
	}

	render() {
		const { list, loading } = this.state
		return (
			<View className={Styles.container}>
				{this.isLoading && list.length === 0 && <View className={Styles.tip}>暂无搭配方案</View>}
				<View className={Styles.list}>
					{
						list.map((item, index) => <View key={item.id} className={`${Styles.item} ${index === 0 ? Styles['no-border'] : ''} ${item.isTouchMove ? Styles['touch-move-active'] : ''} flex-row `} onTouchStart={this.touchstart} onTouchMove={this.touchmove.bind(this, index)}>
							<View className={`${Styles.itemLeft}`}>
								<View className="flex-1">
									<View className={`${Styles.title} limit-line`}>{item.theme_title}</View>
									<View className={`${Styles.row} limit-line`}>设计单号:{item.id}</View>
									<View className={`${Styles.row} limit-line`}>时间:{item.created_at}</View>
									<View className={`${Styles.row} limit-line`}>产品编号:{item.theme_style_id}</View>
									<View className={`${Styles.row} limit-line`}>产品名称:{item.theme_style_title}</View>
								</View>
								<Image className={Styles.image} src={IMG_URL + item.image} onClick={this.onReview.bind(this, IMG_URL + item.image)} />
								<View className={Styles.deleteBtn} onClick={this.onDel.bind(this, item)}>删除</View>
							</View>
						</View>)
					}
					{list.length > 0 && <View className={Styles.more} onClick={this.onLoadMore}>{this.hasMore ? '查看更多' : '没有更多了'}</View>}
				</View>

				{loading && <Loading />}
			</View>
		)
	}

	//手指触摸动作开始 记录起点X坐标
	touchstart = (e) => {
		let { list } = this.state
		//开始触摸时 重置所有删除
		list.forEach(function (v, i) {
			if (v.isTouchMove) v.isTouchMove = false;
		})

		this.startX = e.changedTouches[0].clientX
		this.startY = e.changedTouches[0].clientY
		this.setState({list: list})
	}

	//滑动事件处理
	touchmove = (index, e) => {
		let { list } = this.state
		let startX = this.startX, startY = this.startY, touchMoveX = e.changedTouches[0].clientX, touchMoveY = e.changedTouches[0].clientY
		//获取滑动角度
		let angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
		list.forEach((v, i) => {
			v.isTouchMove = false
			//滑动超过30度角 return
			if (Math.abs(angle) > 40) return;
			if (i == index) {
				if (touchMoveX > startX) //右滑
					v.isTouchMove = false
				else //左滑
					v.isTouchMove = true
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
	angle = (start, end) => {
		let _X = end.X - start.X, _Y = end.Y - start.Y
		return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
	}

	//删除事件
	onDel = async (item) => {
		let res = await Api.delCommit({id: item.description})
		if (res.code !== 1) return showToast({ title: res.msg, icon: 'none' })
		this.pageNo = 1
		this.getList()
	}
}
