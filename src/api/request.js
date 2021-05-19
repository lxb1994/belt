import { API_URL } from './config'
import { request, uploadFile, getStorageSync, removeStorageSync } from 'remax/wechat'

let req = {}
req.globalRequest = ({
  url = '',
  reqData = {},
  method = 'GET',
  header = {},
}) => {
  let requestHeader = {
    'Content-Type': 'application/json',
    ...header
  };
	const token = getStorageSync('token') || ''
	return new Promise((reslove, reject) => {
		request({
			url: `${API_URL}${url}`,
			data: {...reqData, token},
			method,
			header: requestHeader,
			success: (res) => {
				switch (res.data.code) {
					case 12:
						removeStorageSync('token')
						removeStorageSync('userInfo')
						break
					case 13:
						removeStorageSync('token')
						removeStorageSync('userInfo')
						break;
				}
				reslove(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

req.upload = ({
	url = '',
	reqData = { filePath: '', formData: {}, name: '' },
	header = {},
}) => {
	const token = getStorageSync('token') || ''
	return new Promise((reslove, reject) => {
		uploadFile({
			url: `${API_URL}${url}`,
			filePath: reqData.filePath,
			name: reqData.name || 'file',
			formData: {type: 'member-img', token, ...reqData.formData},
      header: {
        'content-type': 'multipart/form-data',
				...header
      },
			success: (res) => {
				switch (JSON.parse(res.data).code) {
					case 12:
						removeStorageSync('token')
						removeStorageSync('userInfo')
						break
					case 13:
						removeStorageSync('token')
						removeStorageSync('userInfo')
						break;
				}
				reslove(JSON.parse(res.data))
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export default req