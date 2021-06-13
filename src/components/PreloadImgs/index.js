import * as React from 'react'
import { View, Image } from 'remax/one';

import Styles from './index.css';
import { IMG_URL } from '../../api/config'

export default class PreloadImgs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.successNum = 0
	}

	shouldComponentUpdate(nextProps,nextState) {
		// console.log(nextProps, nextState)
		return JSON.stringify(nextProps.list) !== JSON.stringify(this.props.list)
	}

	render() {
		const { list } = this.props
		return (
			<View className={Styles.preloadImgs}>
				{list.map((item, i) => <Image key={i} className={Styles.preImg} src={IMG_URL + item} bindload={this.onLoad} onLoad={this.onLoad} binderror={this.onLoad}/>)}
			</View>
		)
	}

	onLoad = () => {
		// console.log('onLoad:' + this.successNum)
		this.successNum = this.successNum + 1
		if (this.successNum === this.props.list.length) {
			this.props.onLoadAll && this.props.onLoadAll()
		}
	}
}