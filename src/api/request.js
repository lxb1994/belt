import { API_URL, TEST_URL } from './config'
import Utils from '../common/utils'

let req = {}
req.globalRequest = ({ url = '', reqData = {}, method = 'GET', header = {} }) => {
	const requestHeader = { 'Content-Type': 'application/json', ...header }
	const token = Utils.getStorageSync('token') || ''
	return new Promise(reslove => {
		Utils.request({
			method,
			url: `${API_URL}${url}`,
			data: { ...reqData, token },
			header: requestHeader,
			success: (res) => {
				switch (res.data.code) {
					case 12:
					case 13:
						Utils.removeStorageSync('token')
						Utils.removeStorageSync('userInfo')
						break
				}
				reslove(res.data)
			},
			fail: (err) => {
				reslove({ code: 500, msg: err.toString() })
			}
		})
	})
}

req.upload = ({ url = '', reqData = { filePath: '', formData: {}, name: '' }, header = {} }) => {
	const token = Utils.getStorageSync('token') || ''
	return new Promise((reslove, reject) => {
		Utils.uploadFile({
			url: `${API_URL}${url}`,
			filePath: reqData.filePath,
			name: reqData.name || 'file',
			formData: { type: 'member-img', token, ...reqData.formData },
			header: { 'content-type': 'multipart/form-data', ...header },
			success: (res) => {
				const _res = JSON.parse(res.data)
				switch (_res.code) {
					case 13:
						Utils.removeStorageSync('token')
						Utils.removeStorageSync('userInfo')
						break
				}
				reslove(_res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export default req
