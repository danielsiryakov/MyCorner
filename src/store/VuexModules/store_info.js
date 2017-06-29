import axios from 'axios'
import router from '../../router'
import { Cookies } from 'quasar'
const API_URL = 'http://mycorner.store:8001/api/'
const CREATE_STORE = API_URL + 'store/create'

const state = {
  user: {
    user_id: '',
    email: '',
    username: '',
    password: '',
    store_categories: []
  },
  store: {
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
    name: 'test test test76',
    image: '',
    delivery: {
      delivery_distance: 2,
      delivery_fee: 500,
      delivery_minimum: 500,
      minimum_time_to_delivery: 45,
      maximum_time_to_delivery: 100,
      service_offered: true
    },
    phone: 6666666666,
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
      country: 'USA',
      route: '',
      postal_code: '11235',
      longitude: -73.950,
      latitude: 40.680,
      administrative_area_level_1: 'NY'
    },
    short_description: 'some short description with words',
    long_description: 'some long description with lots of words describing the store. more words',
    category_names: ['Grocery', 'Corner Store'],
    categories: [{
      name: 'c_123',
      products: [{
        title: 'p1',
        description: 'asdadf',
        display_price: '$2.00'
      }]
    }]
  },
  product: {
    title: '',
    images: [], // leaving at top level for now (which means variants cant have imgs)
    category: '', // ? just one or list of cats it falls in (tempted to say list)
    keywords: [],
    description: '',
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
  category_tree: [],

  test: {
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
    name: 'test test test98',
    image: '',
    delivery: {
      delivery_distance: 2,
      delivery_fee: 500,
      delivery_minimum: 500,
      minimum_time_to_delivery: 45,
      maximum_time_to_delivery: 100,
      service_offered: true
    },
    phone: '(212) - 123 - 4567',
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
      country: 'USA',
      route: '',
      postal_code: '11235',
      longitude: -73.9505241,
      latitude: 40.6805029,
      administrative_area_level_1: 'NY'
    },
    short_description: 'some short description with words',
    long_description: 'some long description with lots of words describing the store. more words',
    category_names: ['Breakfast', 'Lunch', 'Dinner'],
    category_tree: [{
      name: 'c_123',
      products: [{
        title: 'p1',
        description: 'asdadf',
        display_price: '$2.00'
      }]
    }]
  }
}

const actions = {
  onFileChange ({commit}, e) {
    var files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    commit('createImage', files[0])
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
    // let authtoken = LocalStorage.get.item('authtoken')
    axios.defaults.headers.common['authtoken'] = authtoken
    axios.defaults.headers.common['userID'] = userID
    console.log(authtoken)
    axios.post(CREATE_STORE, JSON.stringify(state.store)).then(function (response) {
      router.push('/')
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  }
}

const mutations = {
  createImage (state, file) {
    // var image = new Image()
    var reader = new FileReader()
    reader.onload = (e) => {
      state.store.image = e.target.result
    }
    reader.readAsDataURL(file)
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
  update_working_hours (state, hours) {
    state.store.working_hours = hours
    //   state.store.working_hours.monday.hours.to = hours.monday.hours.to.HH + hours.monday.hours.to.mm
    //   state.store.working_hours.monday.hours.from = hours.monday.hours.from.HH + hours.monday.hours.from.mm
    //
    //   state.store.working_hours.tuesday.hours.to = hours.tuesday.hours.to.HH + hours.tuesday.hours.to.mm
    //   state.store.working_hours.tuesday.hours.from = hours.tuesday.hours.from.HH + hours.tuesday.hours.from.mm
    //
    //   state.store.working_hours.wednesday.hours.to = hours.wednesday.hours.to.HH + hours.wednesday.hours.to.mm
    //   state.store.working_hours.wednesday.hours.from = hours.wednesday.hours.from.HH + hours.wednesday.hours.from.mm
    //
    //   state.store.working_hours.thursday.hours.to = hours.thursday.hours.to.HH + hours.thursday.hours.to.mm
    //   state.store.working_hours.thursday.hours.from = hours.thursday.hours.from.HH + hours.thursday.hours.from.mm
    //
    //   state.store.working_hours.friday.hours.to = hours.friday.hours.to.HH + hours.friday.hours.to.mm
    //   state.store.working_hours.friday.hours.from = hours.friday.hours.from.HH + hours.friday.hours.from.mm
    //
    //   state.store.working_hours.saturday.hours.to = hours.saturday.hours.to.HH + hours.saturday.hours.to.mm
    //   state.store.working_hours.saturday.from = hours.saturday.hours.from.HH + hours.saturday.hours.from.mm
    //
    //   state.store.working_hours.saturday.hours.to = hours.saturday.hours.to.HH + hours.saturday.hours.to.mm
    //   state.store.working_hours.saturday.hours.from = hours.saturday.hours.from.HH + hours.saturday.hours.from.mm
    // }
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
