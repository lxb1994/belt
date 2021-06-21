import { ISWECHAT } from '../common/constants'
import request from './request'

const api = {
	request,

	/**
	 * 获取小程序授权登录
	 */
	login: (reqData, config) => request.globalRequest({
		url: '/api/member/third-login',
		reqData,
		method: 'POST',
		...config
	}),

	/**
	 * 注册
	 */
	register: (reqData, config) => request.globalRequest({
		url: '/api/member/update',
		reqData,
		method: 'POST',
		...config
	}),

	/**
	 * 获取banner
	 */
	getBanner: (reqData, config) => request.globalRequest({
		url: '/api/banner',
		reqData,
		...config
	}),

	/**
	 * 获取首页数据
	 */
	getHomeData: (reqData, config) => request.globalRequest({
		url: '/api/index',
		reqData,
		...config
	}),

	/*
	 * 获取饰品颜色
	 */
	getColor: (reqData, config) => request.globalRequest({
		method: 'POST',
		url: '/api/color',
		reqData,
		...config
	}),

	/**
	 * 创建搭配订单
	 */
	createOrder: (reqData, config) => request.globalRequest({
		url: '/api/tIndent/create',
		reqData,
		method: 'POST',
		...config
	}),

	/**
	 *  统计模特点击/饰品点击
	 */
	addVisitLog: (reqData, config) => request.globalRequest({
		url: '/api/add-visit-log',
		reqData,
		method: 'POST',
		...config
	}),

	/**
	 *  获取穿搭列表
	 */
	getVisitHistory: (reqData, config) => request.globalRequest({
		url: '/api/tIndent',
		reqData,
		method: 'POST',
		...config
	}),

	/*
	 * 上传图片
	 */
	uploadImg: (reqData, config) => request.upload({
		url: '/api/member/upload',
		reqData,
		method: 'POST',
		...config
	}),

	/**
	 *  删除搭配
	 */
	delCommit: (reqData, config) => request.globalRequest({
		url: '/api/tIndent/delete',
		reqData,
		method: 'POST',
		...config
	}),
}

const serverless = {
	cloud: ISWECHAT ? {} : getApp().cloud,

	getBanner: () => {
		return new Promise(reslove => {
			serverless.cloud.function.invoke('get_index_data', {},'get_banner').then(res => {  
				reslove(res)
			}).catch(err => {
				reslove({ code: 500, msg: err.toString() })
			})
		})
	},
	getHomeData: () => {
		return new Promise(reslove => {
			serverless.cloud.function.invoke('get_index_data', {},'get_theme').then(res => {  
				reslove(res)
			}).catch(err => {
				reslove({ code: 500, msg: err.toString() })
			})
		})
	},
	getColor: () => {
		return new Promise(reslove => {
			serverless.cloud.function.invoke('get_index_data', {},'get_color').then(res => {  
				reslove(res)
			}).catch(err => {
				reslove({ code: 500, msg: err.toString() })
			})
		})
	}
}

export default ISWECHAT ? api : serverless

