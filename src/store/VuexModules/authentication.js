import axios from 'axios'
import router from '../../router'
// import Router from '../router'
import { Cookies, LocalStorage } from 'quasar'

const API_URL = 'http://mycorner.store:8080/api/'
const LOGIN_URL = API_URL + 'user/login'
const SIGNUP_URL = API_URL + 'user/create'
const USER_RETRIEVE = API_URL + 'user/retrieve'

// var authtokenValue = Cookies.get('authtoken')
// var uidValue = Cookies.get('userID')

const state = {
  authenticated: false
}

const actions = {
  login ({ commit }, creds, errorCb) {
    axios.get(LOGIN_URL, {
      params: {
        email: creds.email,
        password: creds.password
      }
    }).then(function (response) {
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
      LocalStorage.set('authtoken', response.data.login.authtoken)
      commit('authenticationTrue')
      router.push('/')
      // Router.push('/')
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
    axios.post(SIGNUP_URL, JSON.stringify(creds)).then(function (response) {
      Cookies.set('userID', response.data.login.userID, {
        path: '/',
        expires: 10
      })
      Cookies.set('authtoken', response.data.login.authtoken, {
        path: '/',
        expires: 10
      })
      commit('authenticationTrue')
      // router.push('/')
    }).catch(function (error) {
      console.log(error)
    })
  },

  logout ({ commit }) {
    Cookies.remove('userID')
    Cookies.remove('authtoken')
    LocalStorage.remove('authtoken')
    commit('authenticationFalse')
    router.replace('/login')
  }
}

const mutations = {
  authenticationTrue (state) {
    state.authenticated = true
  },
  authenticationFalse (state) {
    state.authenticated = false
  },
  checkAuth (state) {
    if (Cookies.has('authtoken') || LocalStorage.has('authtoken')) {
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
