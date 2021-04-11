const CopyPlugin = require('copy-webpack-plugin')
const Path = require('path')

const PLATFORM = process.env.REMAX_PLATFORM
const SRCPATH = Path.join(__dirname, './src')
const DISTPATH = Path.join(__dirname, `./dist/${PLATFORM}`)

const CopyPluginConfig = {
	patterns: [
		{ from: `${SRCPATH}/assets`, to: `${DISTPATH}/assets` },
	]
}

const webpackConfig = {
	one: true,
	output: `dist/${PLATFORM}`,
	pxToRpx: true,

	// config, webpack, addCSSRule
	configWebpack: function ({ config }) {
		config.plugin('custom-copy').use(CopyPlugin, [ CopyPluginConfig ]);
		config.performance.hints(false)
	}
}

module.exports = webpackConfig

