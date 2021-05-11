import * as React from 'react';
import { View, Text } from 'remax/one';
import Styles from './index.css';

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
		const { list } = this.props
		const { current } = this.state
		let activeId = current || (list[0] && list[0].id)
		return (
			<View className={Styles.tabbar}>
				{
					list.map(item => <View className={Styles.item} key={item.id} onClick={this.onClick.bind(this, item)}>
						{item.title}
						{item.id === activeId && <Text className={Styles.active}></Text>}
					</View>)
				}
			</View>
		)
	}
}