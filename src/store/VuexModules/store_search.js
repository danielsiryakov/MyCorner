import shop from '../../api/shop'
import router from '../../router'

const state = {
  all: [],
  address: '',
  address2: {
    formatted_address: 'Type Your Address'
  },
  currentStore: {}
}

const actions = {
  getAllStores ({commit}) {
    shop.getStores(state.address, stores => {
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
  },
  userAddress (state, address) {
    state.address = address
  },
  formattedAddress (state, address) {
    state.address2 = address
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
