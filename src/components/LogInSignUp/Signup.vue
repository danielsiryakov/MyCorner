<template>
  <div class="group" style="padding: 0px">
    <h3>Sign Up</h3><br>
    Are you a user or store owner?
    <q-tabs :refs="$refs" v-model="formTab" no-pane-border color="white" >
      <q-tab slot="title" name="user" label="User" class="text-tertiary text-bold"/>
      <q-tab slot="title" name="owner" @click="this.is_store_owner = true" label="Store Owner"class="text-tertiary text-bold" />

      <!--<q-tab-pane name="login"><login></login></q-tab-pane>-->
      <!--<q-tab-pane v-if="!signedup" name="signup"><sign-up v-on:submit="signedup = true"></sign-up></q-tab-pane>-->
    </q-tabs>

    <p>Signup and join YOUR corner!
      Groceries, wine, and more!</p>
    <br>
    <q-input v-model="email" type="email" stack-label="Enter Your Email" clearable name="email"/>
    <q-input v-model="password" type="password" stack-label="Enter Your password" clearable @keyup.enter="submit"/>
    <small>By signing up, you agree to MyCorner's <span class="text-blue" @click="$refs.termsofservice.open()">terms of use</span> and
      <span class="text-blue" @click="$refs.privacy.open()">privacy policy</span></small>
    <br><br>
    <q-btn loader color="primary" @click="submit">Sign Up</q-btn>
    <img class="float-right" src="../../assets/basket.png" alt="" width="150px" height="150px">
    <q-modal class="maximized" ref="termsofservice">
      <h4><q-icon name="close" class="text-primary absolute-top-right" @click="$refs.termsofservice.close()"/></h4>
      <br>
      <terms-of-service></terms-of-service>
    </q-modal>
    <q-modal class="maximized" ref="privacy">
      <h4><q-icon name="close" class="text-primary absolute-top-right" @click="$refs.privacy.close()"/></h4>
      <br>
      <privacy></privacy>
    </q-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import {
    QInput, QBtn, Cookies
  } from 'quasar'
  import TermsOfService from './TermsOfService.vue'
  import Privacy from './Privacy.vue'
  export default {
    data () {
      return {
        password: '',
        email: '',
        is_store_owner: false
      }
    },
    props: ['formTab'],
    components: {
      QInput, QBtn, TermsOfService, Privacy
    },
    methods: {
      ...mapActions([
        'signup'
      ]),
      submit () {
        if (this.formTab === 'owner') { this.is_store_owner = true }
        this.signup(
          {
            'password': this.password,
            'email': this.email,
            'is_store_owner': this.is_store_owner
          }).then(response => {
            Cookies.set('userID', response.data.login.userID, {
              path: '/',
              expires: 10
            })
            Cookies.set('authtoken', response.data.login.authtoken, {
              path: '/',
              expires: 10
            })
            this.$store.commit('authenticationTrue')
            this.$emit('submit')
            // router.push('/')
          }).catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>
