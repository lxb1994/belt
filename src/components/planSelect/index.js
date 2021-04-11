import * as React from 'react'
import { View, Text, Image } from 'remax/one';
import IconPlan from '../../assets/icon_plan.jpg';
import IconRecom from '../../assets/icon_recom.jpg';
import Styles from './index.css';
export default class planSelect extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			planList: [{
				id: 1,
				icon: IconPlan,
				text: '服饰方案'
			}, {
				id: 2,
				icon: IconRecom,
				text: '智能推荐'
			}]
		}
	}

	render() {
		const { planList } = this.state
		const { selectPlan } = this.props
		return (
			<View>
				{
					planList.map((item, index) => (
						<View key={index} className={Styles.itemBox} onClick={selectPlan} data-data={item}>
							<Image className={Styles.iconItem} src={item.icon}></Image>
							<Text className={Styles.textItem}>{item.text}</Text>
						</View>
					))
				}
			</View>
		)
	}
}