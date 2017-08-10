import Vue from 'vue'
import shop from '../../api/shop'
const state = {
  carts: [],
  lastCheckout: null
}

const actions = {
  addToCart ({commit}, product) {
    Vue.set(product, 'is_new_cart', true)
    Vue.set(product, 'cart_id', '')
    state.carts.forEach(function (cart) {
      if (cart.hasOwnProperty('store_id')) {
        if (product.store_id === cart.store_id) {
          Vue.set(product, 'is_new_cart', false)
          Vue.set(product, 'cart_id', cart.id)
        }
      }
    })
    shop.updateCart(product, carts => {
      Vue.set(product, 'cart_id', carts.id)
      // commit('add_to_cart', product)
      commit('syncCarts', carts)
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
    // Object.keys(carts).forEach(key => {
    //   Vue.set(state.carts, carts[key].store_id, {
    //     products: carts[key].products,
    //     cart_id: carts[key].id
    //   })
    // })
    state.carts = carts
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
    state.carts.forEach(cart => {
      for (var i = 0; i < cart.products.length; i++) {
        totalCount += cart.products[i].quantity
      }
    })
    // Object.keys(state.carts).forEach(key => {
    //   for (var i = 0; ivuex te.carts[key].products.length; i++) {
    //     totalCount += state.carts[key].products[i].quantity
    //   }
    // })
    return totalCount
  },
  getProductCartQuantity: (state, getters) => (storeID, productID) => {
    let productQuantity = 0
    let storeCart = state.carts.find(cart => cart.store_id === storeID)
    storeCart.products.forEach(product => {
      if (product.id === productID) {
        productQuantity = product.quantity
      }
    })
    return productQuantity
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
