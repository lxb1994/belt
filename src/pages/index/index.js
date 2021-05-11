import * as React from 'react';
import { View, Text, Image, navigateTo } from 'remax/one';
import { Canvas, showLoading, getImageInfo, hideLoading, canvasToTempFilePath, chooseImage, createCanvasContext, showToast, getStorageSync, stopPullDownRefresh, showShareMenu, setStorageSync, hideTabBar } from 'remax/wechat';
import Styles from './index.css';

import ProductLists from '../../components/productLists/index'
import ModelLists from '../../components/ModelLists/index'
import IndexBtns from '../../components/indexBtns/index'
import Recommendation from '../../components/recommendation/index'
import ModelToBelt from '../../components/modelToBelt/index'
import Guide from '../../components/guide/index'
import ModelCategory from '../../components/modelCategory/index'
import Tabbar from '../../components/tabbar/index'

import { IMG_URL } from '../../api/config'

import Api from '../../api/index'
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
			readGuide: false
		}

		this.beltMoveX = 0
		this.beltMoveY = 0
		this.scale = 1
		this.windowMultiple = 0
		this.beltMultiple = 0
		this.windowWidth = 0
		this.positionMultiple = 0 
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
				this.beltMultiple = res.windowWidth * 2 / 1080
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
		const {  beltAll, beltListId, belt, modelAll, model, modelListId, theme_style_category, beltLeft, beltTop, beltWidth, beltHeight, theme_category, showRecommendation, modelToBelt, turnDirection, recommendationMode, readGuide } = this.state
		const { beltMoveX, beltMoveY, scale } = this
    return (
			<View className={Styles.page}>
				<Tabbar list={theme_style_category} onClick={this.onChangeBeltListId}/>
				<View className={Styles.planSelectBox}>
					<ModelLists products={modelAll[modelListId] || []} onClick={this.selectModel} />
				</View>
				<View className={Styles.productListsBox}>
					<ProductLists products={beltAll[beltListId] || []} onClick={this.selectBelt} />
				</View>
				<View className={Styles.ModelCategory}>
					<ModelCategory list={theme_category} onClick={this.onChangeModelListId}/>
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
					onChange={this.moveBelt}
				/>
				{!readGuide && <Guide onClose={this.onReaded}/>}
				{/* <Image className={Styles.turnLeft} src={TurnLeft} mode="widthFix" onClick={this.onTurn.bind(this, 'left')}/> */}
				{/* <Image className={Styles.turnRight} src={TurnRight} mode="widthFix" onClick={this.onTurn.bind(this, 'right')}/> */}
				<Canvas canvasId={'shareCanvas'} style="width: 540px;height: 921px;position: fixed;top: -2000px;left: -2000px;"/>
			</View>
		)
  }

	// 选择商品
	selectBelt = (item) => {
		this.scale = 1
		wx.getImageInfo({
			src: IMG_URL + item.image1,
			success: (res) => {
				// console.log('res', res)
				this.setState({ belt: {...item}, beltWidth: res.width * this.beltMultiple, beltHeight: res.height * this.beltMultiple})
			}
		})
	}
	// 选择模特
	selectModel = (item) => {
		// console.log('selectModel', item.image1.x, item.image1.y, this.beltMultiple)
		this.beltMoveX = 0
		this.beltMoveY = 0
		this.setState({
			model: {...item},
			beltLeft: item.image1.x * this.beltMultiple / 2,
			beltTop: item.image1.y * this.beltMultiple / 2,
			belt: {}
		})
	}
	// 智能搭配
	selectRecommendation = (item) => {
		const { recommendationMode } = this.state
		if (recommendationMode === 'model') {
			this.beltMoveX = 0
			this.beltMoveY = 0
			this.setState({ model: {...item}, beltLeft: item.image1.x * this.beltMultiple / 2, beltTop: item.image1.y * this.beltMultiple / 2, showRecommendation: false})
		} else {
			this.scale = 1
			getImageInfo({
				src: IMG_URL + item.image1,
				success: (res) => {
					this.setState({ belt: {...item}, beltWidth: res.width * this.beltMultiple, beltHeight: res.height * this.beltMultiple, beltListId: item.category_ids[0], showRecommendation: false})
				}
			})
		}
	}
	onClose = (name) => {
		this.setState({ [name]: false})
	}

	// 更换腰带列表
	onChangeBeltListId = (item) => {
		this.scale = 1
		this.setState({ beltListId: item.id })
	}

	onChangeModelListId = (item) => {
		this.setState({ modelListId: item.id })
	}

	moveBelt = (x, y, scale) => {
		this.beltMoveX = x
		this.beltMoveY = y
		if (scale) this.scale = scale
		showToast({ title: scale, icon: 'none' })
	}

	async getHomeData() {
		let res = await Api.getHomeData()
		stopPullDownRefresh()
		if (res.code === 1) {
			const { theme, theme_category, theme_style, theme_style_category, theme_to_style } = res.data

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
			this.toLoad([
					theme[0].image1.image,
					...(beltAll[beltListId].map(it => (it.image1)) || [])
				],
				0,
				() => {
					console.log('设置界面数据')
					// console.log('x,y', theme[0].image1.x, theme[0].image1.y, this.beltMultiple)
					this.setState({
						theme,
						theme_style,
						theme_category,
						theme_style_category,
						theme_to_style,
						beltAll,
						beltListId,
						beltLeft: theme[0].image1.x * this.beltMultiple / 2,
						beltTop: theme[0].image1.y * this.beltMultiple / 2,
						modelAll,
						model: theme[0] || {},
						modelListId,
					},
						() => {this.loadAll()}
					)
			})
		}
	}

	// 重置
	onReset = () => {
		this.setState({ belt: {} })
	}

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
		this.setState({showRecommendation: true, recommendationMode, modelToBelt})
	}

	// 转向
	onTurn(direction) {
		let { turnDirection } = this.state
		// let isCanRotate = true
		if (direction === 'left') {
			switch (turnDirection) {
				case 1:
					turnDirection = 3
					break;
				case 3:
					turnDirection = 2
					break;
				case 2:
					turnDirection = 4
					break;
				case 4:
					turnDirection = 1
					break;
			}
		} else {
			switch (turnDirection) {
				case 1:
					turnDirection = 4
					break;
				case 4:
					turnDirection = 2
					break;
				case 2:
					turnDirection = 3
					break;
				case 3:
					turnDirection = 1
					break;
			}
		}
		this.setState({turnDirection})
	}

	onSave = async () => {
		const { belt, model, turnDirection, beltWidth, beltHeight, beltLeft, beltTop } = this.state
		const { beltMoveX, beltMoveY, scale, beltMultiple, windowMultiple, windowWidth } = this
		if (!getStorageSync('token')) {
			showToast({ title: '请前往个人中心登录！', icon: 'none' })
			return
		}
		if (!belt.id || !model.id) {
			showToast({ title: '请先选择搭配！', icon: 'none' })
			return
		}
		showLoading({title: '正在合成...'})
		const modelAndBelt = createCanvasContext('shareCanvas')
		wx.downloadFile({
			url: IMG_URL + model.image1.image,
			success: (modelRes) => {
				// console.log(modelRes.tempFilePath)
				wx.downloadFile({
					url: IMG_URL + belt.image1,
					success: (beltRes) => {
						// console.log(beltRes.tempFilePath)
						const canvasMultiple = 540 / windowWidth
						const left = (beltMoveX || beltLeft) * canvasMultiple
						const top = (beltMoveY || beltTop) * canvasMultiple
						const width = beltWidth / 2 / beltMultiple * windowMultiple
						const height = beltHeight / 2 / beltMultiple * windowMultiple
						modelAndBelt.drawImage(modelRes.tempFilePath, 0, 0, 540, 921)
						modelAndBelt.drawImage(beltRes.tempFilePath, left, top, width * scale, height * scale)
						modelAndBelt.draw(false, () => {
							canvasToTempFilePath({
								canvasId: 'shareCanvas',
								success: (imgRes) => {
									Api.uploadImg({filePath: imgRes.tempFilePath}).then(async uploadRes => {
										if (uploadRes.code !== 1) return showToast({ title: res.msg, icon: 'none' })
										let parmas = {
											theme_id: model.id,
											theme_style_id: belt.id,
											image: uploadRes.data.file
										}
										let res = await Api.createOrder(parmas)
										hideLoading()
										if (res.code !== 1) return showToast({ title: res.error, icon: 'none' })
										setStorageSync('submitInfo', {...parmas, title: belt.title, ...res.data})
										navigateTo({url: '/pages/commit/index?sn=' + res.data.sn})
									})
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

	onFail(text) {
		if (!text) return hideLoading()
		showToast({title: text,icon: 'none'})
	}

	onReaded = () => {
		this.setState({readGuide: true})
	}

	loadAll = () => {
		const {
			beltAll,
			modelAll,
		} = this.state
		const modelArr = Object.keys(modelAll)
		const beltArr = Object.keys(beltAll)
		let allModel = []
		let allBelt = []
		modelArr.map(it => {
			modelAll[it].map(child => {
				allModel.push(child.image1.image)
			})
		})
		beltArr.map(it => {
			beltAll[it].map(child => {
				allBelt.push(child.image1)
			})
		})
		this.toLoad(allModel)
		this.toLoad(beltArr)
	}

	toLoad = (arr = [], num = 0, cb) => {
		if (arr.length === (num + 1)) {
			if (cb) cb()
			return
		}
		getImageInfo({
			src: IMG_URL + arr[num],
			complete: () => {
				// console.log('load:success', num)
				this.toLoad(arr, num + 1, cb)
			}
		})
	}
}
