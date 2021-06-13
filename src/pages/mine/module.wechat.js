import Utils from '../../common/utils'
import { ISWECHAT } from '../../common/constants'
import Api from '../../api/index'

export async function getUserProfileFunc(e) {
	let _token = ''
	let _userInfo = null
	const _userInfoRes = await Utils.getUserProfile({ desc: '获取信息进行登录。', scopes: 'scope.userInfo' })
	if (_userInfoRes.code !== 200) return this._onFail('登陆失败：01')
	Utils.showLoading({ title: '正在登录...' })
	// 微信登陆流程
	if (ISWECHAT) {
		const _loginRes = await Utils.login()
		if (_loginRes.code !== 200) return this._onFail(_loginRes.data || '登陆失败：02')
		const { userInfo } = _userInfoRes.data
		const _apiRes = await Api.login({ type: 2, nickname: userInfo.nickName, head: userInfo.avatarUrl, code: _loginRes.data.code })
		Utils.hideLoading()
		if (_apiRes.code !== 1) return this._onFail(_apiRes.msg || '网络波动，请稍后重试！')
		_userInfo = userInfo
		_token = _apiRes.data.login_data.fresh_token
	}

	Utils.setStorageSync({ key: 'token', data: _token })
	Utils.setStorageSync({ key: 'userInfo', data: _userInfo })
	this.setState({ userInfo: _userInfo, token: _token })
}

export async function getUserInfo(e) {
	let _token = ''
	let _userInfo = null
	Utils.showLoading({ title: '正在登录...' })
	const _loginRes = await Utils.login()
	if (_loginRes.code !== 200) return this._onFail(_loginRes.data || '登陆失败：03')
	_userInfo = _loginRes.data.userInfo
	const _apiRes = await Api.login({ type: 2, nickname: _userInfo.nickName, head: _userInfo.avatarUrl, code: _loginRes.data.code }) 
	Utils.hideLoading()
	if (_apiRes.code !== 1) return this._onFail(_apiRes.msg || '网络波动，请稍后重试！')
	_token = _apiRes.data.login_data.fresh_token

	Utils.setStorageSync({ key: 'token', data: _token })
	Util.setStorageSync({ key: 'userInfo', data: _userInfo })
	this.setState({ userInfo: _userInfo, token: _token })
}

/*
 *
 */
export function onClickLink(item) {
	if (item.link) Utils.navigateTo({ url: item.link })
}

/*
 *
 */
export function onFail(text) {
	if (text) return Utils.showToast({ title: text,icon: 'none' })
	Utils.hideLoading()
}
