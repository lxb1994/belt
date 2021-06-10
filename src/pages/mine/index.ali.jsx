import React, { Component } from 'react'
import { View, Text, Image, Button } from 'remax/one'
import { } from 'remax/ali'

import ArrowRight from '../../assets/arrow-right.png'
import Share from '../../assets/share.png'
import History from '../../assets/suggest.png'
import Customer from '../../assets/service.png'

import Styles from './index.css'
import {} from './module.js'

export default class MinePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: {},
			token: '',
			canIUse: null, // wx.canIUse('button.open-type.getUserInfo'),
			cells: [
				{ name: '分享好友', id: 1, icon: Share, openType: 'share', iconWidth: '28rpx' },
				{ name: '我的搭配', id: 2, icon: History, link: '/pages/history/index', needLogin: true, iconWidth: '30rpx'},
				{ name: '联系客服', id: 3, icon: Customer, openType: 'contact', iconWidth: '36rpx' },
			],
			canIUseGetUserProfile: false,
			loading: false
		}
	}

	componentDidMount() {
		// showShareMenu({  withShareTicket: true, menus: [ 'shareAppMessage', 'shareTimeline' ] })
		// const userInfo = getStorageSync('userInfo') || {}
		// const token = getStorageSync('token') || ''
		// this.setState({ userInfo: userInfo || {}, token, canIUseGetUserProfile: !!wx.getUserProfile })
  }

	render() {
		const { token, canIUse, userInfo } = this.state
		return (
			<View className={Styles.user}>
				<View className={`${Styles.userinfo} flex-row`}>
					{
						(!token && canIUse) ?  canIUseGetUserProfile ? <Button className={Styles['login-btn']} onTap={this._getUserProfile} type="primary" size="mini"> 点击登录 </Button> : <Button className={Styles['login-btn']} type="primary" size="mini" open-type="getUserInfo" onGetUserInfo={this._getUserInfo}> 点击登录 </Button>
						: <View className='flex-row'>
							<Image className={Styles['userinfo-avatar']} src={userInfo.avatarUrl} mode="cover" />
							<Text className={Styles['userinfo-nickname']}>{userInfo.nickName}</Text>
						</View>
					}
				</View>
				<View className={Styles.cells}>
				</View>
			</View>
		)
	}
}
