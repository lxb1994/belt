import { stopPullDownRefresh, getFileInfo, getImageInfo, getSystemInfo, previewImage, showToast, navigateTo, setStorageSync, createCanvasContext, downloadFile, getStorageSync, saveImage, showLoading, hideLoading, removeStorageSync, uploadFile, request } from 'remax/ali'
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
	getStorageSync,
	saveImage,
	getUserProfile: my.authorize,
	showLoading,
	hideLoading,
	removeStorageSync,
	uploadFile,
	request,
	showShareMenu: () => {}
}
