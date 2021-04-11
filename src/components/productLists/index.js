import * as React from 'react';
import { View, Image } from 'remax/one';
import Styles from './index.css';
import ArrowBotton from '../../assets/icon-arrow.png'

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
		if (scollTop < (this.props.products.length - 5)) {
			let num = scollTop + 1
			this.setState({ scollTop: num })
		}
	}

	render() {
		const { scollTop } = this.state
		const { products, onClick } = this.props
		const maxScrollTop = products.length - 5
		return (
			<View className={Styles.productBox}>
				<Image className={`${Styles.arrowBase} ${Styles.pre} ${scollTop === 0 && Styles.disable}`} onClick={this.preClick} src={ArrowBotton}></Image>
				<View className={Styles.listsBox}>
					<View className={Styles.lists} style={{top: -scollTop *  149}}>
						{
							products.map(item => (
								<View className={Styles.listItem} key={item.id} onClick={this._onClick_.bind(this, item)}>
									<Image className={Styles.itemImage} src={IMG_URL + item.cover} mode="aspectFit"/>
								</View>
							))
						}
					</View>
				</View>
				<Image className={`${Styles.arrowBase} ${Styles.next} ${(scollTop === maxScrollTop || maxScrollTop <= 0) && Styles.disable}`} src={ArrowBotton} onClick={this.nextClick} />
			</View>
		)
	}

	_onClick_(item) {
		this.props.onClick && this.props.onClick(item)
	}
}