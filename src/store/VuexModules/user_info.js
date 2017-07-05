import shop from '../../api/shop'
const state = {
  info: ''
}

const actions = {
  getUserInfo ({commit}) {
    shop.userInfo(info => {
      commit('setUserInfo', info)
      console.log(info)
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
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
