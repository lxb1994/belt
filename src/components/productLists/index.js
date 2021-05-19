import * as React from 'react';
import { View, Image } from 'remax/one';
import Styles from './index.css';
import ArrowBotton from '../../assets/icon-arrow.png'
import { ScrollView, showToast } from 'remax/wechat';

import { IMG_URL } from '../../api/config'

export default class productLists extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			group: {},
			isUpdateGroup: true
		}
	}

	componentWillReceiveProps(nextProps) {
		if (JSON.stringify(nextProps.products) !== JSON.stringify(this.props.products)) {
			this.setState({isUpdateGroup: false})
		}
	}

	componentDidUpdate() {
		if (!this.state.isUpdateGroup) {
			let group = {}
			this.props.products.map((item, i) => {
				let id = item.id
				wx.createIntersectionObserver().relativeTo('.listBox',{bottom: 30}).observe('.item-'+ item.id, (ret) => {
					let baseGroup = this.state.group
					group[id] = group[id] || ret.intersectionRatio > 0
					if (group[id] !== baseGroup[id]) {
						this.setState({group: {...baseGroup,...group}, isUpdateGroup: true})
					}
				})
			})
		}
	}

	render() {
		const { group } = this.state
		const { products, onClick } = this.props
		return (
			<View className={Styles.productBox}>
				<Image className={`${Styles.arrowBase} ${Styles.pre}`} src={ArrowBotton}></Image>
				<ScrollView className={`${Styles.listsBox} listBox`} scrollY>
					{/* <View className={Styles.lists}> */}
						{
							products.map((item, i) => (
								<View className={`${Styles.listItem} item-${item.id}`} key={item.id} onClick={this._onClick_.bind(this, item)}>
									{group[i]}
									<Image className={Styles.itemImage} src={group[item.id] ? IMG_URL + item.cover : ''} mode="aspectFit"/>
								</View>
							))
						}
					{/* </View> */}
				</ScrollView>
				<Image className={`${Styles.arrowBase} ${Styles.next}`} src={ArrowBotton}/>
			</View>
		)
	}

	_onClick_(item) {
		this.props.onClick && this.props.onClick(item)
	}
}