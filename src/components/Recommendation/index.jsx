import * as React from 'react'
import { View, Image } from 'remax/one'

import { IMG_URL } from '../../api/config'

import ScrollView from '../ScrollView'
import Styles from './index.css'

export default class Model extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		this._onClose = this.onClose.bind(this)
	}

	render() {
		const { list, mode } = this.props
		// console.log('list', list)
		return (
			<View className={Styles.mask} onClick={this._onClose}>
				<View className={Styles.modelContainer} onClick={e => e.stopPropagation()}>
					<View className={Styles.title}>智能搭配方案</View>
					<View className={Styles.content}>
						<ScrollView className={Styles.scrollView} scrollY>
							<View className={Styles.modelList}>
								{
									list.map(item => <View className={Styles.modelItem} key={item.id} onClick={this._onClick.bind(this, item)}>
										<Image className={Styles.modelImage} src={`${IMG_URL}${mode === 'belt' ? item.image1 : item.image1.image}`} mode="widthFix"/>
									</View>)
								}
							</View>
						</ScrollView>
					</View>
					<View className={Styles.modelBtn} onClick={this._onClose}>关闭</View>
				</View>
			</View>
		)
	}

	onClick(item) {
		const { onClick } = this.props
		if (onClick) onClick(item)
	}

	onClose(event) {
		const { onClose } = this.props
		event.stopPropagation()
		if (onClose) onClose()
	}
}
