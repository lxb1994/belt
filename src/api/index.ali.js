import { Cloud } from '@tbmp/mp-cloud-sdk'

const _cloud = new Cloud()
_cloud.init({ env: 'test' })

const serverless = {
	login: () => {},

	register: () => {},

	getBanner: () => {
		return new Promise(reslove => {
			_cloud.function.invoke('index', {},'get_banner').then(res => {  
				reslove(res)
			}).catch(err => {
				reslove({ code: 500, msg: err.toString() })
			})
		})
	},
	getHomeData: () => {
		return new Promise(reslove => {
			_cloud.function.invoke('index', {},'get_theme').then(res => {  
				reslove(res)
			}).catch(err => {
				reslove({ code: 500, msg: err.toString() })
			})
		})
	},
	getColor: () => {
		return new Promise(reslove => {
			_cloud.function.invoke('index', {},'get_color').then(res => {  
				reslove(res)
			}).catch(err => {
				reslove({ code: 500, msg: err.toString() })
			})
		})
	},

	createOrder: () => {},

	addVisitLog: () => {},

	getVisitHistory: () => {},

	uploadImg: () => {},

	delCommit: () => {},
}

export default serverless

