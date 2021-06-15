import * as React from 'react'
import { View, Text } from 'remax/one';
import { ISALI } from '../../common/constants'

import Styles from './index.css';
const IndexBtns = (props) => {
	const onClick = (type) => {
		props.onClick && props.onClick(type)
	}
	return (
		<View className={Styles.container}>
			<Text className={`${Styles.btn} ${Styles.primary}`} onTap={props.intelligence}>智能搭</Text>
			<Text className={Styles.btn} onTap={props.reset}>预览</Text>
			{!ISALI && <Text className={`${Styles.btn} ${Styles.primary}`} onTap={props.confirm}>提交</Text>}
			{ISALI && <Text className={`${Styles.btn} ${Styles.cart}`} onTap={onClick.bind(this, 'ADD_CART')}>加入购物车</Text>}
		</View>
	)
}

export default IndexBtns