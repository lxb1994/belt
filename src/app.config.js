const pages = [ 'pages/index/index', 'pages/mine/index', 'pages/history/index', 'pages/commit/index' ]

module.exports.ali = {
  pages: pages,
  window: {
    defaultTitle: '智能搭',
    titleBarColor: '#282c34',
  },
	// tabBar: {
	// 	textColor: '#999999',
	// 	selectedColor: '#38383A',
	// 	backgroundColor: '#ffffff',
	// 	items: [
	// 		{ pagePath: 'pages/index/index', name: '首页', icon: './assets/tabbar/home.png', activeIcon: './assets/tabbar/home-select.png' },
	// 		{ pagePath: 'pages/mine/index', name: '我的', icon: './assets/tabbar/mine.png', activeIcon: './assets/tabbar/mine-select.png' },
	// 	]
	// },
}

module.exports.wechat = {
  pages,
  window: {
    navigationBarTitleText: '智能搭',
    navigationBarBackgroundColor: '#ffffff',
		navigationBarTextStyle: 'black',
		backgroundColor: '#fff',
  },
	tabBar: {
    color: '#999999',
    selectedColor: '#38383A',
		list: [
			{ pagePath: 'pages/index/index', text: '首页', iconPath: './assets/tabbar/home.png', selectedIconPath: './assets/tabbar/home-select.png' },
			{ pagePath: 'pages/mine/index', text: '我的', iconPath: './assets/tabbar/mine.png', selectedIconPath: './assets/tabbar/mine-select.png' },
		]
	}
}

module.exports.toutiao = {
  pages,
  window: {
    navigationBarTitleText: 'Remax Toutiao Template',
    navigationBarBackgroundColor: '#282c34',
  },
}

module.exports.web = {
  pages,
  title: 'Remax Web Template',
}

