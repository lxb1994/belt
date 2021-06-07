import * as React from 'react';
import { View, Text, Image, Button, navigateTo } from 'remax/one';
import Styles from './index.css';
import { onReview, onLoadMore, getList, onDel, angle, touchmove, touchstart } from './module.js'

import Api from '../../api/index'
import { IMG_URL } from '../../api/config'

import Loading from '../../components/loading/index'
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
		this._onReview = onReview.bind(this)
		this._onLoadMore = onLoadMore.bind(this)
		this._getList = getList.bind(this)
		this._onDel = onDel.bind(this)
		this._angle = angle.bind(this)
		this._touchmove = touchmove.bind(this)
		this._touchstart = touchstart.bind(this)
	}

	componentDidMount() {
		this._getList()
	}

	render() {
		const { list, loading } = this.state
		return (
			<View className={Styles.container}>
				{this.isLoading && list.length === 0 && <View className={Styles.tip}>暂无搭配方案</View>}
				<View className={Styles.list}>
					{
						list.map((item, index) => <View key={item.id} className={`${Styles.item} ${index === 0 ? Styles['no-border'] : ''} ${item.isTouchMove ? Styles['touch-move-active'] : ''} flex-row `} onTouchStart={this._touchstart} onTouchMove={this._touchmove.bind(this, index)}>
							<View className={`${Styles.itemLeft}`}>
								<View className="flex-1">
									<View className={`${Styles.title} limit-line`}>{item.theme_title}</View>
									<View className={`${Styles.row} limit-line`}>设计单号:{item.id}</View>
									<View className={`${Styles.row} limit-line`}>时间:{item.created_at}</View>
									<View className={`${Styles.row} limit-line`}>产品编号:{item.theme_style_id}</View>
									<View className={`${Styles.row} limit-line`}>产品名称:{item.theme_style_title}</View>
								</View>
								<Image className={Styles.image} src={IMG_URL + item.image} onClick={this._onReview.bind(this, IMG_URL + item.image)} />
								<View className={Styles.deleteBtn} onClick={this._onDel.bind(this, item)}>删除</View>
							</View>
						</View>)
					}
					{list.length > 0 && <View className={Styles.more} onClick={this._onLoadMore}>{this.hasMore ? '查看更多' : '没有更多了'}</View>}
				</View>

				{loading && <Loading />}
			</View>
		)
	}
}
