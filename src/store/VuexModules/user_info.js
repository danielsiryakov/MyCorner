import shop from '../../api/shop'
const state = {
  info: {
    address_book: [],
    confirmed: false,
    email: '',
    user_id: '',
    user_roles: {
      Access: {}
    }
  }
}

const actions = {
  getUserInfo ({commit}) {
    shop.userInfo(info => {
      commit('setUserInfo', info)
      commit('userAddress', {
        longitude: info.address_book[0].location.coordinates[1],
        latitude: info.address_book[0].location.coordinates[0]
      })
    })
  }
}

const mutations = {
  setUserInfo (state, info) {
    state.info = info
  }
}

const getters = {
  user (state) {
    return state.info
  },
  savedAddress (state, getters, rootState) {
    console.log(rootState.storeSearch.address)
    if (rootState.storeSearch.address2.formatted_address === 'Type Your Address' && state.info.address_book.length !== 0) {
      return state.info.address_book[0].address_name
    }
    else {
      return rootState.storeSearch.address2.formatted_address
    }
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
