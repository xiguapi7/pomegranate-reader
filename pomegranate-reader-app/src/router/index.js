import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/book-store'
        },
        {
            path: '/ebook',
            // component: resolve => require(['../views/ebook/EbookIndex.vue'], resolve),
            component: () => import('../views/ebook/EbookIndex'),
            children: [{
                path: ':fileName',
                // component: resolve => require(['../components/ebook/EbookReader.vue'], resolve)
                component: () => import('../components/ebook/EbookReader'),
            }]
        },
        {
            path: '/book-store',
            // component: resolve => require(['../views/store/StoreIndex.vue'], resolve),
            component: () => import('../views/store/StoreIndex'),
            redirect: '/book-store/shelf',
            children: [
                {
                    path: '/book-store/shelf',
                    // component: resolve => require(['../views/store/BookShelf.vue'], resolve),
                    component: () => import('../views/store/BookShelf'),
                    meta: {key: 1}
                },
                {
                    path: '/book-store/category',
                    // component: resolve => require(['../views/store/BookCategory.vue'], resolve),
                    component: () => import('../views/store/BookCategory'),
                    meta: {key: 2}
                },
                {
                    path: '/book-store/home',
                    // component: resolve => require(['../views/store/BookHome.vue'], resolve),
                    component: () => import('../views/store/BookHome'),
                    meta: {key: 3}
                },
                {
                    path: '/book-store/list',
                    // component: resolve => require(['@/views/store/BookList.vue'], resolve),
                    component: () => import('../views/store/BookList'),
                    meta: {key: 4}
                },
                {
                    path: '/book-store/detail',
                    // component: resolve => require(['../views/store/BookDetail.vue'], resolve),
                    component: () => import('../views/store/BookDetail'),
                    meta: {key: 5}
                },
                {
                    path: '/book-store/book-speaking',
                    // component: resolve => require(['../views/store/BookSpeaking.vue'], resolve),
                    component: () => import('../views/store/BookSpeaking'),
                    meta: {key: 6}
                }
            ]
        }
    ]
})
