import Utils from '../../common/utils'
import { showSharePanel } from 'remax/ali'
/*
 *
 */
export function onClickLink(item) {
	switch (item.openType) {
		case 'share':
			showSharePanel()
			break;
		case 'contact':
			const { userInfo } = this.state
			my.tb.openMessage({
				sellerNick: userInfo.name,
				success: (res) => console.log(res),
				fail: (err) => console.log(err),
				complete: (complete) => console.log(complete),
			})
			break
		default:
			if (item.link) Utils.navigateTo({ url: item.link })
			break
	}
}