import * as React from 'react'
import { View, Image } from 'remax/one';
import { setStorageSync, Swiper, SwiperItem } from 'remax/wechat';

import Styles from './index.css';
export default class Model extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [
				{ id: 1, image: '../../assets/guide/1.jpg' },
				{ id: 2, image: '../../assets/guide/2.jpg' },
				{ id: 3, image: '../../assets/guide/3.jpg' },
				{ id: 4, image: '../../assets/guide/4.jpg' },
				{ id: 5, image: '../../assets/guide/5.jpg' },
				{ id: 6, image: '../../assets/guide/6.jpg' },
				{ id: 7, type: 'btn' },
			]
		}
	}

	onClick = () => {
		setStorageSync('readGuide', true)
		this.props.onClick && this.props.onClick()
	}

	render() {
		const { list } = this.state
		return (
			<View className={Styles.guide}>
				<Swiper className={Styles.swiper} indicator-dots indicator-active-color="#ECAE4B">
					{list.map(item => <SwiperItem className={Styles.swiperItem} key={item.id}>
						{
							item.type === 'btn'
							?	<View className={Styles.swiperBtn} onClick={this.onClick}>开始使用</View>
							: <Image className={Styles.swiperImg} src={item.image} mode="aspectFit"/>
						}
					</SwiperItem>)
					}
				</Swiper>
			</View>
		)
	}
}