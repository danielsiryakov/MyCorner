const API_URL = 'http://mycorner.store:8080/api/'
// const API_URL = 'http://24.198.140.214:8001/api/'
const SEARCH = API_URL + 'store/search'
const RESEND = API_URL + 'user/confirmation/resend'
const PRODUCTS = API_URL + 'store/categories/retrieve/'
// const API2_URL = 'http://pod.opendatasoft.com/api/records/1.0/search/?dataset=pod_gtin&q=hot%20cheetos'
import axios from 'axios'
// const LOGIN_URL = API_URL + 'user/login'
const USER_RETRIEVE = API_URL + 'user/retrieve'
import { Cookies } from 'quasar'

axios.defaults.headers.common['authtoken'] = Cookies.get('authtoken')
axios.defaults.headers.common['userID'] = Cookies.get('userID')

// const SIGNUP_URL = API_URL + 'user/create'
// const USER_RETRIEVE = API_URL + 'user/retrieve'

export default {
  getProducts (id, cb) {
    axios.get(PRODUCTS + id).then(response => {
      cb(response.data)
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  },
  getStores (cb) {
    axios.get(SEARCH, {
      params: {
        lon: -71.0597700,
        lat: 42.3584300,
        time: 900
      }
    }).then(response => {
      cb(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  },
  resendPassword (creds) {
    axios.get(RESEND, {
      params: {
        'email': creds.email,
        'password': creds.password
      }
    }).then(response => {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  },
  userInfo (cb) {
    axios.get(USER_RETRIEVE).then(function (response) {
      cb(response.data)
      console.log(response)
    }).catch(function (error) {
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
