import * as React from 'react'
import { View, Image } from 'remax/one'

import Styles from './index.css'
import { IMG_URL } from '../../api/config'
// import Utils from '../../common/utils'

export default class PreloadImgs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.successNum = 0
		this._onLoad = this.onLoad.bind(this)
	}

	shouldComponentUpdate(nextProps) {
		const { list } = this.props
		return JSON.stringify(nextProps.list) !== JSON.stringify(list)
	}

	onLoad() {
		const { list, onLoadAll } = this.props
		this.successNum = this.successNum + 1
		// Utils.showToast({ title: this.successNum })
		if (this.successNum === list.length) onLoadAll && onLoadAll()
	}

	render() {
		const { list } = this.props
		return (
			<View className={Styles.preloadImgs}>
				{ list.map((item, i) => <Image key={i} className={Styles.preImg} src={IMG_URL + item} bindload={this._onLoad} onLoad={this._onLoad} binderror={this._onLoad} />) }
			</View>
		)
	}
}
