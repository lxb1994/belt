import * as React from 'react';
import { View, Image, Text } from 'remax/one';
import Styles from './index.css';
import { ScrollView } from 'remax/wechat';

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
				<View className={`${Styles.arrowBase}`}>
					<Text className={`${Styles.arrowIcon}`}></Text>
				</View>
				<ScrollView className={Styles.listsBox} scrollY>
					<View className={Styles.lists}>
						{
							list.map(item => (
								<View className={`${Styles.listItem} ${activeId === item.id ? Styles.itemActive : ''}`} key={item.id} onClick={this._onClick_.bind(this, item)}>
									<Image className={Styles.itemImage} src={IMG_URL + item.image} mode="aspectFit"/>
									<View className={Styles.itemTitle}>{item.title}</View>
								</View>
							))
						}
					</View>
				</ScrollView>
				<View className={`${Styles.arrowBase}`}>
					<Text className={`${Styles.arrowIcon} ${Styles.next}`}></Text>
				</View>
			</View>
		)
	}

	_onClick_(item) {
		this.setState({current: item.id})
		this.props.onClick && this.props.onClick(item)
	}
}