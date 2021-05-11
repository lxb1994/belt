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
		this.timer = null
		this.times = 0
	}

	onClick = () => {
		setStorageSync('readGuide', true)
		this.props.onClick && this.props.onClick()
	}
	
	componentDidMount() {
		this.getGuide()
	}

	render() {
		const { list, current } = this.state
		return (
			<View className={Styles.guide}>
				<Swiper className={Styles.swiper} indicator-dots indicator-active-color="#38383A" current={current} onChange={this.onChange}>
					{list.map(item => <SwiperItem className={Styles.swiperItem} key={item.number}>
						{/* <Image className={Styles.swiperImg} src={item.image} mode="aspectFit"/> */}
						<Image className={Styles.swiperImg} src={IMG_URL + item.image} mode="aspectFit"/>
					</SwiperItem>)
					}
				</Swiper>
			</View>
		)
	}

	onChange = ({detail}) => {
		this.setState({current: detail.current}, () => {
			this.setTimer((detail.current + 1) === this.state.list.length)
		})
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
		// this.setState({
		// 	list: [{number: 1, image: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=237408436,785195186&fm=26&gp=0.jpg'}, {number: 2, image: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1529415482,1107411788&fm=26&gp=0.jpg'}]
		// }, () => {
		// 	this.setTimer()
		// })
		this.setState({ list: res.data.banner_list || [] }, () => {this.setTimer()})
	}

	setTimer = (isLast) => {
		console.log('start')
		if (this.timer) clearTimeout(this.timer)
		if (isLast) {
			setTimeout(() => {
				this.last()
			}, 5000)
			return
		}
		this.timer = setTimeout(() => {
			console.log('go-next')
			this.next()
		}, 5000)
	}

	last = () => {
		console.log('last')
		clearTimeout(this.timer)
		this.timer = null
		this.props.onClose()
	}

	next() {
		console.log('next')
		const { current, list } = this.state
		this.setState({current: current + 1 }, () => {this.setTimer((current + 1) === list.length)})
	}
}