import * as React from 'react'
import { View, Text, Image, Button, navigateTo } from 'remax/one'
import { setStorageSync, getStorageSync, showLoading, hideLoading, getUserProfile, showToast, showShareMenu } from 'remax/wechat'

import ArrowRight from '../../assets/arrow-right.png'
import Share from '../../assets/share.png'
import History from '../../assets/suggest.png'
import Customer from '../../assets/service.png'

import Loading from '../../components/loading/index'

import Api from '../../api/index'

import Styles from './index.css'
import { getUserProfileFunc, getUserInfo, onClickLink, onFail } from './module.js'

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

		this._getUserProfile = getUserProfileFunc.bind(this)
		this._getUserInfo = getUserInfo.bind(this)
		this._onClickLink = onClickLink.bind(this)
		this._onFail = onFail.bind(this)
	}

  componentDidMount() {
		showShareMenu({  withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] })
		const userInfo = getStorageSync('userInfo') || {}
		const token = getStorageSync('token') || ''
		this.setState({ userInfo: userInfo || {}, token, canIUseGetUserProfile: !!wx.getUserProfile })
  }

	onShareAppMessage() {
		return { title: ' 快来DIY腰饰搭配，秒变时髦“小腰精”！' }
	}

	onShareTimeline() {
		return { title: ' 快来DIY腰饰搭配，秒变时髦“小腰精”！' }
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
								? <Button className={Styles['login-btn']} onTap={this._getUserProfile} type="primary" size="mini"> 点击登录 </Button>
								: <Button className={Styles['login-btn']} type="primary" size="mini" open-type="getUserInfo" onGetUserInfo={this._getUserInfo}> 点击登录 </Button>
						: <View className='flex-row'>
							<Image className={Styles['userinfo-avatar']} src={userInfo.avatarUrl} mode="cover" />
							<Text className={Styles['userinfo-nickname']}>{userInfo.nickName}</Text>
						</View>
					}
				</View>
				<View className={Styles.cells}>
					{
						cells.map(item => (!item.needLogin || (item.needLogin && token)) && (
								<View className={`${Styles.cell} flex-row`} key={item.id} onClick={this._onClickLink.bind(this, item)}>
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

