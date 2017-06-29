import shop from '../../api/shop'
import router from '../../router'
const state = {
  all: [],
  searchValue: ''
}

const actions = {
  getAllStores ({commit}) {
    shop.getStores(stores => {
      commit('recieve_stores', stores)
    })
  },
  searchForStores ({ commit }) {
    router.push('/store_search')
  }
}

const mutations = {
  recieve_stores (state, stores) {
    state.all = stores
  },
  newSearch (state, value) {
    state.searchValue = value
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
