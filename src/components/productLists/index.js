import * as React from 'react';
import { View, Image } from 'remax/one';
import Styles from './index.css';
import ArrowBotton from '../../assets/icon-arrow.png'
import ScrollView from '../ScrollView'

import { IMG_URL } from '../../api/config'

import { onLazyLoad } from './module'

const isAli = process.env.REMAX_PLATFORM === 'ali'
export default class productLists extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			group: {},
			isUpdateGroup: true
		}

		this._onLazyLoad = onLazyLoad.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (JSON.stringify(nextProps.products) !== JSON.stringify(this.props.products)) {
			this.setState({isUpdateGroup: false})
		}
	}

	componentDidUpdate() {
		if (!this.state.isUpdateGroup) {
			this._onLazyLoad()
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
									<Image className={Styles.itemImage} src={(group[item.id] || isAli) ? IMG_URL + item.cover : ''} mode="aspectFit" lazy-load/>
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