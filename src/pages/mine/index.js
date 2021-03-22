import * as React from 'react';
import { View, Text, Image, Button, navigateTo } from 'remax/one';
import { setStorageSync, getStorageSync } from 'remax/wechat';
import Styles from './index.css';

import ArrowRight from '../../assets/arrow-right.png'

export default class Mine extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: {},
			hasUserInfo: false,
			canIUse: wx.canIUse('button.open-type.getUserInfo'),
			cells: [
				{ name: '分享好友', id: 1, icon: require('../../assets/share.png'), openType: 'share' },
				{ name: '我的搭配', id: 2, icon: require('../../assets/suggest.png'), link: '/pages/history/index'},
				{ name: '联系客服', id: 3, icon: require('../../assets/service.png'), openType: 'contact' },
			]
		}
	}
	
  // 页面组件的 didMount 触发时机是在 onLoad 的时候
  componentDidMount() {
		console.log(this)
		const userInfo = getStorageSync('userInfo') || {}
		this.setState({userInfo: userInfo.userInfo || {}, hasUserInfo: !!userInfo.userInfo})
  }

	getUserInfo(e) {
		console.log(e.detail)
		wx.login({
			success: (res) => {
				console.log(res.code, e.detail)
				setStorageSync('userInfo', e.detail)
				this.setState({
					userInfo: e.detail.userInfo,
					hasUserInfo: true
				})
				// wx.request({
				// 	url: config.apiUrl + '/admin.php/home/api/register',
				// 	data: {
				// 		code: res.code,
				// 		encryptedData: e.detail.encryptedData,
				// 		iv: e.detail.iv,
				// 		pickname: userInfo.avatarUrl || '',
				// 		sex: userInfo.gender,
				// 		nickname: userInfo.nickName
				// 	},
				// 	header: { 'content-type': 'application/json' }
				// })
			}
		})
  }

	onClickLink(item) {
		if (item.link) navigateTo({url: item.link});
	}

  render() {
		const { cells, hasUserInfo, canIUse, userInfo } = this.state
    return (
			<View className={Styles.user}>
				<View className={`${Styles.userinfo} flex-row`}>
					{
						(!hasUserInfo && canIUse)
						? <Button className={Styles['login-btn']} open-type="getUserInfo" onGetUserInfo={this.getUserInfo} type="primary" size="mini"> 点击登录 </Button>
						: <View className='flex-row'>
							<Image className={Styles['userinfo-avatar']} src={userInfo.avatarUrl} mode="cover" />
							<Text className={Styles['userinfo-nickname']}>{userInfo.nickName}</Text>
						</View>
					}
				</View>
				<View className={Styles.cells}>
					{
						cells.map(item => (
							<View className={`${Styles.cell} flex-row`} key={item.id} onClick={this.onClickLink.bind(this, item)}>
								{item.openType && <Button className={Styles['cell-btn']} open-type={item.openType} type="default" style="width: 100%;height: 100%;background-color: transparent;"></Button>}
								<Image className={Styles['cell-icon']} src={item.icon} />
								<Text className='flex-1'>{item.name}</Text>
								<Image className={Styles['icon-arrowright']} src={ArrowRight} />
							</View>
						))
					}
				</View>
			</View>
		)
  }
}
