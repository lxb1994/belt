import React, { Component } from 'react'
import { View } from 'remax/one'
import { Canvas } from 'remax/ali'

import Styles from './index.css'

const MODEL_WIDTH = 530
const MODEL_HEIGHT = 760

export default class IndexPage extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<View className={Styles.page}>
				{ /*头部类型选择*/ }
				{ /*<Tabbar list={theme_style_category} onClick={this._onChangeBeltListId}/>*/ }

				{ /*不知名功能*/ }
				{
					/*
					<View className={Styles.planSelectBox}>
						<ModelLists products={modelAll[modelListId] || []} onClick={this.selectModel} />
					</View>
					*/
				}

				{ /*配件选择*/ }
				<View className={Styles.productListsBox}>
					{ /*<ProductLists products={beltAll[beltListId] || []} onClick={this._selectBelt} />*/ }
				</View>

				{ /*人体服装选择*/ }
				<View className={Styles.ModelCategory}>
					{ /* <ModelCategory list={theme_category} models={modelAll} onClick={this._onChangeModelListId} onClickModel={this._selectModel}/> */ }
				</View>

				{/*配件缩小放大按钮*/}
				<View className={Styles.beltOperation}>
					{
						/*
						<Image className={Styles.smallerIcon} src={ICON_SMALLER} onClick={this._beltOperationSmaller} mode="widthFix" />
						<Image className={Styles.enlargeIcon} src={ICON_ENLARGE} onClick={this._beltOperationEnLarger} mode="widthFix" />
						*/
					}
				</View>

				{/*底部按钮列表*/}
				{ /* <IndexBtns reset={this._onReset} confirm={this._onSave} intelligence={this._onIntelligence}/> */ }

				{ /* showRecommendation && <Recommendation mode={recommendationMode} list={modelToBelt} onClick={this._selectRecommendation} onClose={this._onClose.bind(this, 'showRecommendation')}/> */ }

				{ /* <ModelToBelt model={model} belt={belt} turnDirection={turnDirection} beltLeft={beltMoveX || beltLeft} beltTop={beltMoveY || beltTop} scaleValue={scale} beltWidth={beltWidth} beltHeight={beltHeight} beltPX={beltPX} onChange={this._moveBelt} /> */ }
				{ /* !readGuide && <Guide /> */ }
				<Canvas canvasId={'shareCanvas'} style={`width: ${MODEL_WIDTH}px;height: ${MODEL_HEIGHT}px;position: fixed;top: -2000px;left: -2000px;`} />

				{ /* <PreloadImgs list={preloadImgList} onLoadAll={this._onLoadAll}/> */ }
				{ /* loading && <Loading /> */ }
			</View>
		)
	}
}
