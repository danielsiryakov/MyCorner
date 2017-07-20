import shop from '../../api/shop'
import router from '../../router'
const state = {
  all: [],
  searchValue: '',
  currentStore: {}
}

const actions = {
  getAllStores ({commit}) {
    shop.getStores(stores => {
      commit('recieve_stores', stores)
    })
  },
  searchForStores ({commit}) {
    router.push('/store_search')
  },
  getStore ({commit}, id) {
    shop.storeInfo(id, store => {
      commit('updateCurrentStore', store)
    })
  }
}

const mutations = {
  recieve_stores (state, stores) {
    state.all = stores
  },
  updateCurrentStore (state, store) {
    state.currentStore = store
  },
  activeStore (state, id) {
    state.currentStore = id
  }
}

const getters = {
  allStores (state) {
    console.log(state.all)
    return state.all
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
