import * as React from 'react'
import { View, Text } from 'remax/one';

import Styles from './index.css';
const IndexBtns = (props) => {
	return (
		<View className={Styles.container}>
			<Text className={`${Styles.btn} ${Styles.primary}`} onTap={props.intelligence}>智能搭</Text>
			<Text className={Styles.btn} onTap={props.reset}>重置</Text>
			<Text className={`${Styles.btn} ${Styles.primary}`} onTap={props.confirm}>提交</Text>
		</View>
	)
}

export default IndexBtns