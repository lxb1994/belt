import * as React from 'react'
import { View, Image } from 'remax/one';

import Styles from './index.css';

import Left from '../../assets/arrow-left2.png'
import Right from '../../assets/arrow-right2.png'

import { IMG_URL } from '../../api/config'
export default class Belts extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			scollLeft: 0,
		}
	}

	onTurnRight(type) {
		let { scollLeft } = this.state
		const { list } = this.props
		if (list.length <= 3) return
		if (type === 'left' && scollLeft < 0) {
			scollLeft++
		} else if (type === 'right' && (list.length - 3 > Math.abs(scollLeft))) {
			scollLeft--
		}
		this.setState({scollLeft})
	}

	render() {
		const { scollLeft } = this.state
		const { list } = this.props

		return (
			<View className={Styles.container}>
				<Image className={Styles.right} src={Right} onClick={this.onTurnRight.bind(this, 'left')} />
				<View className={Styles.content}>
					<View className={Styles.list} style={{left: `${scollLeft * 33.33}%`}}>
						{(list || []).map(item => (
							<View className={Styles.item} key={item.id} onClick={this._onClick_.bind(this, item)}>
								<View className={Styles.imageContainer}><Image className={Styles.image} src={IMG_URL + item.image} mode="heightFix"/></View>
								<View>{item.title}</View>
							</View>
						))}
					</View>
				</View>
				<Image className={Styles.left} src={Left} onClick={this.onTurnRight.bind(this, 'right')}/>
			</View>
		)
	}

	_onClick_(item) {
		this.props.onClick && this.props.onClick(item)
	}
}