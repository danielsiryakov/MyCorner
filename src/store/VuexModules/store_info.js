import shop from '../../api/shop'
import axios from 'axios'
import router from '../../router'
import { Cookies, Loading } from 'quasar'
// const API_URL = 'http://mycorner.store:8080/api/'
const CREATE_STORE = shop.API_URL + 'store/create'
const IMAGEUPLOAD = shop.API_URL + 'assets/image/upload'
const state = {
  selectedStore: '',
  dashboardStore: {},
  user: {
    user_id: '',
    email: '',
    username: '',
    password: '',
    store_categories: []
  },
  store: {
    email: '',
    platform_categories: ['Grocery', 'Corner Store'],
    working_hours: {
      thursday: {
        hours: {
          to: 1200,
          from: 900
        },
        open: true
      },
      monday: {
        hours: {
          to: 1200,
          from: 900
        },
        open: true
      },
      tuesday: {
        hours: {
          to: 1200,
          from: 900
        },
        open: true
      },
      friday: {
        hours: {
          to: 1200,
          from: 900
        },
        open: true
      },
      wednesday: {
        hours: {
          to: 1200,
          from: 900
        },
        open: true
      },
      sunday: {
        hours: {
          to: 1200,
          from: 900
        },
        open: true
      },
      saturday: {
        hours: {
          to: 1200,
          from: 900
        },
        open: true
      }
    },
    name: '',
    image: '',
    delivery: {
      delivery_distance: 2,
      delivery_fee: 500,
      delivery_minimum: 500,
      minimum_time_to_delivery: 45,
      maximum_time_to_delivery: 100,
      service_offered: true
    },
    phone: '',
    pickup: {
      offered: true,
      maximum_time_to_pickup: 90,
      minimum_time_to_pickup: 30,
      pickup_items: {
        max: 100,
        min: 1
      }
    },
    tax_rate: 4.5,
    address: {
      street_number: '',
      country: '',
      route: '',
      postal_code: '',
      longitude: '',
      latitude: '',
      administrative_area_level_1: ''
    },
    short_description: '',
    long_description: '',
    category_names: ['Grocery', 'Corner Store'],
    categories: []
  },
  product: {
    title: '',
    images: [], // leaving at top level for now (which means variants cant have imgs)
    category: '', // ? just one or list of cats it falls in (tempted to say list)
    keywords: [],
    description: '',
    asset_id: '',
    dislplay_price: '', // different for variants but top level for product list view
    rating: {
      // not there yet, just throwing it in the code for not to not forget it in the models
      reviews: [],
      total_reviews: 0,
      review_percent: null
    },
    variants: [],
    variant_product: [],
    new_variant_name: ''
  },
  payment: {
    cash: {
      accepted: false,
      minimum_order_amount: null
      // not sure if we want to ask for a min amount required but this is fine for now
    },
    cc: {
      accepted: false,
      cardName: '',
      cc_number: null,
      cc_exp: null,
      ccv: null
    }
  },
  category_tree: []
}

const actions = {
  onFileChange ({commit}, e) {
    var files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    var reader = new FileReader()
    reader.onload = (e) => {
      Loading.show()
      axios.post(IMAGEUPLOAD, JSON.stringify({
        image: e.target.result,
        display_title: 'image'
      })
      ).then(response => {
        commit('createImage', response.data.link)
        Loading.hide()
      }).catch(error => {
        console.log(error)
      })
    }
    reader.readAsDataURL(files[0])
  },
  removeImage ({commit}) {
    commit('removeimage')
  },
  setName ({commit}, name) {
    commit('setname', name)
  },
  updateUser ({commit}, field) {
    commit('update_user', field)
  },
  createStore ({ commit }) {
    let userID = Cookies.get('userID')
    let authtoken = Cookies.get('authtoken')
    axios.defaults.headers.common['authtoken'] = authtoken
    axios.defaults.headers.common['userID'] = userID
    var storePayload = state.store
    Object.keys(storePayload.working_hours).forEach(function (key) {
      var from = new Date(storePayload.working_hours[key].hours.from)
      var to = new Date(storePayload.working_hours[key].hours.to)
      console.log(from.getHours() * 100 + from.getMinutes())
      console.log(to.getHours() * 100 + to.getMinutes())
      storePayload.working_hours[key].hours = {
        from: from.getHours() * 100 + from.getMinutes(),
        to: to.getHours() * 100 + to.getMinutes()
      }
    })
    console.log(authtoken)
    axios.post(CREATE_STORE, JSON.stringify(storePayload)).then(function (response) {
      router.push('/')
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  },
  getFullStoreInfo ({commit}, id) {
    shop.storeInfoFull(id, store => {
      commit('update_full_store', store)
    })
  }
}

const mutations = {
  createImage (state, file) {
    state.store.image = file
    // var image = new Image()
    // var reader = new FileReader()
    // reader.onload = (e) => {
    //   state.store.image = e.target.result
    // }
    // reader.readAsDataURL(file)
  },
  removeimage (state) {
    state.store.image = ''
  },
  update_user (state, field) {
    let keys = Object.keys(field),
      key
    for (let index = keys.length - 1; index > -1; index--) {
      key = keys[index]

      if (state.user.hasOwnProperty(key)) {
        state.user[key] = field[key]
      }
    }
  },
  update_store (state, field) {
    let keys = Object.keys(field),
      key
    for (let index = keys.length - 1; index > -1; index--) {
      key = keys[index]

      if (state.store.hasOwnProperty(key)) {
        state.store[key] = field[key]
      }
    }
  },
  update_cash (state, field) {
    let keys = Object.keys(field),
      key
    for (let index = keys.length - 1; index > -1; index--) {
      key = keys[index]

      if (state.payment.cash.hasOwnProperty(key)) {
        state.payment.cash[key] = field[key]
      }
    }
  },
  update_cc (state, field) {
    let keys = Object.keys(field),
      key
    for (let index = keys.length - 1; index > -1; index--) {
      key = keys[index]

      if (state.payment.cc.hasOwnProperty(key)) {
        state.payment.cc[key] = field[key]
      }
    }
  },
  update_working_hours (state, workingHours) {
    state.store.working_hours = workingHours
  },
  update_full_store (state, store) {
    state.dashboardStore = store
    state.store = store
  },
  update_store_selection (state, value) {
    state.selectedStore = value
  },
  update_full_store_field (state, field) {
    let keys = Object.keys(field),
      key

    for (let index = keys.length - 1; index > -1; index--) {
      key = keys[index]
      if (state.dashboardStore.hasOwnProperty(key)) {
        state.dashboardStore[key] = field[key]
      }
    }
  }
}

const getters = {
  storeImage (state) {
    return state.store.image
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
