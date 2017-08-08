import Vue from 'vue'
import shop from '../../api/shop'
const state = {
  carts: {
  },
  lastCheckout: null
}

const actions = {
  addToCart ({commit}, product) {
    if (!(product.store_id in state.carts)) {
      Vue.set(product, 'is_new_cart', true)
      Vue.set(product, 'cart_id', '')
    }
    else {
      Vue.set(product, 'is_new_cart', false)
      Vue.set(product, 'cart_id', state.carts[product.store_id].cart_id)
    }
    shop.updateCart(product, response => {
      Vue.set(product, 'cart_id', response.data.id)
      commit('add_to_cart', product)
    }, error => {
      console.log(error)
    })
  },
  async retriesActiveCarts ({commit}) {
    await shop.retrieveCarts(carts => {
      commit('syncCarts', carts)
    })
  }
}

const mutations = {
  add_to_cart (state, product) {
    // const cart = state.carts.find(p => p.cart_id === product.cart_id)
    if (product.is_new_cart) {
      Vue.set(state.carts, product.store_id, {
        products: [product],
        cart_id: product.cart_id
      })
    }
    else {
      const record = state.carts[product.store_id].products.find(p => p.asset_id === product.asset_id)
      if (!record) {
        state.carts[product.store_id].products.push(product)
      }
      else {
        record.quantity = record.quantity + product.quantity
      }
    }
  },
  syncCarts (state, carts) {
    Object.keys(carts).forEach(key => {
      Vue.set(state.carts, carts[key].store_id, {
        products: carts[key].products,
        cart_id: carts[key].id
      })
    })
  },
  checkout_request (state) {
    // clear cart
    state.added = []
    state.lastCheckout = null
  },
  checkout_successful (state) {
    state.lastCheckout = 'successful'
  },
  checkout_failure (state, savedCartItems) {
    // rollback to the cart saved before sending the request
    state.added = savedCartItems
    state.lastCheckout = 'failed'
  }
}

const getters = {
  cartProducts (state, getters, rootState) {
    // return state.added.map(({ id, quantityjs  }) => {
    //   const product = rootState.products.all.find(p => p.id === id)
    //   return {
    //     title: product.title,
    //     price_cents: product.price_cents,
    //     id,
    //     quantity
    //   }
    // })
    return state.carts
  },
  cartCount (state) {
    var totalCount = 0
    Object.keys(state.carts).forEach(key => {
      for (var i = 0; i < state.carts[key].products.length; i++) {
        totalCount += state.carts[key].products[i].quantity
      }
    })
    return totalCount
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
