import axios from 'axios'
const API_URL = 'http://mycorner.store:8080/api/'
const SEARCH = API_URL + 'store/search'
const RESEND = API_URL + 'user/confirmation/resend'
const PRODUCTS = API_URL + 'store/categories/retrieve/'
const UPDATECART = API_URL + 'cart/update/product/quantity'
const USER_RETRIEVE = API_URL + 'user/retrieve'
const STOREINFO = API_URL + 'store/info/retrieve/'
const ACTIVE_CARTS = API_URL + 'carts/retrieve/active'
// const IMAGEUPLOAD = API_URL + 'assets/image/upload'
const RETRIEVECARTS = API_URL + 'carts/retrieve/active'
const STORE_RETRIEVE_FULL = API_URL + 'store/retrieve/full/'
const ADDRESS_BOOK_RETRIEVE = API_URL + 'user/address_book/retrieve'
const ADDRESS_BOOK_RETRIEVE_DEFAULT = API_URL + 'user/address_book/retrieve/default'
const ADDRESS_BOOK_ADD = API_URL + 'user/address_book/add'
const ADDRESS_BOOK_DEFAULT_CHANGE = API_URL + 'user/address_book/default/change'
const USER_WALLET_RETRIEVE = API_URL + 'user/wallet/retrieve'
const USER_WALLET_ADD = API_URL + 'user/wallet/add?stripe_src='
// import { Cookies } from 'quasar'
import {
  Loading,
  Cookies
} from 'quasar'
axios.defaults.headers.common['authtoken'] = Cookies.get('authtoken')
axios.defaults.headers.common['userID'] = Cookies.get('userID')

// const SIGNUP_URL = API_URL + 'user/create'
// const USER_RETRIEVE = API_URL + 'user/retrieve'

export default {
  API_URL,
  getProducts (id, cb) {
    Loading.show()
    axios.get(PRODUCTS + id).then(response => {
      Loading.hide()
      cb(response.data)
    }).catch(error => {
      console.log(error)
    })
  },
  getStores (address, cb) {
    Loading.show()
    console.log(address)
    console.log(address)
    console.log(address.longitude)
    axios.get(SEARCH, {
      params: {
        lon: address.lon,
        lat: address.lat,
        time: 900
      }
    }).then(response => {
      Loading.hide()
      cb(response.data)
    }).catch(function (error) {
      console.log(error)
      Loading.hide()
    })
  },
  getActiveCarts (cb) {
    axios.get(ACTIVE_CARTS).then(response => {
      cb(response.data)
    }).catch(error => {
      console.log(error)
    })
  },
  resendPassword (creds) {
    Loading.show()
    axios.get(RESEND, {
      params: {
        'email': creds.email,
        'password': creds.password
      }
    }).then(response => {
      Loading.hide()
    }).catch(function (error) {
      Loading.hide()
      console.log(error)
    })
  },
  userInfo (cb) {
    axios.get(USER_RETRIEVE).then(function (response) {
      cb(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  },
  storeInfo (id, cb) {
    axios.get(STOREINFO + id).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
    })
  },
  updateCart (product, cb, errorCb) {
    axios.post(UPDATECART, JSON.stringify({
      store_id: product.store_id,
      product_id: product.product_id,
      cart_id: product.cart_id,
      quantity: product.quantity,
      is_new_cart: product.is_new_cart,
      instructions: ''
    })).then(response => {
      cb(response.data)
    }).catch(function (error) {
      errorCb(error)
      console.log(error)
    })
  },
  retrieveCarts (cb) {
    axios.get(RETRIEVECARTS).then(response => {
      cb(response.data)
    }).catch(error => {
      console.log(error)
    })
  },
  storeInfoFull (id, cb) {
    axios.get(STORE_RETRIEVE_FULL + id).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
    })
  },
  retrieveAddressBook (cb) {
    axios.get(ADDRESS_BOOK_RETRIEVE).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
    })
  },
  retrieveAddressBookDefualt (cb) {
    axios.get(ADDRESS_BOOK_RETRIEVE_DEFAULT).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
    })
  },
  changeDefaultAddress (id, cb) {
    axios.get(ADDRESS_BOOK_DEFAULT_CHANGE + '?address_id=' + id).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
    })
  },
  userWalletRetrieve (cb) {
    axios.get(USER_WALLET_RETRIEVE).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
    })
  },
  userWalletAdd (id, cb) {
    axios.get(USER_WALLET_ADD + id).then(response => {
      cb(response.data)
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  },
  addAddress (cb, address) {
    axios.post(ADDRESS_BOOK_ADD, address).then(response => {
      cb(response.data)
    }).catch(error => {
      console.log(error)
    })
  }
  //  buyProducts (products, cb, errorCb) {
//    setTimeout(() => {
//      // simulate random checkout failure.
//      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
//        ? cb()
//        : errorCb()
//    }, 100)
//  }
}
