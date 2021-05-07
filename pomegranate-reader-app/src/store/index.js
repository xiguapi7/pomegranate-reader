import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import book from './modules/book'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        book
    },
    getters,
    actions
})
