// const _products = [
//   {'id': 1, 'title': 'Cucumbers', 'display_price': 3.99, 'description': 'bla bla bla bla bla bla'},
//   {'id': 2, 'title': 'Spinach', 'display_price': 2.99, 'description': 'bla bla bla bla bla bla'},
//   {'id': 3, 'title': 'Carrots', 'display_price': 4.99, 'description': 'bla bla bla bla bla bla'},
//   {'id': 4, 'title': 'Potatoes', 'display_price': 2.99, 'description': 'bla bla bla bla bla bla'},
//   {'id': 5, 'title': 'Broccoli', 'display_price': 5.99, 'description': 'bla bla bla bla bla bla'},
//   {'id': 6, 'title': 'Tomatoes', 'display_price': 2.99, 'description': 'bla bla bla bla bla bla'},
//   {'id': 7, 'title': 'Cabbage', 'display_price': 3.95, 'description': 'bla bla bla bla bla bla'},
//   {'id': 8, 'title': 'Lettuce', 'display_price': 1.95, 'description': 'bla bla bla bla bla bla'},
//   {'id': 8, 'title': 'Asparagus', 'display_price': 5.99, 'description': 'bla bla bla bla bla bla'},
//   {'id': 8, 'title': 'Kale', 'display_price': 3.95, 'description': 'bla bla bla bla bla bla'},
//   {'id': 8, 'title': 'Brussels Sprouts', 'display_price': 4.95, 'description': 'bla bla bla bla bla bla'}]

const API_URL = 'http://mycorner.store:8001/api/'
const SEARCH = API_URL + 'store/search'
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
