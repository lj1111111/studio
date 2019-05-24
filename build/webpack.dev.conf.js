'use strict'
// mock code 2018-10-13
//const express = require('express')
//const app = express()
//const routes = express.Router()
//app.use('/api', routes)

//const realposition = require('../mock/realposition.json') // 
//const track = require('../mock/track.json') // 
//const devices = require('../mock/devices.json') // 
//const tracklines = require('../mock/tracklines.json') // 
//const fences = require('../mock/fences.json') // 
//const realmonitor = require('../mock/realmonitor.json') // 围栏实时判断
//const norealmonitor = require('../mock/norealmonitor.json') // 模拟围栏实时判断
//const indexdata = require('../mock/index.json') //索引数据
//
//const TRACK_REAL_POSITION = "/api/real/device";
//const TRACK_QUERY_BY_BOX = "/api/query/bbox"; //轨迹查询
//const TRACK_QUERY_DEVICE_BY_CODE = "/api/device"; //
//const TRACK_QUERY_DEVICE_BY_CODE_OR_BOX = "/api/query/device"; //
//const TRACK_QUERY = "/api/query/track";
//const FENCE_QUERY = "/api/query/fence";
//const FENCE_CREATE = "/api/fence"; //创建围栏
//const FENCE_REAL_MONITOR = "/api/real/monitor"; //围栏实时判断
//const FENCE_NOREAL_MONITOR = "/api/noreal/monitor"; //模拟围栏实时判断
//const TRACK_ANALYSIS = "/api/track/analysis"; //轨迹相似分析
//const TRACK_INDEX = "/api/index"; //索引列表

const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


const devWebpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.dev.cssSourceMap,
			usePostCSS: true
		})
	},
	// cheap-module-eval-source-map is faster for development
	devtool: config.dev.devtool,

	// these devServer options should be customized in /config/index.js
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: {
			rewrites: [{
				from: /.*/,
				to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
			}, ],
		},
		hot: true,
		contentBase: false, // since we use CopyWebpackPlugin.
		compress: true,
		host: HOST || config.dev.host,
		port: PORT || config.dev.port,
		open: config.dev.autoOpenBrowser,
		overlay: config.dev.errorOverlay ? {
			warnings: false,
			errors: true
		} : false,
		publicPath: config.dev.assetsPublicPath,
		proxy: config.dev.proxyTable,
		quiet: true, // necessary for FriendlyErrorsPlugin
		watchOptions: {
			poll: config.dev.poll,
		}
//		,
//		before(app) {
//			if(debug) {
//				//实时位置Mock
//				app.post(TRACK_REAL_POSITION, (req, res) => {
//					res.json(realposition)
//				})
//				//Box查询轨迹Mock
//				app.post(TRACK_QUERY_BY_BOX, (req, res) => {
//					res.json(track)
//				})
//				//车牌号查询车辆位置
//				app.post(TRACK_QUERY_DEVICE_BY_CODE, (req, res) => {
//					res.json(realposition)
//				})
//				//车牌列表查询
//				app.post(TRACK_QUERY_DEVICE_BY_CODE_OR_BOX, (req, res) => {
//					res.json(devices)
//				})
//				//轨迹查询
//				app.post(TRACK_QUERY, (req, res) => {
//					res.json(tracklines)
//				})
//				//获取围栏
//				app.get(FENCE_QUERY, (req, res) => {
//					res.json(fences)
//				})
//				//围栏创建
//				app.post(FENCE_CREATE, (req, res) => {
//					res.json({
//						"state": 0
//					})
//				})
//				//围栏实时监测
//				app.post(FENCE_REAL_MONITOR, (req, res) => {
//					res.json(realmonitor);
//				})
//				//模拟围栏实时监测
//				app.post(FENCE_NOREAL_MONITOR, (req, res) => {
//					res.json(norealmonitor);
//				})
//				//轨迹相似分析
//				app.post(TRACK_ANALYSIS, (req, res) => {
//					res.json(tracklines);
//				})
//				//获取索引列表
//				app.get(TRACK_INDEX, (req, res) => {
//					res.json(indexdata)
//				})
//			}
//		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': require('../config/dev.env')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true,
			chunks: ['app']
		}),
		//浏览模板页面2018-07-05
		new HtmlWebpackPlugin({
			filename: 'viewService.html',
			template: 'viewService.html',
			inject: true,
			chunks: ['viewService']
		}),
		// copy custom static assets
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '../static'),
			to: config.dev.assetsSubDirectory,
			ignore: ['.*']
		}])
	]
})

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port
	portfinder.getPort((err, port) => {
		if(err) {
			reject(err)
		} else {
			// publish the new Port, necessary for e2e tests
			process.env.PORT = port
			// add port to devServer config
			devWebpackConfig.devServer.port = port

			// Add FriendlyErrorsPlugin
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo: {
					messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
				},
				onErrors: config.dev.notifyOnErrors ?
					utils.createNotifierCallback() : undefined
			}))

			resolve(devWebpackConfig)
		}
	})
})