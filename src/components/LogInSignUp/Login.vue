<template>
  <div class="group">
    <!--------------login part----------->
    <h3>Log In</h3><br>
    <p>Log in to your account and access your corner!</p><br>
    <q-input autofocus :error="loginError"  v-model="email" type="email" stack-label="Enter Your Email" clearable name="email"/>
    <q-input :error="loginError"  v-model="password" type="password" stack-label="Enter Your Password" v-on:keyup.enter="submitLogIn" clearable />
    <small @click="$refs.forgotPassword.open()">forgot your password?</small>
    <br><br>
    <q-btn :loader="loading" color="primary" @click="submitLogIn">Log In</q-btn>
    <img class="float-right" src="../../assets/basket.png" alt="" width="150px" height="150px">

    <!--------------reset password part----------->
    <q-modal @close="resetSettings" ref="forgotPassword" content-css="padding: 20px">
      <div v-if="!resetClicked">
        <h5>Forgot Your Password?</h5><br>
        <p>No problem! Enter your email and new password.</p><br>
        <q-input :error="resetError" color="tertiary" v-model="email" type="email" stack-label="Enter Your Email" clearable name="email"/>
        <q-input :error="resetError" color="tertiary" v-model="newPassword" type="password" stack-label="Enter Your New Password" v-on:keyup.enter="resetPassword" clearable />
        <br><br>
        <q-btn loader color="primary" @click="resetPassword">Reset Password</q-btn>
        <q-btn class="float-right" color="tertiary" @click="$refs.forgotPassword.close()">close</q-btn>
        <br><br><br>
        <img class="float-right" src="../../assets/basket.png" alt="" width="150px" height="150px">
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
  import shop from '../../api/shop'
//  import update_store_selection from '../../store/VuexModules/store_info'
  import {
    QInput, QBtn, Cookies, LocalStorage, Alert
  } from 'quasar'
  import axios from 'axios'
  const LOGIN_URL = shop.API_URL + 'user/login'
  export default {
    data () {
      return {
        password: '',
        loading: false,
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
        'retrieve',
        'getUserInfo',
        'retriesActiveCarts',
        'getAddressBook',
        'getWallet'
      ]),
      ...mapMutations([
        'authenticationTrue'
      ]),
      login (creds) {
        this.loading = true
        axios.get(LOGIN_URL, {
          params: {
            email: creds.email,
            password: creds.password
          }
        }).then(response => {
          this.loading = false
          this.$emit('closeModal')
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
          this.getAddressBook()
          this.retriesActiveCarts()
          this.getWallet()
          var sids = Object.keys(response.data.user_roles.store_map)
          if (sids.length > 0) {
            this.$store.commit('update_store_selection', sids[0])
//            axios.defaults.headers.common['storeId'] = sids[0]
          }
          console.log(this.$store.state)
          if (response.data.is_store_owner) {
            this.$router.push('/admin')
          }
          else {
            this.$router.push('/')
          }

          // Router.push('/')
        }).catch(error => {
          this.loading = false
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
          Alert.create({html: 'Something unexpected happened :/ password reset failed.'})
        })
      },
      resetSettings () {
        this.resetClicked = false
        console.log('modal closed')
      }
    }
  }
</script>
