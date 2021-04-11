import * as React from 'react'
import { View, Image } from 'remax/one';
import { Swiper, SwiperItem, ScrollView } from 'remax/wechat';

import Styles from './index.css';

import Top from '../../assets/arrowtop-white.png'
import Bottom from '../../assets/arrowbottom-white.png'

import { IMG_URL } from '../../api/config'
export default class Model extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id: '',
			current: 0
		}
	}

	onTurn = (type) => {
		const len = this.props.category.length
		let { current } = this.state
		if (len <= 5) return
		if (type === 'top' && current !== 0) current--
		if (type === 'bottom' && len - 5 > current) current++
		this.setState({current})
	}

	onChangeList = (item) => {
		this.setState({id: item.id})
	}

	clickModel = (item) => {
		this.props.onClick && this.props.onClick(item)
	}

	onClose = () => {
		this.props.onClose && this.props.onClose()
	}

	render() {
		const { category, allList } = this.props
		const { id, current } = this.state
		const LIST_ID = id
			? id
			: category.length > 0
				? category[0].id
				: ''
		return (
			<View className={Styles.mask} onClick={this.onClose}>
				<View className={Styles.modelContainer} onClick={e => e.stopPropagation()}>
					<View className={Styles.title}>请选择你想要的代培模特服装搭配</View>
					<View className={Styles.content}>
						<View className={Styles.left}>
							<View className={Styles.arrowContainer} onClick={this.onTurn.bind(this, 'top')} ><Image className={Styles.arrowicon} src={Top}/></View>
							<View className={Styles.leftList}>
								<View className={Styles.itemContainer} style={{top: `${current * -36}PX`}}>
									{category.map(item => <View key={item.id} className={Styles.leftItem} onClick={this.onChangeList.bind(this, item)}>{item.title}</View>)}
								</View>
							</View>
							<View className={Styles.arrowContainer} onClick={this.onTurn.bind(this, 'bottom')} ><Image className={Styles.arrowicon} src={Bottom}/></View>
						</View>
						<ScrollView className={Styles.scrollView} scrollY>
							<View className={Styles.modelList}>
								{
									(allList[LIST_ID] || []).map(item => <View className={Styles.modelItem} key={item.id} onClick={this.clickModel.bind(this, item)}>
										<Image className={Styles.modelImage} src={IMG_URL + (item.image1 && item.image1.image)} mode="widthFix"/>
									</View>)
								}
							</View>
						</ScrollView>
					</View>
				</View>
			</View>
		)
	}
}