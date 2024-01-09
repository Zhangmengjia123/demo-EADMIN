const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
	lintOnSave: false,
	productionSourceMap: false, //  生产环境的构造
	publicPath: './',   // 根目录
	outputDir: 'dist', // 打包输出文件地址
	assetsDir: 'assets',// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	devServer: {
		port: 8090,    //开发运行时的端口
		host: '0.0.0.0',  // 开发运行时域名，设置成'0.0.0.0',在同一个局域网下，如果你的项目在运行，同时可以通过你的http://ip:port/...访问你的项目
		https: false,  // 是否启用 https
		open: false,   // npm run serve 时是否直接打开浏览器
		proxy: {
			[process.env.VUE_APP_IDENT]: {
				target: process.env.VUE_APP_BASE_API,
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					['^' + process.env.VUE_APP_IDENT]: ''
				}
			}
		}
	},
	configureWebpack: {
		plugins: [
			// ...
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
		],

	},
	chainWebpack(config) {
		// when there are many pages, it will cause too many meaningless requests
		config.plugins.delete('prefetch')
		// set svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()
	},

})
