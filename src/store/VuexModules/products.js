import shop from '../../api/shop'
const state = {
  storeCategories: []
}

const actions = {
  getAllProducts ({commit}, id) {
    shop.storeCategoriesRetrieveT1(id).then(response => {
      commit('updateCategories', response.data)
      // console.log(products)
    })
  }
}

const mutations = {
  updateCategories (state, categories) {
    state.storeCategories = categories
  },
  add_to_cart (state, product, quantity) {
    // state.all.find(p => p.id === productId).inventory--
  }
}

const getters = {
  allCategories (state) {
    return state.storeCategories
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
