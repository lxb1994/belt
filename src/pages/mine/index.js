import * as React from 'react';
import { View, Text, Image, Button, navigateTo } from 'remax/one';
import { setStorageSync, getStorageSync, showLoading, hideLoading, getUserProfile, showToast, showShareMenu } from 'remax/wechat';
import Styles from './index.css';

import ArrowRight from '../../assets/arrow-right.png'
import Share from '../../assets/share.png'
import History from '../../assets/suggest.png'
import Customer from '../../assets/service.png'

import Api from '../../api/index'

export default class Mine extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: {},
			token: '',
			canIUse: wx.canIUse('button.open-type.getUserInfo'),
			cells: [
				{ name: '分享好友', id: 1, icon: Share, openType: 'share' },
				{ name: '我的搭配', id: 2, icon: History, link: '/pages/history/index', needLogin: true},
				{ name: '联系客服', id: 3, icon: Customer, openType: 'contact' },
			]
		}
	}
	
  // 页面组件的 didMount 触发时机是在 onLoad 的时候
  componentDidMount() {
		showShareMenu({  withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] })
		const userInfo = getStorageSync('userInfo') || {}
		const token = getStorageSync('token') || ''
		this.setState({userInfo: userInfo.userInfo || {}, token})
  }

	getUserInfo = (e) => {
		// wx.getUserProfile({
		// 	desc: '获取信息进行登录，保存您的个人搭配。',
		// 	success: async (loginRes) => {
		// 		showLoading({title: '正在登录...'})
		// 		console.log('Api', loginRes, e.detail)
		// 		return
		// 		let res = await Api.login({type: 2, nickname: e.detail.userInfo.nickName, head: e.detail.userInfo.avatarUrl, code: loginRes.code})
		// 		hideLoading()
		// 		if (res.code === 1) {
		// 			setStorageSync('token', res.data.login_data.fresh_token)
		// 			setStorageSync('userInfo', e.detail)
		// 			this.setState({
		// 				userInfo: e.detail.userInfo,
		// 				token: res.data.login_data.fresh_token
		// 			})
		// 		}
		// 	}
		// })
		showLoading({title: '正在登录...'})
		wx.login({
			success: async (loginRes) => {
				console.log('Api', loginRes.code, e)
				let res = await Api.login({type: 2, nickname: e.detail.userInfo.nickName, head: e.detail.userInfo.avatarUrl, code: loginRes.code})
				hideLoading()
				if (res.code !== 1) {
					showToast({ title: '登录失败，请重新尝试。', icon: 'none' })
					return
				}
				setStorageSync('token', res.data.login_data.fresh_token)
				setStorageSync('userInfo', e.detail)
				this.setState({
					userInfo: e.detail.userInfo,
					token: res.data.login_data.fresh_token
				})
			},
			fail: () => hideLoading()
		})
  }

	onGetPhoneNumber(e) {
		console.log(e)
	}

	onClickLink(item) {
		if (item.link) navigateTo({url: item.link});
	}

  render() {
		const { cells, token, canIUse, userInfo } = this.state
    return (
			<View className={Styles.user}>
				<View className={`${Styles.userinfo} flex-row`}>
					{
						(!token && canIUse)
						? <Button className={Styles['login-btn']} open-type="getUserInfo" onGetUserInfo={this.getUserInfo} onTap={this.getUserInfo} type="primary" size="mini"> 点击登录 </Button>
						: <View className='flex-row'>
							<Image className={Styles['userinfo-avatar']} src={userInfo.avatarUrl} mode="cover" />
							<Text className={Styles['userinfo-nickname']}>{userInfo.nickName}</Text>
						</View>
					}
				</View>
				<View className={Styles.cells}>
					{
						cells.map(item => (!item.needLogin || (item.needLogin && token)) && (
								<View className={`${Styles.cell} flex-row`} key={item.id} onClick={this.onClickLink.bind(this, item)}>
									{item.openType && <Button className={Styles['cell-btn']} open-type={item.openType} type="default" style="width: 100%;height: 100%;background-color: transparent;"></Button>}
									<Image className={Styles['cell-icon']} src={item.icon} />
									<Text className='flex-1'>{item.name}</Text>
									<Image className={Styles['icon-arrowright']} src={ArrowRight} />
								</View>
							)
						)
					}
				</View>
			</View>
		)
  }
}
