import shop from '../../api/shop'
const state = {
  info: {
    confirmed: false,
    email: '',
    user_id: '',
    user_roles: {
      Access: {}
    }
  },
  address_book: [],
  defaultAddress: {},
  wallet: []
}

const actions = {
  async getUserInfo ({commit}) {
    shop.userInfo(info => {
      commit('setUserInfo', info)
    })
    shop.retrieveAddressBookDefualt(addressBook => {
      commit('setDefaultAddress', addressBook)
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
