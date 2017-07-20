import shop from '../../api/shop'
const state = {
  all: []
}

const actions = {
  getAllProducts ({commit}, id) {
    shop.getProducts(id, products => {
      commit('recieve_products', products)
      console.log(id)
      // console.log(products)
    })
  }
}

const mutations = {
  recieve_products (state, products) {
    state.all = products
  },
  add_to_cart (state, product, quantity) {
    // state.all.find(p => p.id === productId).inventory--
  }
}

const getters = {
  allProducts (state) {
    return state.all
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
