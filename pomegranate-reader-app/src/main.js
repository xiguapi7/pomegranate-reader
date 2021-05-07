import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import i18n from './lang'
import './lazy'

// 引入global.scss
import 'assets/styles/global.scss'

// 引入flexible, 结合postcss实现rem布局
// import 'amfe-flexible/index'
// 引入字体图标
// import 'assets/styles/icon.css'
// 引入Web字体
// import 'assets/fonts/cabin.css'
import 'assets/styles/icon.css'

// FastClick消除Web APP 300ms点击延迟
FastClick.attach(document.body);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
