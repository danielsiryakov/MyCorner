import shop from '../../api/shop'
import axios from 'axios'
import router from '../../router'
import Vue from 'vue'
import { Cookies, Loading, Alert } from 'quasar'
const CREATE_STORE = shop.API_URL + 'store/create'
const IMAGEUPLOAD = shop.API_URL + 'assets/image/upload'
const state = {
  selectedStore: '',
  dashboardStore: {},
  T1Aisles: [],
  T2Categories: [],
  T2Aisles: {},
  orders: [],
  categoriesT2: [],
  categoriesT1: [],
  store: {
    category_ids: [],
    email: '',
    platform_categories: ['Grocery', 'Corner Store'],
    working_hours: {
      sunday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      monday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      tuesday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      wednesday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      thursday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      friday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      saturday: {
        hours: {
          to: 1800,
          from: 800
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
        max: 80,
        min: 20
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
  storeTemplate: {
    email: '',
    platform_categories: ['Grocery', 'Corner Store'],
    working_hours: {
      sunday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      monday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      tuesday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      wednesday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      thursday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      friday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      saturday: {
        hours: {
          to: 1800,
          from: 800
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
        max: 80,
        min: 20
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
  payment_details: {
    store_id: '',
    legal_entity: {
      billing_address: {
        name: '',
        city: '',
        phone: '',
        line1: '',
        route: '',
        user_id: '',
        default: false,
        country: '',
        location: {
          coordinates: null
        },
        apt_suite: '',
        latitude: 0,
        longitude: 0,
        postal_code: '',
        street_number: '',
        administrative_area_level_1: '',
        formatted_address: '',
        NewDefaultID: ''
      },
      business_tax_id: '',
      legal_business_name: '',
      personal_id: '',
      last_4_ssn: '',
      Owner: {
        First: '',
        Last: '',
        DOB: {
          day: 0,
          month: 0,
          year: 0
        }
      }
    },
    business_type: '',
    cc_payment_available: false,
    cash_payment_available: false
  }
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
      // axios.defaults.headers.common['authtoken'] = response.headers['authtoken']
      router.push('/admin')
      console.log(response)
    }).catch(function (error) {
      const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
      setTimeout(alert.dismiss, 7000)
      console.log(error)
    })
  },
  getFullStoreInfo ({commit}, id) {
    // shop.storeInfo
    shop.storeInfo(id, store => {
      commit('update_full_store', store)
      commit('update_store', {category_ids: store.category_ids})
    })
  },
  getActiveOrders ({commit}) {
    if (state.selectedStore !== '') {
      shop.ordersRetrieveActive(state.selectedStore).then(response => {
        commit('update_orders', response.data)
      }).catch(error => {
        console.log(error)
        const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
        setTimeout(alert.dismiss, 5000)
      })
    }
  },
  getT1Aisles ({commit}) {
    shop.templateCategoriesT1().then(response => {
      commit('updateT1Aisles', response.data)
    })
  },
  getT2Categories ({commit}, id) {
    let i = 0
    let t2 = []
    for (; i < state.T1Aisles.length; i++) {
      if (id === state.T1Aisles[i].category_id) {
        t2 = state.T1Aisles[i].children_categories
      }
    }
    console.log(t2)
    if (t2.length) {
      commit('updateT2Categories', t2)
    }
    else {
      shop.templateCategoriesT2(id).then(response => {
        commit('updateT2Categories', response.data)
      })
    }
  }
}

const mutations = {
  updateT1Aisles (state, data) {
    state.T1Aisles = data
  },
  updateT2Categories (state, data) {
    state.T2Categories = data
  },
  createImage (state, file) {
    state.store.image = file
  },
  removeimage (state) {
    state.store.image = ''
  },
  update_orders (state, orders) {
    state.orders = orders
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
  update_pickup (state, field) {
    let keys = Object.keys(field),
      key
    for (let index = keys.length - 1; index > -1; index--) {
      key = keys[index]

      if (state.store.pickup.hasOwnProperty(key)) {
        state.store.pickup[key] = field[key]
      }
    }
  },
  update_delivery (state, field) {
    let keys = Object.keys(field),
      key
    for (let index = keys.length - 1; index > -1; index--) {
      key = keys[index]

      if (state.store.delivery.hasOwnProperty(key)) {
        state.store.delivery[key] = field[key]
      }
    }
  },
  update_working_hours (state, workingHours) {
    state.store.working_hours = workingHours
  },
  update_full_store (state, store) {
    state.store = store
  },
  update_store_selection (state, value) {
    state.selectedStore = value
  },
  reset_store (state) {
    state.store = state.storeTemplate
  },
  enableT1Aisle (state, id) {
    state.T1Aisles.forEach(aisle => {
      if (aisle.category_id === id) { aisle.enabled = false }
    })
    if (!(id in state.T2Aisles)) {
      shop.templateCategoriesT2(id).then(response => {
        Vue.set(state.T2Aisles, id, response.data)
      })
    }
    if (id in state.T2Aisles) {
      Vue.delete(state.T2Aisles, id)
      // setTimeout(console.log(this.T2Aisles), 300)
    }
  },
  addDeleteAisle (state, id) {
    let index = state.store.category_ids.indexOf(id)
    if (index > -1) {
      state.store.category_ids.splice(index, 1)
    }
    else {
      state.store.category_ids.push(id)
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
