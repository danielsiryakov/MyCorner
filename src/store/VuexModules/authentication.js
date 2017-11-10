import axios from 'axios'
import router from '../../router'
import shop from '../../api/shop'
import {
  Cookies,
  LocalStorage
} from 'quasar'

const LOGIN_URL = shop.API_URL + 'user/login'
const SIGNUP_URL = shop.API_URL + 'user/create'
const USER_RETRIEVE = shop.API_URL + 'user/retrieve'

const state = {
  authenticated: false
}

const actions = {
  login2 ({ commit }, creds, errorCb) {
    axios.get(LOGIN_URL, {
      params: {
        email: creds.email,
        password: creds.password
      }
    }).then(function (response) {
      console.log(response.data)
      Cookies.set('userID', response.data.login.userID, {
        path: '/',
        expires: 10
      })
      Cookies.set('authtoken', response.data.login.authtoken, {
        path: '/',
        expires: 10
      })
      axios.defaults.headers.common['authtoken'] = response.data.login.authtoken
      axios.defaults.headers.common['userID'] = response.data.login.userID
      commit('authenticationTrue')
      router.push('/')
    }).catch(error => {
      if (error) {
        errorCb(error)
        console.log(error)
      }
    })
  },
  retrieve ({ commit }) {
    axios.get(USER_RETRIEVE).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  },

  signup ({ commit }, creds) {
    return axios.post(SIGNUP_URL, JSON.stringify(creds))
  },

  logout ({ commit }) {
    router.push('/home')
    Cookies.remove('userID')
    Cookies.remove('authtoken')
    LocalStorage.remove('authtoken')
    commit('authenticationFalse')
    router.replace('/reload')
  }
}

const mutations = {
  authenticationTrue (state) {
    state.authenticated = true
  },
  authenticationFalse (state) {
    state.authenticated = false
  },
  checkAuth: function (state) {
    let hasCookies = Cookies.has('authtoken')
    console.log('has cookies: ' + hasCookies)
    if (hasCookies) {
      state.authenticated = true
    }
    else {
      state.authenticated = false
    }
  }
}

export default {
  state,
  actions,
  mutations
}
