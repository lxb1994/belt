import * as React from 'react';
import { View, Image } from 'remax/one';
import Styles from './index.css';

import ICON_LOADING from '../../assets/loading.gif'
export default class productLists extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			current: 0,
		}
	}
	
	onClick = (item) => {
		this.setState({current: item.id})
		this.props.onClick && this.props.onClick(item)
	}

	render() {
		return (
			<View className={Styles.mask}>
				<Image className={Styles.loading} src={ICON_LOADING} mode="widthFix"/>
			</View>
		)
	}
}