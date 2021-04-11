import * as React from 'react';
import { View, Text, Image, Button, navigateTo } from 'remax/one';
import { hideLoading, showLoading, previewImage } from 'remax/wechat';
import Styles from './index.css';

import Api from '../../api/index'
import { IMG_URL } from '../../api/config'

const pageSize = 5
export default class Mine extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: []
		}
		this.hasMore = false
		this.pageNo = 1
		this.isLoading = false
	}
	
  componentDidMount() {
		this.getList()
  }

	async getList() {
		let { list } = this.state
		showLoading({title: '正在加载...'})
		let res = await Api.getVisitHistory({
			page: this.pageNo,
			count: pageSize
		})
		hideLoading()
		if (res.code === 1) {
			list = this.pageNo > 1
				? list.concat(res.data.list)
				: res.data.list
			this.isLoading = true
			this.pageNo++
			this.hasMore = !(this.pageNo > 1 && res.data.list.length === 0)
			this.setState({list: list}, () => hideLoading())
		}
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
		const { list } = this.state
    return (
			<View className={Styles.container}>
				{this.isLoading && list.length === 0 && <View className={Styles.tip}>暂无搭配方案</View>}
				<View className={Styles.list}>
					{
						list.map((item, index) => <View key={item.id} className={`${Styles.item} ${index === 0 ? Styles['no-border'] : ''} flex-row`}>
							<View className='flex-1'>
								<View className={`${Styles.title} limit-line`}>{item.theme_title}</View>
								<View className={`${Styles.row} limit-line`}>设计单号:{item.id}</View>
								<View className={`${Styles.row} limit-line`}>时间:{item.created_at}</View>
								<View className={`${Styles.row} limit-line`}>产品编号:{item.theme_style_id}</View>
								<View className={`${Styles.row} limit-line`}>产品名称:{item.theme_style_title}</View>
							</View>
							<Image className={Styles.image} src={IMG_URL + item.image} onClick={this.onReview.bind(this, IMG_URL + item.image)}/>
						</View>)
					}
					{list.length > 0 && <View className={Styles.more} onClick={this.onLoadMore}>{this.hasMore ? '查看更多' : '没有更多了'}</View>}
				</View>
			</View>
		)
  }
}
