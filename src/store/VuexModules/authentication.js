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
  authenticated: false,
  loggedIn: false,
  loginError: false
}

const actions = {
  login ({ dispatch, commit }, creds) {
    axios.get(LOGIN_URL, {
      params: {
        email: creds.email,
        password: creds.password
      }
    }).then(response => {
      commit('loginSuccess')
      commit('setUserInfo', response.data)
      commit('authenticationTrue')
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
      // LocalStorage.set('authtoken', response.data.login.authtoken)
      var sids = Object.keys(response.data.user_roles.store_map)
      dispatch('getUserInfo')
      if (sids.length > 0) {
        commit('update_store_selection', sids[0])
      }
      // router.push('/store_search')
      if (response.data.is_store_owner) {
        router.push({ name: 'admin' })
      }
      else {
        router.push({ name: 'home' })
      }
    }).catch(error => {
      // this.loginError = true
      commit('loginError')
      console.log(error)
    })
  },
  login2 ({ commit }, data) {
    if (data.is_store_owner) {
      router.push({ name: 'admin' })
    }
    else {
      router.push({ name: 'home' })
    }
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
    Cookies.remove('userID')
    Cookies.remove('authtoken')
    LocalStorage.remove('authtoken')
    commit('authenticationFalse')
    router.push('/')
  },
  async checkAuth ({ commit }) {
    var hasCookies = Boolean(Cookies.has('authtoken'))
    console.log('has cookies: ' + hasCookies)
    if (hasCookies) {
      await commit('authenticationTrue')
    }
    else {
      await commit('authenticationFalse')
    }
  }
}

const mutations = {
  authenticationTrue (state) {
    state.authenticated = true
  },
  loginError (state) {
    state.loginError = true
  },
  loginSuccess (state) {
    state.loggedIn = true
  },
  authenticationFalse (state) {
    state.authenticated = false
  }
}

export default {
  state,
  actions,
  mutations
}
