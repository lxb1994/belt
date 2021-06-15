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
	 * 获取首页数据
	 */
	getHomeData: (reqData, config) => request.globalRequest({
		url: '/api/index',
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

	/**
	 * 获取banner
	 */
	getBanner: (reqData, config) => request.globalRequest({
		url: '/api/banner',
		reqData,
		...config
	}),


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

export default api
