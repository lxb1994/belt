import Utils from '../../common/utils'
import { navigateBack } from 'remax/one'
import Api from '../../api/index'
import { IMG_URL } from '../../api/config'

/**
 * canvas画当前界面截图
 */
export function drawPic(){
	const { sharePath, info } = this.state
	if (sharePath) { //如果已经绘制过了本地保存有图片不需要重新绘制
		this._onSave(sharePath)
		return
	}
	this.setState({loading: true})
	// showLoading({ title: '生成图片中...' })
	this.setState({
		imgDraw: {
			width: '750rpx',
			height: '1234rpx',
			background: '#fff',
			views: [
				{
					type: 'image',
					url: IMG_URL + info.image,
					css: {
						top: '50rpx',
						left: '375rpx',
						align: 'center',
						width: '246rpx',
						height: '352.74rpx'
					},
				},
				{
					type: 'text',
					text: `搭配单号：${info.sn}`,
					css: {
						top: '488rpx',
						left: '375rpx',
						align: 'center',
						fontSize: '24rpx',
						color: '#838383',
						maxLines: 1,
					}
				},
				{
					type: 'text',
					text: `产品编号：${info.theme_style_id}`,
					css: {
						top: '584rpx',
						left: '375rpx',
						maxLines: 1,
						align: 'center',
						fontSize: '24rpx',
						color: '#757575'
					}
				},
				{
					type: 'text',
					text: `${info.shareText}`,
					css: {
						top: '676rpx',
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
						top: '867rpx',
						left: '245rpx',
						width: '256rpx',
						height: '256rpx'
					}
				}
			]
		}
	})
}

/**
 * 当canvas画截图成功后
 */
export function onImgOK({detail: {path = ''}}) {
	this.setState({sharePath: path})
	console.log('path', path)
	this._onSave(path)
}
/**
 * 失败提示语
 */
export function onImgErr(err) {
	Utils.showToast({title: '截图失败，请稍后尝试', icon: 'none'})
}

/**
 * 图片保存到相册
 * @param {*} filePath
 */
export async function onSave(filePath){
	const res = await Utils.saveImageToPhotosAlbum({filePath})
	this.setState({loading: false})
	console.log('res', res.code)
	if (res.code !== 200) return Utils.showToast({title: '截屏失败！', icon: 'none'})
	Utils.showToast({title: '截屏成功，已保存到相册！'})
}

/**
 * 返回按钮
 */
export function onBack() {
	navigateBack({delta: 1})
}

/**
 * 预览图片
 */
export function onReviewImage() {
	const { info } = this.state
	Utils.previewImage({ current: 0, urls: [IMG_URL + info.image || '']})
}

/**
 * 初始化页面内容
 */
export function init() {
	this.setState({ info: Utils.getStorageSync('submitInfo') })
}