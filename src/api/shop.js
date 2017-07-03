const API_URL = 'http://mycorner.store:8001/api/'
const SEARCH = API_URL + 'store/search'
const RESEND = API_URL + '/user/confirmation/resend'
const API2_URL = 'http://pod.opendatasoft.com/api/records/1.0/search/?dataset=pod_gtin&q=hot%20cheetos'
import axios from 'axios'

export default {
  getProducts (cb) {
    axios.get(API2_URL).then(response => {
      cb(response.data.records)
      console.log(response.data.records)
    }).catch(function (error) {
      console.log(error)
    })
  },
  getStores (cb) {
    axios.get(SEARCH, {
      params: {
        lon: -73.950524,
        lat: 40.58639,
        time: 900
      }
    }).then(response => {
      cb(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  },
  resendPassword (cb, email) {
    axios.get(RESEND, {
      email: email
    }).then(response => {
      cb(response.data.records)
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
