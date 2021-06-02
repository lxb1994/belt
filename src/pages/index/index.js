import * as React from 'react';
import { View, navigateTo, Image } from 'remax/one';
import { Canvas, showLoading, getImageInfo, hideLoading, canvasToTempFilePath, createCanvasContext, showToast, getStorageSync, stopPullDownRefresh, showShareMenu, setStorageSync, hideTabBar, getFileInfo, previewImage } from 'remax/wechat';
import Styles from './index.css';

import ProductLists from '../../components/productLists/index'
// import ModelLists from '../../components/ModelLists/index'
import IndexBtns from '../../components/indexBtns/index'
import Recommendation from '../../components/recommendation/index'
import ModelToBelt from '../../components/modelToBelt/index'
import Guide from '../../components/guide/index'
import ModelCategory from '../../components/modelCategory/index'
import Tabbar from '../../components/tabbar/index'
import PreloadImgs from '../../components/PreloadImgs/index'
import Loading from '../../components/loading/index'

import ICON_ENLARGE from '../../assets/enlarge.png'
import ICON_SMALLER from '../../assets/smaller.png'

import { IMG_URL } from '../../api/config'

import Api from '../../api/index'
const MODEL_WIDTH = 530
const MODEL_HEIGHT = 760
const BELT_CHANGE = 5
export default class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			theme: [],
			theme_style_category: [],
			theme_category: [],
			theme_to_style: [],
			theme_style: [],
			showRecommendation: false,
			recommendationMode: 'belt',
			modelToBelt: [],
			// 腰带
			beltAll: {},
			beltListId: '',
			belt: {},
			beltLeft: 0,
			beltTop: 0,
			beltWidth: 0,
			beltHeight: 0,
			// 模特
			modelAll: {},
			model: {},
			modelListId: '',
			// 当前转向
			turnDirection: 1,
			readGuide: false,
			preloadImgList: [],
			beltPX: 0,
			loading: false
		}

		this.beltMoveX = 0
		this.beltMoveY = 0
		this.scale = 1
		this.windowMultiple = 0
		this.beltMultiple = 0
		this.windowWidth = 0
		this.temPicture = ''
	}

  componentDidMount() {
		showShareMenu({  withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] })
  }

	onPullDownRefresh() {
		this.getHomeData();
	}

	onShow() {
		wx.getSystemInfo({
			success: (res) => {
				this.windowWidth = res.windowWidth
				this.windowMultiple = res.windowWidth / 375
				this.beltMultiple = res.windowWidth / MODEL_WIDTH
				this.getHomeData();
			}
		})
	}

	onShareAppMessage() {
		return { title: ' 快来DIY腰饰搭配，秒变时髦“小腰精”！' }
	}

	onShareTimeline() {
		return { title: ' 快来DIY腰饰搭配，秒变时髦“小腰精”！' }
	}

  render() {
		const {  beltAll, beltListId, belt, modelAll, model, modelListId, theme_style_category, beltLeft, beltTop, beltWidth, beltHeight, theme_category, showRecommendation, modelToBelt, turnDirection, recommendationMode, readGuide, preloadImgList, beltPX, loading } = this.state
		const { beltMoveX, beltMoveY, scale } = this
    return (
			<View className={Styles.page}>
				<Tabbar list={theme_style_category} onClick={this.onChangeBeltListId}/>
				{/* <View className={Styles.planSelectBox}>
					<ModelLists products={modelAll[modelListId] || []} onClick={this.selectModel} />
				</View> */}
				<View className={Styles.productListsBox}>
					<ProductLists products={beltAll[beltListId] || []} onClick={this.selectBelt} />
				</View>
				<View className={Styles.ModelCategory}>
					<ModelCategory list={theme_category} models={modelAll} onClick={this.onChangeModelListId} onClickModel={this.selectModel}/>
				</View>
				<View className={Styles.beltOperation}>
					<Image className={Styles.smallerIcon} src={ICON_SMALLER} onClick={this.beltOperation.bind(this, 'smaller')} mode="widthFix"/>
					<Image className={Styles.enlargeIcon} src={ICON_ENLARGE} onClick={this.beltOperation.bind(this, 'enlarge')} mode="widthFix"/>
				</View>

				<IndexBtns reset={this.onReset} confirm={this.onSave} intelligence={this.onIntelligence}/>

				{showRecommendation && <Recommendation mode={recommendationMode} list={modelToBelt} onClick={this.selectRecommendation} onClose={this.onClose.bind(this, 'showRecommendation')}/>}

				<ModelToBelt
					model={model}
					belt={belt}
					turnDirection={turnDirection}
					beltLeft={beltMoveX || beltLeft}
					beltTop={beltMoveY || beltTop}
					scaleValue={scale}
					beltWidth={beltWidth}
					beltHeight={beltHeight}
					beltPX={beltPX}
					onChange={this.moveBelt}
				/>
				{!readGuide && <Guide />}
				<Canvas canvasId={'shareCanvas'} style={`width: ${MODEL_WIDTH}px;height: ${MODEL_HEIGHT}px;position: fixed;top: -2000px;left: -2000px;`}/>

				<PreloadImgs list={preloadImgList} onLoadAll={this.onLoadAll}/>
				{loading && <Loading />}
			</View>
		)
  }

	// 选择腰带商品
	selectBelt = (item) => {
		this.scale = 1
		this.temPicture = ''
		wx.getImageInfo({
			src: IMG_URL + item.image1,
			success: (res) => {
				// console.log('res', res)
				this.setState({ belt: {...item}, beltWidth: res.width * this.beltMultiple, beltHeight: res.height * this.beltMultiple, beltPX: 0})
			}
		})
	}
	// 选择模特
	selectModel = (item) => {
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
	// 智能搭配事件
	selectRecommendation = (item) => {
		const { recommendationMode } = this.state
		if (recommendationMode === 'model') {
			this.beltMoveX = 0
			this.beltMoveY = 0
			this.temPicture = ''
			this.setState({ model: {...item}, beltLeft: item.image1.x * this.beltMultiple / 2, beltTop: item.image1.y * this.beltMultiple / 2, showRecommendation: false})
		} else {
			this.temPicture = ''
			this.scale = 1
			getImageInfo({
				src: IMG_URL + item.image1,
				success: (res) => {
					this.setState({ belt: {...item}, beltWidth: res.width * this.beltMultiple, beltHeight: res.height * this.beltMultiple, beltListId: item.category_ids[0], showRecommendation: false, beltPX: 0})
				}
			})
		}
	}

	onClose = (name) => {
		this.setState({ [name]: false})
	}

	// 更换腰带列表
	onChangeBeltListId = (item) => {
		const { beltAll } = this.state
		this.scale = 1
		this.setState({
			preloadImgList: []
		}, () => {
			// 产品要求点击后先load一下图片延迟100ms再触发点击效果
			setTimeout(() => {
				this.setState({ beltListId: item.id })
			}, 100);
		})
	}

	/**
	 * 切换模特列表
	 * @param {*} item 列表信息
	 */
	onChangeModelListId = (item) => {
		this.setState({ modelListId: item.id })
	}

	/**
	 * 移动腰带
	 * @param {*} x
	 * @param {*} y 
	 * @param {*} scale 
	 */
	moveBelt = (x, y, scale) => {
		this.temPicture = ''
		this.beltMoveX = x
		this.beltMoveY = y
		if (scale) this.scale = scale
	}

	/**
	 * 获取首页数据
	 */
	async getHomeData(isRefresh) {
		let res = await Api.getHomeData()
		stopPullDownRefresh()
		if (res.code === 1) {
			const { theme, theme_category, theme_style, theme_style_category, theme_to_style } = res.data
			
			// 返回的是所有的数据，需要对各模特、腰带数据进行组装
			// 区分各饰品分类数组
			let beltAll = {}
			let beltListId = theme_style_category[0].id
			theme_style_category.map(it => { beltAll[it.id] = []})
			theme_style.map(it => {
				it.category_ids.map(child => {
					beltAll[child].push(it)
				})
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
			if (this.state.modelListId) {
				this.setState({
					theme,
					theme_style,
					theme_category,
					theme_style_category,
					theme_to_style,
					beltAll,
					modelAll
				})
			} else {
				this.setState({
					theme,
					theme_style,
					theme_category,
					theme_style_category,
					theme_to_style,
					beltAll,
					beltListId,
					beltLeft: modelAll[modelListId][0].image1.x * this.beltMultiple / 2,
					beltTop: modelAll[modelListId][0].image1.y * this.beltMultiple / 2,
					modelAll,
					model: modelAll[modelListId][0] || {},
					modelListId,
					preloadImgList: [modelAll[modelListId][0].image1.image, ...(beltAll[beltListId].map(it => (it.image1)) || [])]
				})
			}
		}
	}

	// 预览腰带
	onReset = () => {
		// this.setState({ belt: {} })
		// console.log('this.temPicture', this.temPicture)
		if (this.temPicture) {
			getFileInfo({
				filePath: this.temPicture,
				success: () => {
					previewImage({
						current: this.temPicture,
						urls: [this.temPicture]
					})
				},
				fail: () => {
					this.onSave('preview')
				}
			})
			return
		}
		this.onSave('preview')
	}

	/**
	 * 智能推荐
	 */
	onIntelligence = () => {
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
		this.setState({showRecommendation: true, recommendationMode, modelToBelt})
	}

	/**
	 * 合成图片
	 * @param {*} type 是否为预览
	 */
	onSave = async (type) => {
		const { belt, model } = this.state
		if (!getStorageSync('token')) {
			showToast({ title: '请前往个人中心登录！', icon: 'none' })
			return
		}
		if (!belt.id || !model.id) {
			showToast({ title: '请先选择搭配！', icon: 'none' })
			return
		}
		if (this.temPicture && !type) {
			getFileInfo({
				filePath: this.temPicture,
				success: () => {
					this.onCommit(this.temPicture)
				},
				fail: () => {
					this.onCompose()
				}
			})
			return
		}
		this.onCompose(type)
	}

	/**
	 * 合成图片
	 * @param {*} type 是否为预览 
	 */
	onCompose = (type) => {
		const { belt, model, turnDirection, beltWidth, beltHeight, beltLeft, beltTop, beltPX } = this.state
		const { beltMoveX, beltMoveY, scale, beltMultiple, windowMultiple, windowWidth } = this
		this.setState({loading: true})
		// showLoading({title: '正在合成...'})
		const modelAndBelt = createCanvasContext('shareCanvas')
		wx.downloadFile({
			url: IMG_URL + model.image1.image,
			success: (modelRes) => {
				// console.log(modelRes.tempFilePath)
				wx.downloadFile({
					url: IMG_URL + belt.image1,
					success: (beltRes) => {
						// console.log(beltRes.tempFilePath)
						const canvasMultiple = MODEL_WIDTH / windowWidth
						const left = (beltMoveX || beltLeft) * canvasMultiple
						const top = ((beltMoveY || beltTop)) * canvasMultiple
						const width = (beltWidth + beltPX) / 2 / beltMultiple * windowMultiple
						const height = (beltHeight + beltPX * beltHeight / beltWidth) / 2 / beltMultiple * windowMultiple
						modelAndBelt.fillStyle = '#fff'
						modelAndBelt.fillRect(0, 0, MODEL_WIDTH, MODEL_HEIGHT)
						modelAndBelt.drawImage(modelRes.tempFilePath, 0, 0, MODEL_WIDTH, MODEL_HEIGHT)
						modelAndBelt.drawImage(beltRes.tempFilePath, left, top, width, height)
						modelAndBelt.draw(false, () => {
							canvasToTempFilePath({
								canvasId: 'shareCanvas',
								success: (imgRes) => {
									if (type === 'preview') {
										this.temPicture = imgRes.tempFilePath
										previewImage({
											current: imgRes.tempFilePath,
											urls: [imgRes.tempFilePath]
										})
										this.setState({loading: false})
										return
									}
									this.onCommit(imgRes.tempFilePath)
								},
								fail: this.onFail.bind(this, '合成失败，请重新尝试！')
							});
						})
					},
					fail: this.onFail
				})
			},
			fail: this.onFail
		})
	}

	/**
	 * 请求为个人搭配
	 * @param {*} tempFilePath 图片临时路径
	 */
	onCommit = (tempFilePath) => {
		const { belt, model} = this.state
		Api.uploadImg({filePath: tempFilePath}).then(async uploadRes => {
			if (uploadRes.code !== 1) {
				showToast({ title: uploadRes.msg || '网络波动，请稍后重试！', icon: 'none' })
				this.setState({loading: false})
				return
			}
			let parmas = {
				theme_id: model.id,
				theme_style_id: belt.id,
				image: uploadRes.data.file
			}
			let res = await Api.createOrder(parmas)
			this.setState({loading: false})
			if (res.code !== 1) return showToast({ title: res.msg || '网络波动，请稍后重试！', icon: 'none' })
			setStorageSync('submitInfo', {...parmas, title: belt.title, ...res.data})
			navigateTo({url: '/pages/commit/index?sn=' + res.data.sn})
		})
	}

	/**
	 * 失败提示语
	 */
	onFail(text) {
		if (text) showToast({title: text || '网络波动，请稍后重试！',icon: 'none'})
		this.setState({loading: false})
	}

	/**
	 * 首屏加载完图片隐藏banner
	 */
	onLoadAll = () => {
		// console.log('loadAll')
		setTimeout(() => {
			this.setState({readGuide: true})
		}, 500);
	}

	/**
	 * 变大变小
	 * @param {*} type 放大/缩小
	 */
	beltOperation = (type) => {
		let { beltPX, belt, beltWidth } = this.state
		if (!belt.id) return
		// 最多变化为腰带大小2倍
		const maxWidth = beltWidth
		const minWidth = -beltWidth / 3 * 1
		if (type === 'enlarge' && beltPX < maxWidth) beltPX = beltPX + BELT_CHANGE
		if (type === 'smaller' && beltPX > minWidth) beltPX = beltPX - BELT_CHANGE
		this.temPicture = ''
		this.setState({beltPX})
	}
}
