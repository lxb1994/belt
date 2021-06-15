import * as React from 'react'
import { View, Image } from 'remax/one'
import Canvas from '../../components/Canvas'

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

import { onLoadAll, onShowFunc, getHomeData, selectModel, onChangeModelListId, selectBelt, onChangeBeltListId, onReset, onCommit, selectRecommendation, onClose, moveBelt, beltOperation, onIntelligence, onSave, onCompose, onFail, showShareMenu, onBtns } from './module.js'
import Styles from './index.css'

const MODEL_WIDTH = 530
const MODEL_HEIGHT = 760

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

		this._onLoadAll = onLoadAll.bind(this)
		this._onShowFunc = onShowFunc.bind(this)
		this._getHomeData = getHomeData.bind(this)
		this._selectModel = selectModel.bind(this)
		this._onChangeModelListId = onChangeModelListId.bind(this)
		this._selectBelt = selectBelt.bind(this)
		this._onChangeBeltListId = onChangeBeltListId.bind(this)
		this._onReset = onReset.bind(this)
		this._onCommit = onCommit.bind(this)
		this._selectRecommendation = selectRecommendation.bind(this)
		this._onClose = onClose.bind(this)
		this._moveBelt = moveBelt.bind(this)
		this._beltOperationSmaller = beltOperation.bind(this, 'smaller')
		this._beltOperationEnLarger = beltOperation.bind(this, 'enlarge')
		this._onIntelligence = onIntelligence.bind(this)
		this._onSave = onSave.bind(this)
		this._onCompose = onCompose.bind(this)
		this._onFail = onFail.bind(this)
		this._showShareMenu = showShareMenu.bind(this)
		this._onBtns = onBtns.bind(this)

		this.beltMoveX = 0
		this.beltMoveY = 0
		this.scale = 1
		this.windowMultiple = 0
		this.beltMultiple = 0
		this.windowWidth = 0
		this.temPicture = ''
	}

  componentDidMount() {
		this._showShareMenu()
  }

	onShow() {
		this._onShowFunc()
	}

  render() {
		const {  beltAll, beltListId, belt, modelAll, model, modelListId, theme_style_category, beltLeft, beltTop, beltWidth, beltHeight, theme_category, showRecommendation, modelToBelt, turnDirection, recommendationMode, readGuide, preloadImgList, beltPX, loading } = this.state
		const { beltMoveX, beltMoveY, scale } = this
    return (
			<View className={Styles.page}>
				{ /*头部类型选择*/ }
				<Tabbar list={theme_style_category} onClick={this._onChangeBeltListId}/>

				{ /*不知名功能*/ }
				{/* <View className={Styles.planSelectBox}>
					<ModelLists products={modelAll[modelListId] || []} onClick={this.selectModel} />
				</View> */}

				{ /*配件选择*/ }
				<View className={Styles.productListsBox}>
					<ProductLists products={beltAll[beltListId] || []} onClick={this._selectBelt} />
				</View>

				{ /*人体服装选择*/ }
				<View className={Styles.ModelCategory}>
					<ModelCategory list={theme_category} models={modelAll} onClick={this._onChangeModelListId} onClickModel={this._selectModel}/>
				</View>

				{/*配件缩小放大按钮*/}
				<View className={Styles.beltOperation}>
					<Image className={Styles.smallerIcon} src={ICON_SMALLER} onClick={this._beltOperationSmaller} mode="widthFix"/>
					<Image className={Styles.enlargeIcon} src={ICON_ENLARGE} onClick={this._beltOperationEnLarger} mode="widthFix"/>
				</View>

				{/*底部按钮列表*/}
				<IndexBtns reset={this._onReset} confirm={this._onSave} intelligence={this._onIntelligence} onClick={this._onBtns}/>

				{showRecommendation && <Recommendation mode={recommendationMode} list={modelToBelt} onClick={this._selectRecommendation} onClose={this._onClose.bind(this, 'showRecommendation')}/>}

				<ModelToBelt model={model} belt={belt} turnDirection={turnDirection} beltLeft={beltMoveX || beltLeft} beltTop={beltMoveY || beltTop} scaleValue={scale} beltWidth={beltWidth} beltHeight={beltHeight} beltPX={beltPX} onChange={this._moveBelt} />
				{!readGuide && <Guide />}
				<Canvas canvasId={'shareCanvas'} style={`width: ${MODEL_WIDTH}px;height: ${MODEL_HEIGHT}px;position: fixed;top: -2000px;left: -2000px;`}/>

				<PreloadImgs list={preloadImgList} onLoadAll={this._onLoadAll}/>
				{loading && <Loading />}
			</View>
		)
  }

	onPullDownRefresh() {
		this._getHomeData()
	}

	onShareAppMessage() {
		return { title: ' 快来DIY腰饰搭配，秒变时髦“小腰精”！' }
	}

	onShareTimeline() {
		return { title: ' 快来DIY腰饰搭配，秒变时髦“小腰精”！' }
	}
}

