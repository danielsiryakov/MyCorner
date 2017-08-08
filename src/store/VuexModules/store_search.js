import shop from '../../api/shop'
import router from '../../router'
import Vue from 'vue'
const state = {
  all: [{}],
  address: {},
  address2: {
    formatted_address: 'Type Your Address'
  },
  currentStore: {}
}

const actions = {
  async getAllStores ({commit, dispatch}) {
    // await dispatch('getUserInfo')
    await setTimeout(() => {
      shop.getStores(state.address, stores => {
        commit('recieve_stores', stores)
      })
    }, 200)
  },
  async searchForStores ({dispatch}) {
    await dispatch('getAllStores').then(() => {
      router.push('/store_search')
    }).catch(() => {
      router.push('/store_search')
    })
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
    Vue.set(state.address, 'lon', address.longitude)
    Vue.set(state.address, 'lat', address.latitude)
    Vue.set(state.address, 'time', 900)
  },
  formattedAddress (state, address) {
    state.address2 = address
  }
}

const getters = {
  allStores (state) {
    return state.all
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
