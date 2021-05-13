import * as React from 'react';
import { View, Image } from 'remax/one';
import Styles from './index.css';
import ArrowBotton from '../../assets/icon-arrow.png'
import { ScrollView } from 'remax/wechat';

import { IMG_URL } from '../../api/config'

export default class productLists extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			scollTop: 0,
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
		if (scollTop < (this.props.products.length - 4)) {
			let num = scollTop + 1
			this.setState({ scollTop: num })
		}
	}

	render() {
		const { scollTop } = this.state
		const { products, onClick } = this.props
		const maxScrollTop = products.length - 4
		return (
			<View className={Styles.productBox}>
				<Image className={`${Styles.arrowBase} ${Styles.pre}`} src={ArrowBotton}></Image>
				<ScrollView className={Styles.listsBox} scrollY>
					<View className={Styles.lists}>
						{
							products.map(item => (
								<View className={Styles.listItem} key={item.id} onClick={this._onClick_.bind(this, item)}>
									<Image className={Styles.itemImage} src={IMG_URL + item.cover} mode="aspectFit"/>
								</View>
							))
						}
					</View>
				</ScrollView>
				<Image className={`${Styles.arrowBase} ${Styles.next}`} src={ArrowBotton}/>
			</View>
		)
	}

	_onClick_(item) {
		this.props.onClick && this.props.onClick(item)
	}
}