module.exports = {
    // 使用publicPath代替baseUrl作为基本路径
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
