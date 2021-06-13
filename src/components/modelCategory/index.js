import * as React from 'react';
import { View, Image, Text } from 'remax/one';
import Styles from './index.css';
import ScrollView from '../ScrollView'

import { IMG_URL } from '../../api/config'
import ArrowBotton from '../../assets/icon-arrow.png'

export default class productLists extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			scollTop: 0,
			current: 0,
			modelId: 0,
			group: {},
			isUpdateGroup: true
		}
	}

	render() {
		const { group, current, modelId} = this.state
		const { list, models } = this.props
		// const maxScrollTop = list.length - 4
		const activeId = current
		const modelList = models[activeId] || []
		return (
			<View className={Styles.productBox}>
				<View className={`${Styles.arrowBase}`}>
					<Text className={`${Styles.arrowIcon}`}></Text>
				</View>
				<ScrollView className={Styles.listsBox} scrollY>
					<View className={Styles.lists}>
						{
							list.map(item => (
								<View key={item.id}>
									<View className={`${Styles.listItem} ${current === item.id ? Styles.itemActive : ''}`} onClick={this._onClick_.bind(this, item)}>
										<Image className={Styles.itemImage} src={IMG_URL + item.image} mode="aspectFit" lazyLoad/>
										<View className={Styles.itemTitle}>{item.title}</View>
									</View>
									{/* 迁移自模特列表 */}
									{item.id === current && <View className={Styles.productBox2}>
										<Image className={`${Styles.arrowBase2}`} src={ArrowBotton}/>
										<ScrollView className={`${Styles.listsBox2} listBox-${current}`} scrollY>
											{
												modelList.map((child, c) => (
													<View className={`${Styles.listItem2} ${child.id === modelId ? Styles.listItemActive2 : ''} item-${c}`} key={child.id} onClick={this._onClickModel_.bind(this, child)}>
														<Image className={Styles.itemImage2} src={IMG_URL + child.image} mode="aspectFit" lazyLoad/>
													</View>
												))
											}
										</ScrollView>
										<Image className={`${Styles.arrowBase2} ${Styles.next2}`} src={ArrowBotton}/>
									</View>}
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
		console.log('item', item)
		this.setState({current: item.id === this.state.current ? 0 : item.id})
		// this.props.onClick && this.props.onClick(item)
	}

	_onClickModel_(item) {
		this.setState({modelId: item.id})
		this.props.onClickModel && this.props.onClickModel(item)
	}
}