import * as React from 'react';
import { View, Text, Image } from 'remax/one';
import { navigateBack, setClipboardData } from 'remax/wechat';
import Styles from './index.css';

import Api from '../../api/index'
export default class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	onBack() {
		navigateBack({delta: 1})
	}

	onClickCopy(text) {
		setClipboardData({data: text})
	}

  render() {
		const { location: {query} } = this.props
    return (
			<View className={Styles.page}>
				<View className={Styles.container}>
					<View className={`${Styles.title} ${Styles.margin20}`}>饰品搭配方案已完成</View>
					<View className={Styles.subTitle}>设计单号:{query.sn}</View>
					<View className={`${Styles.copy} ${Styles.margin50}`} onClick={this.onClickCopy.bind(this, query.sn)}>【点击复制】</View>
					<View className={`${Styles.notice} ${Styles.margin100}`}>请到淘宝店铺购买商品，在订单备注：产品搭配方案号：{query.sn}</View>
					<View className={`${Styles.title} ${Styles.margin20}`}>了解或购买产品，请移步珞狮LESSIS店铺</View>
					<View className={Styles.notice}>天猫店铺</View>
					<View className={`${Styles.copy} ${Styles.margin50}`} onClick={this.onClickCopy.bind(this, '珞狮LESSIS')}>【点击复制】</View>
					<View className={Styles.notice}>网址:lessis.tmall.com</View>
					<View className={Styles.notice}>淘宝搜索:“LESSIS”或“珞狮”</View>
					<View className={Styles.btn} onClick={this.onBack}>确定</View>
				</View>
			</View>
		)
  }
}
