import React, { Component } from 'react'

import { View, Image } from 'remax/one'

import Api from '../../api'
import Utils from '../../common/utils'

export default class TestPage extends Component {
	constructor(props) {
		super(props)

		this.state = {}

		setTimeout(() => this.testApi(), 2000)
	}

	render() {
		return (
			<View>
				<Image src='https://wx.wawv.cn/upload/app-banner/2021-06-16/30d09ad750d053d57ae205167cbf2858.jpg' />
			</View>
		)
	}

	async testApi() {
		// my.request({ url: 'http://ceshi2.zhongtianfs.cn/api/banner?token=%5Bobject%20Object%5D', method: 'GET', success: res => Utils.showToast({ title: JSON.stringify(res.data) }), fail: err => my.alert({ title: 'fail', content: JSON.stringify(err) }) })
		Utils.showToast({ title: 'timson test' })
		// const _res = await Api.getHomeData()
		// Utils.showToast({ title: _res.code })
	}
}
