import * as React from 'react';
import { View, Text, Image } from 'remax/one';
import { Canvas } from 'remax/ali'
import Styles from './index.css';
import { init, onReviewImage, onBack, onImgErr, onImgOK, drawPic, onSave } from './module.js'

import { IMG_URL } from '../../api/config'
import Loading from '../../components/loading/index'
export default class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			info: {},
			imgDraw: {}, //绘制图片的大对象
			sharePath: '', //生成的分享图
			loading: false
		}

		this._init = init.bind(this)
		this._onReviewImage = onReviewImage.bind(this)
		this._onBack = onBack.bind(this)
		this._onImgErr = onImgErr.bind(this)
		this._onImgOK = onImgOK.bind(this)
		this._drawPic = drawPic.bind(this)
		this._onSave = onSave.bind(this)
	}
	
	componentDidMount() {
		this._init()
	}

  render() {
		const { info, imgDraw, loading } = this.state
    return (
			<View className={Styles.page}>
				<View className={Styles.container}>
					<Image className={Styles.image} src={IMG_URL + info.image} onTap={this._onReviewImage} mode="heightFix"/>
					<View className={Styles.text1}>搭配单号：{info.sn}</View>
					<View className={Styles.text2}>产品编号：{info.title}</View>
					<View className={Styles.text3}>{info.shareText}</View>
					<Image className={Styles.qrcode} src={info.shareImage}/>
					<View>
						<Text className={Styles.btn} onClick={this._drawPic}>点此截图</Text>
						<Text className={[Styles.btn, Styles['btn-gray']]} onClick={this._onBack}>返回</Text>
					</View>
				</View>

				<Canvas style="position: absolute; top: -9999rpx;"/>
				{loading && <Loading />}
			</View>
		)
  }
}
