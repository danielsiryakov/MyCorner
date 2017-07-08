<template>
  <div class="group">
    <h3>Log In</h3><br>
    <p>Log in to your account and access your corner!</p><br>
    <q-input :error="loginError" color="tertiary" v-model="email" type="email" stack-label="Enter Your Email" suffix="@email.com" clearable />
    <q-input :error="loginError" color="tertiary" v-model="password" type="password" stack-label="Enter Your Password" v-on:keyup.enter="submitLogIn" clearable />
    <small @click="$refs.forgotPassword.open()">forgot your password?</small>
    <br><br>
    <q-btn color="primary" @click="submitLogIn">Log In</q-btn>
    <img class="float-right" src="../assets/basket.png" alt="" width="150px" height="150px">

    <q-modal ref="forgotPassword" content-css="padding: 20px">
      <div v-if="!resetClicked">
        <h5>Forgot Your Password?</h5><br>
        <p>No problem! Enter your email and new password.</p><br>
        <q-input :error="loginError" color="tertiary" v-model="email" type="email" stack-label="Enter Your Email" suffix="@email.com" clearable />
        <q-input :error="loginError" color="tertiary" v-model="password" type="password" stack-label="Enter Your New Password" v-on:keyup.enter="resetPassword" clearable />
        <br><br>
        <q-btn color="primary" @click="resetPassword">Reset Password</q-btn>
        <q-btn class="float-right" color="tertiary" @click="$refs.forgotPassword.close()">close</q-btn>
        <br><br><br>
        <img class="float-right" src="../assets/basket.png" alt="" width="150px" height="150px">
      </div>
      <div v-if="resetClicked">
        <h5>we sent you a confirmation email!</h5><br>
        <big class="text-tertiary">
          Confirm your email address and start shopping for everything you love!
        </big>
      </div>
      </q-modal>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  import shop from '../api/shop'
  import {
    QInput, QBtn, Cookies, LocalStorage
  } from 'quasar'
  import axios from 'axios'
//  import router from '../router'
  // import Router from '../router'
//  import {  } from 'quasar'
//  const API_URL = 'http://24.198.140.214:8001/api/'

  const API_URL = 'http://mycorner.store:8080/api/'
  const LOGIN_URL = API_URL + 'user/login'
//  const SIGNUP_URL = API_URL + 'user/create'
//  const USER_RETRIEVE = API_URL + 'user/retrieve'
  export default {
    data () {
      return {
        password: '',
        repeatPassword: '',
        email: '',
        loginError: false,
        resetClicked: false
      }
    },
    components: {
      QInput,
      QBtn
    },
    methods: {
      ...mapActions([
//        'login',
        'retrieve'
      ]),
      ...mapMutations([
//        'login',
        'authenticationTrue'
      ]),
      login (creds) {
        axios.get(LOGIN_URL, {
          params: {
            email: creds.email,
            password: creds.password
          }
        }).then(response => {
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
          this.$store.commit('authenticationTrue')
          this.authenticationTrue()
          this.$router.push('/')
          // Router.push('/')
        }).catch(error => {
          this.loginError = true
          console.log(error)
        })
      },
      submitLogIn () {
        this.login(
          {
            'password': this.password,
            'email': this.email
          })
//        this.retrieve()
      },
      resetPassword () {
        this.resetClicked = true
        let creds = {
          email: this.email,
          password: this.password
        }
        shop.resendPassword(creds)
      }
    }
  }
</script>
