import { stopPullDownRefresh, getFileInfo, getImageInfo, getSystemInfo, previewImage, showToast, navigateTo, setStorageSync, createCanvasContext, downloadFile, canvasToTempFilePath, getStorageSync, showLoading, hideLoading } from 'remax/wechat'

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
	getUserProfile: wx.getUserProfile,
	login: wx.login,
	showLoading,
	hideLoading,
}
