import * as React from 'react';
import { View, Text, Image, Button, navigateTo } from 'remax/one';
import { setStorageSync, getStorageSync, showLoading, hideLoading, getUserProfile, showToast, showShareMenu } from 'remax/wechat';
import Styles from './index.css';

import ArrowRight from '../../assets/arrow-right.png'
import Share from '../../assets/share.png'
import History from '../../assets/suggest.png'
import Customer from '../../assets/service.png'

import Loading from '../../components/loading/index'

import Api from '../../api/index'

export default class Mine extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: {},
			token: '',
			canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
		showShareMenu({  withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] })
		const userInfo = getStorageSync('userInfo') || {}
		const token = getStorageSync('token') || ''
		this.setState({userInfo: userInfo || {}, token, canIUseGetUserProfile: !!wx.getUserProfile})
  }

	getUserProfile = (e) => {
		wx.getUserProfile({
			desc: '获取信息进行登录。',
			success: async (loginRes) => {
				showLoading({title: '正在登录...'})
				wx.login({
					success: async (loginData) => {
						const { userInfo } = loginRes
						let res = await Api.login({type: 2, nickname: userInfo.nickName, head: userInfo.avatarUrl, code: loginData.code})
						hideLoading()
						if (res.code === 1) {
							setStorageSync('token', res.data.login_data.fresh_token)
							setStorageSync('userInfo', userInfo)
							this.setState({
								userInfo: userInfo,
								token: res.data.login_data.fresh_token
							})
						} else {
							showToast({title: res.msg, icon: 'none'})
						}
					},
					fail: this.onFail
				})
			},
			fail: this.onFail
		})
  }

	getUserInfo = (e) => {
		showLoading({title: '正在登录...'})
		wx.login({
			success: async (loginData) => {
				const { userInfo } = e.detail
				let res = await Api.login({type: 2, nickname: userInfo.nickName, head: userInfo.avatarUrl, code: loginData.code})
				hideLoading()
				if (res.code === 1) {
					setStorageSync('token', res.data.login_data.fresh_token)
					setStorageSync('userInfo', userInfo)
					this.setState({
						userInfo: userInfo,
						token: res.data.login_data.fresh_token
					})
				} else {
					showToast({title: res.msg, icon: 'none'})
				}
			},
			fail: this.onFail
		})
	}

	onClickLink(item) {
		if (item.link) navigateTo({url: item.link});
	}

	onShareAppMessage() {
		return { title: ' 快来DIY腰饰搭配，秒变时髦“小腰精”！' }
	}

	onShareTimeline() {
		return { title: ' 快来DIY腰饰搭配，秒变时髦“小腰精”！' }
	}
	
	onFail = (text) => {
		if (text) {
			showToast({title: text,icon: 'none'})
			return
		}
		hideLoading()
	}

  render() {
		const { cells, token, canIUse, userInfo, canIUseGetUserProfile, loading } = this.state
    return (
			<View className={Styles.user}>
				<View className={`${Styles.userinfo} flex-row`}>
					{
						(!token && canIUse)
						?
							canIUseGetUserProfile
								? <Button className={Styles['login-btn']} onTap={this.getUserProfile} type="primary" size="mini"> 点击登录 </Button>
								: <Button className={Styles['login-btn']} type="primary" size="mini" open-type="getUserInfo" onGetUserInfo={this.getUserInfo}> 点击登录 </Button>
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
									<Image className={Styles['cell-icon']} src={item.icon} mode="widthFix" style={`width: ${item.iconWidth}`}/>
									<Text className='flex-1'>{item.name}</Text>
									<Image className={Styles['icon-arrowright']} src={ArrowRight} />
								</View>
							)
						)
					}
				</View>

				{loading && <Loading />}
			</View>
		)
  }
}
