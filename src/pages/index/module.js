import Utils from '../../common/utils'
import { PLATFORM } from '../../common/constants'
import Api from '../../api/index'
import { IMG_URL } from '../../api/config'
import { ISALI } from '../../common/constants'

const MODEL_WIDTH = 530
const MODEL_HEIGHT = 760
const BELT_CHANGE = 5

/*
 * 首屏加载完图片隐藏banner
 */
export function onLoadAll() {
	// console.log('loadAll')
	setTimeout(() => {
		this.setState({ readGuide: true })
	}, 500)
}

/*
 * 设置图片
 */
export function onShowFunc() {
	Utils.getSystemInfo().then(res => {
		if (res.code !== 200) return
		this.windowWidth = res.data.windowWidth
		this.windowMultiple = res.data.windowWidth / 375
		this.beltMultiple = res.data.windowWidth / MODEL_WIDTH
		this._getHomeData()
	})
}

/*
 * 获取首页数据
 */
export async function getHomeData(isRefresh) {
	let res = await Api.getHomeData()
	Utils.stopPullDownRefresh()
	if (res.code === 1) {
		const { theme, theme_category, theme_style, theme_style_category, theme_to_style } = res.data
		// 返回的是所有的数据，需要对各模特、腰带数据进行组装
		// 区分各饰品分类数组
		let beltAll = {}
		let beltListId = theme_style_category[0].id
		theme_style_category.map(it => beltAll[it.id] = [])
		theme_style.map(it => {
			it.category_ids.map(child => beltAll[child].push(it))
		})
		// 区分模特各分类数组
		let modelAll = {}
		let modelListId = theme_category[0].id
		theme_category.map(it => { modelAll[it.id] = [] })
		theme.map(it => {
			it.category_ids.map(child => {
				modelAll[child].push(it)
			})
		})
		if (this.state.modelListId) return this.setState({ theme, theme_style, theme_category, theme_style_category, theme_to_style, beltAll, modelAll })
		this.setState({ theme, theme_style, theme_category, theme_style_category, theme_to_style, beltAll, beltListId, beltLeft: modelAll[modelListId][0].image1.x * this.beltMultiple / 2, beltTop: modelAll[modelListId][0].image1.y * this.beltMultiple / 2, modelAll, model: modelAll[modelListId][0] || {}, modelListId, preloadImgList: [modelAll[modelListId][0].image1.image, ...(beltAll[beltListId].map(it => (it.image1)) || [])] })
	}
}

/*
 * 选择模特
 */
export function selectModel(item) {
	// console.log('selectModel', item.image1.x, item.image1.y, this.beltMultiple)
	this.beltMoveX = 0
	this.beltMoveY = 0
	this.temPicture = ''
	this.setState({
		model: {...item},
		beltLeft: item.image1.x * this.beltMultiple / 2,
		beltTop: item.image1.y * this.beltMultiple / 2,
		belt: {}
	})
}

/*
 * 切换模特列表
 * @param {*} item 列表信息
 */
export function onChangeModelListId(item) {
	this.setState({ modelListId: item.id })
}

/*
 * 选择腰带商品
 */
export async function selectBelt(item) {
	this.scale = 1
	this.temPicture = ''
	const _getImageInfoRes = await Utils.getImageInfo({ src: IMG_URL + item.image1 })
	if (_getImageInfoRes.code !== 200) return
	this.setState({ belt: {...item}, beltWidth: _getImageInfoRes.data.width * this.beltMultiple, beltHeight: _getImageInfoRes.data.height * this.beltMultiple, beltPX: 0})
}

/*
 * 更换腰带列表
 */
export async function onChangeBeltListId(item) {
	const { beltAll } = this.state
	this.scale = 1
	await this.setState({ preloadImgList: [] })
	// 产品要求点击后先load一下图片延迟100ms再触发点击效果
	setTimeout(() => this.setState({ beltListId: item.id }), 100)
}

/*
 * 预览腰带
 */
export async function onReset() {
	// this.setState({ belt: {} })
	if (!this.temPicture) return this._onSave('preview')
	const _res = await Utils.getFileInfo({ filePath: this.temPicture, digestAlgorithm: 'md5' })
	if (_res.code !== 200) return this._onSave('preview')
	Utils.previewImage({ urls: [ this.temPicture ], current: 0, showMenu: true })
}

/*
 * 请求为个人搭配
 * @param {*} tempFilePath 图片临时路径
 */
export function onCommit(tempFilePath) {
	const { belt, model} = this.state
	Api.uploadImg({ filePath: tempFilePath }).then(async uploadRes => {
		if (uploadRes.code !== 1) {
			Utils.showToast({ title: uploadRes.msg || '网络波动，请稍后重试！', icon: 'none' })
			return this.setState({ loading: false })
		}
		let parmas = { theme_id: model.id, theme_style_id: belt.id, image: uploadRes.data.file }
		let res = await Api.createOrder(parmas)
		this.setState({ loading: false })
		if (res.code !== 1) return Utils.showToast({ title: res.msg || '网络波动，请稍后重试！', icon: 'none' })
		Utils.setStorageSync({ key: 'submitInfo', data: { ...parmas, title: belt.title, ...res.data } })
		Utils.navigateTo({ url: '/pages/commit/index?sn=' + res.data.sn })
	})
}

/*
 * 智能搭配事件
 */
export async function selectRecommendation(item) {
	const { recommendationMode } = this.state
	if (recommendationMode === 'model') {
		this.beltMoveX = 0
		this.beltMoveY = 0
		this.temPicture = ''
		this.setState({ model: {...item}, beltLeft: item.image1.x * this.beltMultiple / 2, beltTop: item.image1.y * this.beltMultiple / 2, showRecommendation: false})
	} else {
		this.temPicture = ''
		this.scale = 1
		const _getImageInfoRes = await Utils.getImageInfo({ src: IMG_URL + item.image1 })
		this.setState({ belt: { ...item }, beltWidth: _getImageInfoRes.data.width * this.beltMultiple, beltHeight: _getImageInfoRes.data.height * this.beltMultiple, beltListId: item.category_ids[0], showRecommendation: false, beltPX: 0 })

	}
}

/*
 *
 */
export function onClose(name) {
	this.setState({ [name]: false })
}

/*
 * 移动腰带
 * @param {*} x
 * @param {*} y 
 * @param {*} scale 
 */
export function moveBelt(x, y, scale) {
	this.temPicture = ''
	this.beltMoveX = x
	this.beltMoveY = y
	if (scale) this.scale = scale
}

/*
 * 变大变小
 * @param {*} type 放大/缩小
 */
export function beltOperation(type) {
	let { beltPX, belt, beltWidth } = this.state
	if (!belt.id) return
	// 最多变化为腰带大小2倍
	const maxWidth = beltWidth
	const minWidth = -beltWidth / 3 * 1
	if (type === 'enlarge' && beltPX < maxWidth) beltPX = beltPX + BELT_CHANGE
	if (type === 'smaller' && beltPX > minWidth) beltPX = beltPX - BELT_CHANGE
	this.temPicture = ''
	this.setState({ beltPX })
}

/*
 * 智能推荐
 */
export function onIntelligence() {
	const { model, belt, theme_to_style, theme, theme_style } = this.state
	let modelToBelt = []
	let recommendationMode = ''
	if (belt.id) {
		let modelIdArr = []
		theme_to_style.map(item => {
			if (item.theme_style_id === belt.id) modelIdArr.push(item.theme_id)
		})
		theme.map(item => {
			if (modelIdArr.indexOf(item.id) > -1) modelToBelt.push(item)
		})
		recommendationMode = 'model'
	} else {
		let beltIdArr = []
		theme_to_style.map(item => {
			if (item.theme_id === model.id) beltIdArr.push(item.theme_style_id)
		})
		theme_style.map(item => {
			if (beltIdArr.indexOf(item.id) > -1) modelToBelt.push(item)
		})
		recommendationMode = 'belt'
	}
	this.temPicture = ''
	this.setState({ showRecommendation: true, recommendationMode, modelToBelt })
}

/*
 * 合成图片
 * @param {*} type 是否为预览
 */
export async function onSave(type) {
	const { belt, model } = this.state
	if (!Utils.getStorageSync('token')) return Utils.showToast({ title: '请前往个人中心登录！', icon: 'none' })
	if (!belt.id || !model.id) return Utils.showToast({ title: '请先选择搭配！', icon: 'none' })
	if (this.temPicture && !type) {
		const _getFileInfoRes = await Utils.getFileInfo({ filePath: this.temPicture, digestAlgorithm: 'md5' })
		if (_getFileInfoRes.code !== 200) return this._onCompose()
		return this._onCommit(this.temPicture)
	}
	this._onCompose(type)
}

/*
 * 合成图片
 * @param {*} type 是否为预览 
 */
export async function onCompose(type) {
	const { belt, model, turnDirection, beltWidth, beltHeight, beltLeft, beltTop, beltPX } = this.state
	const { beltMoveX, beltMoveY, scale, beltMultiple, windowMultiple, windowWidth } = this
	const _platform = { wechat: 'tempFilePath', ali: 'filePath' }
	this.setState({ loading: true })
	// showLoading({title: '正在合成...'})
	const modelAndBelt = Utils.createCanvasContext('shareCanvas')
	const [ _downloadFileModelRes, _downloadFileBeltRes ] = await Promise.all([ Utils.downloadFile({ url: IMG_URL + model.image1.image }), Utils.downloadFile({ url: IMG_URL + belt.image1 }) ])
	if (_downloadFileModelRes.code !== 200 || _downloadFileBeltRes.code !== 200) this._onFail()

	// console.log(beltRes.tempFilePath)
	const ModelImage = ISALI ? IMG_URL + model.image1.image : _downloadFileModelRes.data.tempFilePath
	const BeltImage = ISALI ? IMG_URL + belt.image1 : _downloadFileBeltRes.data.tempFilePath
	const canvasMultiple = MODEL_WIDTH / windowWidth
	const left = (beltMoveX || beltLeft) * canvasMultiple
	const top = ((beltMoveY || beltTop)) * canvasMultiple
	const width = (beltWidth + beltPX) / 2 / beltMultiple * windowMultiple
	const height = (beltHeight + beltPX * beltHeight / beltWidth) / 2 / beltMultiple * windowMultiple
	modelAndBelt.fillStyle = '#fff'
	modelAndBelt.fillRect(0, 0, MODEL_WIDTH, MODEL_HEIGHT)
	modelAndBelt.drawImage(ModelImage, 0, 0, MODEL_WIDTH, MODEL_HEIGHT)
	modelAndBelt.drawImage(BeltImage, left, top, width, height)
	modelAndBelt.draw(false)
	await Utils.sleep(1)
	const _tempPathRes = await Utils.canvasToTempFilePath({ ctx: modelAndBelt, canvasId: 'shareCanvas', width: MODEL_WIDTH, height: MODEL_HEIGHT, destWidth: MODEL_WIDTH, destHeight: MODEL_HEIGHT, fileType: 'png' } )
	if (_tempPathRes.code !== 200) return this._onFail('合成失败，请重新尝试！')
	const _filePath = _tempPathRes.data[_platform[PLATFORM]]
	if (type === 'preview') {
		this.temPicture = _filePath
		Utils.previewImage({ urls: [ _filePath ], current: 0, showMenu: true })
		return this.setState({ loading: false })
	}
	this._onCommit(this.temPicture)
}

/*
 * 失败提示语
 */
export function onFail(text) {
	if (text) showToast({title: text || '网络波动，请稍后重试！',icon: 'none'})
	this.setState({ loading: false })
}

export function showShareMenu(params) {
	Utils.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] })
}
