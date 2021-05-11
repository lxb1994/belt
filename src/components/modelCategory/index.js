import * as React from 'react';
import { View, Image, Text } from 'remax/one';
import Styles from './index.css';
import ArrowBotton from '../../assets/icon-arrow.png'

import { IMG_URL } from '../../api/config'

export default class productLists extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			scollTop: 0,
			current: 0
		}
	}
	

	preClick = () => {
		if (this.state.scollTop > 0) {
			let num = this.state.scollTop - 1
			this.setState({ scollTop: num })
		}
	}

	nextClick = () => {
		const { scollTop } = this.state
		if (scollTop < (this.props.list.length - 4)) {
			let num = scollTop + 1
			this.setState({ scollTop: num })
		}
	}

	render() {
		const { scollTop, current } = this.state
		const { list } = this.props
		const maxScrollTop = list.length - 4
		const activeId = current || (list[0] && list[0].id)
		return (
			<View className={Styles.productBox}>
				<View className={`${Styles.arrowBase}`} onClick={this.preClick} src={ArrowBotton}>
					<Text className={`${Styles.arrowIcon} ${scollTop === 0 && Styles.disable}`}></Text>
				</View>
				<View className={Styles.listsBox}>
					<View className={Styles.lists} style={{top: -scollTop * 34 + 'Px'}}>
						{
							list.map(item => (
								<View className={`${Styles.listItem} ${activeId === item.id ? Styles.itemActive : ''}`} key={item.id} onClick={this._onClick_.bind(this, item)}>
									<Image className={Styles.itemImage} src={IMG_URL + item.image} mode="aspectFit"/>
									<View className={Styles.itemTitle}>{item.title}</View>
								</View>
							))
						}
					</View>
				</View>
				<View className={`${Styles.arrowBase}`} onClick={this.nextClick} src={ArrowBotton}>
					<Text className={`${Styles.arrowIcon} ${Styles.next} ${(scollTop === maxScrollTop || maxScrollTop <= 0) && Styles.disable}`}></Text>
				</View>
			</View>
		)
	}

	_onClick_(item) {
		this.setState({current: item.id})
		this.props.onClick && this.props.onClick(item)
	}
}