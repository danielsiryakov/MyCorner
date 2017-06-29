import Vuex from 'vuex'
import Vue from 'vue'
import cart from './VuexModules/cart'
import products from './VuexModules/products'
import storeSearch from './VuexModules/store_search'
import storeInfo from './VuexModules/store_info'
import auth from './VuexModules/authentication'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    products,
    storeSearch,
    storeInfo,
    auth
  }
})
