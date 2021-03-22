const pages = ['pages/index/index', 'pages/mine/index', 'pages/history/index'];

module.exports.ali = {
  pages,
  window: {
    defaultTitle: 'Remax Ali Template',
    titleBarColor: '#282c34',
  },
};

module.exports.wechat = {
  pages,
  window: {
    navigationBarTitleText: '智能搭',
    navigationBarBackgroundColor: '#ffffff',
		navigationBarTextStyle: 'black',
		backgroundColor: '#fff',
  },
	tabBar: {
    "color": "#999999",
    "selectedColor": "#f92557",
		list: [
			{ 
				pagePath: 'pages/index/index',
				text: '首页',
				iconPath: './assets/tabbar/home.jpg',
				selectedIconPath: './assets/tabbar/home-select.jpg'
			},
			{ 
				pagePath: 'pages/mine/index',
				text: '我的',
				iconPath: './assets/tabbar/mine.jpg',
				selectedIconPath: './assets/tabbar/mine-select.jpg'
			}
		]
	}
};

module.exports.toutiao = {
  pages,
  window: {
    navigationBarTitleText: 'Remax Toutiao Template',
    navigationBarBackgroundColor: '#282c34',
  },
};

module.exports.web = {
  pages,
  title: 'Remax Web Template',
};
