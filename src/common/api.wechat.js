import { stopPullDownRefresh, getFileInfo, getImageInfo, getSystemInfo, previewImage, showToast, navigateTo, setStorageSync, createCanvasContext, downloadFile, canvasToTempFilePath, getStorageSync, saveImageToPhotosAlbum, showLoading, hideLoading } from 'remax/wechat'

export default {
	stopPullDownRefresh,
	getFileInfo,
	getImageInfo,
	getSystemInfo,
	previewImage,
	showToast,
	navigateTo,
	setStorageSync,
	createCanvasContext,
	downloadFile,
	canvasToTempFilePath,
	getStorageSync,
	saveImageToPhotosAlbum,
	getUserProfile: wx.getUserProfile,
	login: wx.login,
	showLoading,
	hideLoading,
}
