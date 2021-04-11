import * as React from 'react'
import { View, Image } from 'remax/one';
import Reset from '../../assets/reset.jpg';
import Submit from '../../assets/submit.jpg';

import Styles from './index.css';
const IndexBtns = (props) => {

	return (
		<View className={Styles.container}>
			<Image className={Styles.btn} src={Reset} onClick={props.reset} mode="widthFix"/>
			<Image className={Styles.btn} src={Submit} onClick={props.confirm} mode="widthFix"/>
		</View>
	)
}

export default IndexBtns