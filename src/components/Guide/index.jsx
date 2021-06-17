import * as React from 'react'
import { View, Image } from 'remax/one'

import { IMG_URL } from '../../api/config'
import Api from '../../api/index'

import Swiper from '../Swiper'
import Styles from './index.css'

export default class Model extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			current: 0
		}
		this.times = 0
		this._getGuide = this.getGuide.bind(this)
	}
	
	componentDidMount() {
		this._getGuide()
	}

	render() {
		const { list, current } = this.state
		return (
			<View className={Styles.guide}>
				<Swiper.Box className={Styles.swiper} indicator-dots={list.length > 1} indicator-active-color='#38383A'>
					{ list.map(item => <Swiper.Item className={Styles.swiperItem} key={item.number}><Image className={Styles.swiperImg} src={IMG_URL + item.image} mode='aspectFit' /></Swiper.Item>) }
				</Swiper.Box>
			</View>
		)
	}

	async getGuide() {
		let res = await Api.getBanner()
		if (res.code === 1) return this.setState({ list: res.data.banner_list || [] })

		this.times += 1
		if (this.times < 3) setTimeout(() => this._getGuide(), 500)
	}
}
