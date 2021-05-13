import * as React from 'react';
import { View, Text, Image } from 'remax/one';
import { navigateBack, setClipboardData, getStorageSync, previewImage, showLoading, saveImageToPhotosAlbum, showToast, hideLoading } from 'remax/wechat';
import Styles from './index.css';

import { IMG_URL } from '../../api/config'
import Painter from '../../components/painter/painter'
export default class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			info: {},
			imgDraw: {}, //绘制图片的大对象
			sharePath: '', //生成的分享图
		}
	}
	
	componentDidMount() {
		this.setState({
			info: getStorageSync('submitInfo')
		})
	}

	onBack() {
		navigateBack({delta: 1})
	}

	onClickCopy(text) {
		setClipboardData({data: text})
	}

	onReviewImage = () => {
		const { info } = this.state
		previewImage({
			current: info.image || '',
			urls: [info.image || '']
		})
	}

  render() {
		// const { location: {query} } = this.props
		const { info, imgDraw, sharePath } = this.state
    return (
			<View className={Styles.page}>
				<View className={Styles.container}>
					<Image className={Styles.image} src={IMG_URL + info.image} onTap={this.onReviewImage} mode="widthFix"/>
					<View className={Styles.text1}>搭配单号：{info.sn}</View>
					<View className={Styles.text2}>产品编号：{info.title}</View>
					<View className={Styles.text3}>{info.shareText}</View>
					<Image className={Styles.qrcode} src={info.shareImage}/>
					<View>
						<Text className={Styles.btn} onClick={this.drawPic}>保存</Text>
						<Text className={[Styles.btn, Styles['btn-gray']]} onClick={this.onBack}>返回</Text>
					</View>
				</View>

				<Painter style="position: absolute; top: -9999rpx;" palette={imgDraw} times="2" bind:imgOK={this.onImgOK} onImgErr={this.onImgErr}/>
			</View>
		)
  }

	drawPic = () => {
		const { sharePath, info } = this.state
		if (sharePath) { //如果已经绘制过了本地保存有图片不需要重新绘制
			this.onSave(sharePath)
			return
		}
		showLoading({ title: '生成图片中...' })
		this.setState({
			imgDraw: {
				width: '750rpx',
				height: '1334rpx',
				background: '#fff',
				views: [
					{
						type: 'image',
						url: IMG_URL + info.image,
						css: {
							top: '100rpx',
							left: '375rpx',
							align: 'center',
							width: '190rpx',
							height: '324rpx'
						},
					},
					{
						type: 'text',
						text: `搭配单号：${info.sn}`,
						css: {
							top: '448rpx',
							left: '375rpx',
							align: 'center',
							fontSize: '31rpx',
							color: '#838383',
							maxLines: 1,
						}
					},
					{
						type: 'text',
						text: `产品编号：${info.theme_style_id}`,
						css: {
							top: '544rpx',
							left: '375rpx',
							maxLines: 1,
							align: 'center',
							fontSize: '21rpx',
							color: '#757575'
						}
					},
					{
						type: 'text',
						text: `${info.shareText}`,
						css: {
							top: '636rpx',
							left: '375rpx',
							align: 'center',
							textAlign: 'center',
							fontSize: '31rpx',
							color: '#2E2E2E',
							lineHeight: '42rpx',
							fontWeight: 'blod',
							width: '510rpx'
						}
					},
					{
						type: 'image',
						url: info.shareImage,
						css: {
							top: '777rpx',
							left: '325rpx',
							width: '256rpx',
							height: '256rpx'
						}
					}
				]
			}
		})
	}

	onImgOK = ({detail: {path = ''}}) => {
		this.setState({sharePath: path})
		this.onSave(path)
	}
	onImgErr = (err) => {
		hideLoading()
		console.log('err', err)
	}

	onSave = (path) => {
		saveImageToPhotosAlbum({
			filePath: path,
			success: () => showToast({title: '截屏成功，已保存到相册！'}),
			fail: () => {
				hideLoading()
			}
		})
	}
}
