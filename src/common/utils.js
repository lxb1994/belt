import API from './api'
import { ISALI, ISWECHAT } from './constants'

const PLATFORM_NAME = process.env.REMAX_PLATFORM

class Utils {
	static stopPullDownRefresh() {
		return new Promise(resolve => {
			API.stopPullDownRefresh({ success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static getImageInfo(obj = { src: '' }) {
		return new Promise(resolve => {
			API.getImageInfo({ src: obj.src, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static getSystemInfo() {
		return new Promise(resolve => {
			API.getSystemInfo({ success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static getFileInfo(obj = { filePath: '', digestAlgorithm: 'md5' }) {
		return new Promise(resolve => {
			const _obj = ISALI ? { apFilePath: obj.filePath, digestAlgorithm: obj.digestAlgorithm } : { filePath: obj.filePath, digestAlgorithm: obj.digestAlgorithm }
			API.getFileInfo({ ..._obj, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static previewImage(obj = { urls: [], current: 0, showMenu: true }) {
		return new Promise(resolve => {
			const _obj = ISALI ? { urls: obj.urls, current: obj.current } : { urls: obj.urls, current: obj.urls[obj.current], showmenu: obj.showMenu }
			API.previewImage({ ..._obj, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static showToast(obj = { title: '', icon: '', image: '', duration: 1500, mask: true }) {
		return new Promise(resolve => {
			const _obj = ISALI ? { content: obj.title, type: obj.icon, duration: obj.duration } : obj
			API.showToast({ ..._obj, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static getStorageSync(key = '') {
		let _res = null
		if (ISALI) _res = API.getStorageSync({ key })
		if (ISWECHAT) _res = API.getStorageSync(key)
		return _res
	}

	static setStorageSync(obj = { key: '', data: '' }) {
		return new Promise(resolve => {
			if (ISALI) {
				API.setStorageSync(obj)
			} else {
				API.setStorageSync(obj.key, obj.data)
			}
			resolve({ code: 200, data: obj.data })
		})
	}

	static removeStorageSync(key = '') {
		let _res = null
		if (ISALI) _res = API.removeStorageSync({ key })
		if (ISWECHAT) _res = API.removeStorageSync(key)
		return _res
	}

	static navigateTo(obj = { url: '', event: {} }) {
		return new Promise(resolve => {
			const _obj = ISALI ? { url: obj.url } : obj
			API.navigateTo({ ..._obj, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static createCanvasContext(id = '') {
		return API.createCanvasContext(id)
	}

	static downloadFile(obj = { url: '', header: {}, timeout: 10 * 1000, filePath: '' }) {
		return new Promise(resolve => {
			const _obj = ISALI ? { url: obj.url, header: obj.header } : obj
			API.downloadFile({ ..._obj, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static canvasToTempFilePath(obj = { ctx: null, canvasId: '', canvas: null, fileType: 'png', quality: 1, x: 0, y: 0, width: 0, height: 0, destWidth: 0, destHeight: 0 }) {
		return new Promise(resolve => {
			let _obj = { x: obj.x, y: obj.y, width: obj.width, height: obj.height, destWidth: obj.destWidth, destHeight: obj.destHeight, fileType: obj.fileType, quality: obj.quality }
			if (ISWECHAT) {
				_obj = { canvasId: obj.canvasId }
				// _obj.canvas = obj.canvas
				API.canvasToTempFilePath({ ..._obj, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
			}
			if (ISALI) obj.ctx.toTempFilePath({ ...obj, success: res => resolve({ code: 200, data: {...res, tempFilePath: res.filePath} }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static sleep(sec = 0.2) {
		return new Promise(resolve => {
			setTimeout(() => resolve(), sec * 1000)
		})
	}

	static saveImageToPhotosAlbum(obj = {showActionSheet: true, filePath: '' }) {
		const FuncName = {ali: 'saveImage', wechat: 'saveImageToPhotosAlbum'}
		const _obj = ISALI ? obj : {filePath: obj.filePath}
		return new Promise(resolve => {
			API[FuncName[PLATFORM_NAME]]({ ..._obj, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static getUserProfile(obj = { desc: '', scopes: ''  }) {
		return new Promise(resolve => {
			const _obj = ISALI ? { scopes: obj.scopes } : { desc: obj.desc }
			API.getUserProfile({ ..._obj, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static login() {
		return new Promise(resolve => {
			API.login({ success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }) })
		})
	}

	static showLoading(obj = { title: '', mask: true, delay: 0 }) {
		const _obj = ISALI ? { content: obj.title, mask: obj.mask, delay: obj.delay } : { title: obj.title, mask: obj.mask }
		return API.showLoading({ ..._obj, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
	}

	static hideLoading(obj = { page: '' }) {
		const _obj = ISALI ? obj : null
		return API.hideLoading(_obj)
	}

	static request(obj = { url: '', data: {}, method: '', header: {} }) {
		const _obj = ISALI ? {...obj, body: obj.data} : obj
		return API.request(_obj)
	}

	static uploadFile(obj = { url: '', name: '', formData: {}, header: {}, filePath: '' }) {
		const _obj = ISALI ? {url: obj.url, fileName: obj.name, fileType: obj.fileType || 'image', filePath: '' } : obj
		return API.uploadFile(_obj)
	}

	static showShareMenu(obj = {withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline']}) {
		const _obj = ISALI ? '' : obj
		return API.showShareMenu(_obj)
	}

	static addToCart(obj = { itemIds: '', exts: '' }) {
		return new Promise(resolve => {
			if (!API.addToCart) resolve({ code: 500, data: null })
			API.addToCart({ itemIds: obj.itemIds, exts: obj.exts, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}

	static showSku(obj = { itemId: '' }) {
		return new Promise(resolve => {
			if (!API.showSku) resolve({ code: 500, data: null })
			API.showSku({ itemId: obj.itemId, success: res => resolve({ code: 200, data: res }), fail: res => resolve({ code: 500, data: res }), complete: res => resolve({ code: 302, data: res }) })
		})
	}
}

export default Utils

