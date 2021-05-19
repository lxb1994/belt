import * as React from 'react'
import { View, Image } from 'remax/one';
import { hideTabBar, setStorageSync, Swiper, SwiperItem, switchTab } from 'remax/wechat';

import Styles from './index.css';
import { IMG_URL } from '../../api/config'

import Api from '../../api/index'
export default class Model extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			current: 0
		}
		this.times = 0
	}
	
	componentDidMount() {
		this.getGuide()
	}

	render() {
		const { list, current } = this.state
		return (
			<View className={Styles.guide}>
				<Swiper className={Styles.swiper} indicator-dots={list.length > 1} indicator-active-color="#38383A">
					{list.map(item => <SwiperItem className={Styles.swiperItem} key={item.number}>
						{/* <Image className={Styles.swiperImg} src={item.image} mode="aspectFit"/> */}
						<Image className={Styles.swiperImg} src={IMG_URL + item.image} mode="aspectFit"/>
					</SwiperItem>)
					}
				</Swiper>
			</View>
		)
	}

	getGuide = async () => {
		let res = await Api.getBanner()
		if (res.code !== 1) {
			times += 1
			if (times < 3) {
				setTimeout(() => {this.getGuide()}, 500);
			}
			return
		}
		this.setState({ list: res.data.banner_list || [] })
	}
}