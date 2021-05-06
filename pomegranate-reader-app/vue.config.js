const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    // 使用publicPath代替baseUrl作为基本路径
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    // Webpack链式配置
    chainWebpack: config => {
        // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
        config.resolve.alias
            .set('@', resolve('src'))
            .set('~', resolve('public'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        // 换算的基数
                        // 设计稿宽度的1/10，一般为75
                        // 750px == 1rem
                        // 如果元素不想要转换, 则使用大写的PX标注单位
                        remUnit: 75
                    })
                ]
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: false
    }
}
