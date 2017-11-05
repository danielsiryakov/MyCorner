import axios from 'axios'
import shop from '../../api/shop'
const state = {
  info: {
    confirmed: false,
    email: '',
    user_id: '111',
    user_roles: {
      access: {},
      store_map: {}
    }
  },
  address_book: [],
  defaultAddress: {},
  wallet: {},
  completedCarts: []
}

const actions = {
  async getUserInfo ({dispatch, commit}) {
    shop.userInfo(info => {
      console.log(info)
      commit('setUserInfo', info)
      var sids = Object.keys(info.user_roles.store_map)
      if (sids.length > 0) {
        dispatch('getFullStoreInfo', sids[0])
        commit('update_store_selection', sids[0])
        axios.defaults.headers.common['storeID'] = sids[0]
      }
      else {
        dispatch('getAddressBook')
        dispatch('retriesActiveCarts')
        dispatch('getWallet')
      }
//      shop.retrieveAddressBookDefualt(addressBook => {
//        commit('setDefaultAddress', addressBook)
//      })
    })
  },
  getAddressBook ({commit}) {
    shop.retrieveAddressBook(addressBook => {
      commit('setAddressBook', addressBook)
    })
  },
  getWallet ({commit}) {
    shop.userWalletRetrieve(wallet => {
      commit('setUserWallet', wallet)
    })
  },
  addWallet ({commit}, id) {
    shop.userWalletAdd(id)
  },
  getCompletedCarts ({commit}) {
    shop.retrieveCompletedCarts(carts => {
      commit('setCompletedCarts', carts)
    })
  }
  // async addUserAddress ({commit}, address) {
  //   await setTimeout(() => {
  //     shop.addAddress(
  //      , response => {
  //       console.log(response)
  //     })
  //   }, 200)
  // }
}

const mutations = {
  setUserInfo (state, info) {
    state.info = info
  },
  setAddressBook (state, addressbook) {
    state.address_book = addressbook
  },
  setDefaultAddress (state, defaultAddress) {
    state.defaultAddress = defaultAddress
  },
  setUserWallet (state, wallet) {
    state.wallet = wallet
  },
  setCompletedCarts (state, carts) {
    state.completedCarts = carts
  }
}

const getters = {
  user (state) {
    return state.info
  },
  savedAddress (state, getters, rootState) {
    // rootState.storeSearch.address2.formatted_address === 'Type Your Address' &&
    console.log(state.address_book.length)
    if (state.address_book.length > 0) {
      let defaultAddress = state.address_book.find(address => address.default === true)
      if ((rootState.storeSearch.address2.formatted_address === 'Type Your Address') || (rootState.storeSearch.address2.formatted_address === defaultAddress.line1)) {
        return defaultAddress.line1
        // return '1'
      }
      else {
        return rootState.storeSearch.address2.formatted_address
      }
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
