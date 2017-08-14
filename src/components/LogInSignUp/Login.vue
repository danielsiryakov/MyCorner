<template>
  <div class="group">
    <!--------------login part----------->
    <h3>Log In</h3><br>
    <p>Log in to your account and access your corner!</p><br>
    <q-input autofocus :error="loginError" color="tertiary" v-model="email" type="email" stack-label="Enter Your Email" clearable />
    <q-input :error="loginError" color="tertiary" v-model="password" type="password" stack-label="Enter Your Password" v-on:keyup.enter="submitLogIn" clearable />
    <small @click="$refs.forgotPassword.open()">forgot your password?</small>
    <br><br>
    <q-btn loader color="primary" @click="submitLogIn">Log In</q-btn>
    <img class="float-right" src="../assets/basket.png" alt="" width="150px" height="150px">

    <!--------------reset password part----------->
    <q-modal @close="resetSettings" ref="forgotPassword" content-css="padding: 20px">
      <div v-if="!resetClicked">
        <h5>Forgot Your Password?</h5><br>
        <p>No problem! Enter your email and new password.</p><br>
        <q-input :error="resetError" color="tertiary" v-model="email" type="email" stack-label="Enter Your Email" clearable />
        <q-input :error="resetError" color="tertiary" v-model="newPassword" type="password" stack-label="Enter Your New Password" v-on:keyup.enter="resetPassword" clearable />
        <br><br>
        <q-btn loader color="primary" @click="resetPassword">Reset Password</q-btn>
        <q-btn class="float-right" color="tertiary" @click="$refs.forgotPassword.close()">close</q-btn>
        <br><br><br>
        <img class="float-right" src="../assets/basket.png" alt="" width="150px" height="150px">
      </div>

      <div v-if="resetClicked" style="max-width: 500px">
        <h4>we sent you a confirmation email!</h4><br>
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
  const LOGIN_URL = shop.API_URL + 'user/login'
//  const SIGNUP_URL = API_URL + 'user/create'
//  const USER_RETRIEVE = API_URL + 'user/retrieve'
  export default {
    data () {
      return {
        password: '',
        newPassword: '',
        email: '',
        loginError: false,
        resetError: false,
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
        'retrieve',
        'getUserInfo',
        'retriesActiveCarts'
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
          console.log('user info: ')
          console.log(response)
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
          this.getUserInfo()
          this.retriesActiveCarts()
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
      },
      resetPassword () {
        this.resetClicked = true
        let creds = {
          email: this.email,
          password: this.password
        }
        shop.resendPassword(creds).catch(error => {
          console.log(error)
        })
      },
      resetSettings () {
        this.resetClicked = false
      }
    }
  }
</script>
