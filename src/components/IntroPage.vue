<template>
  <div class="layout-view" id="corner">
    <div class="flex window-height">
      <div class="sm-width-1of1 md-width-1of1 bg-width-5of5 lg-width-3of5">
        <img src="../assets/fulllogo.png" style="max-height: 8%; max-width: 80%">

        <q-modal ref="logInSignUp" transition="fade">
          <h4><q-icon class="text-primary float-left" style="padding-left: 20px" @click="$refs.logInSignUp.close()" name="close"/></h4>
          <br>
          <div class="layout-padding">
            <br>
            <q-tabs :refs="$refs" v-model="formTab" no-pane-border color="tertiary">
              <q-tab slot="title" name="login" label="log in"/>
              <q-tab slot="title" name="signup" label="Sign Up" />

              <q-tab-pane name="login"><login></login></q-tab-pane>
              <q-tab-pane v-if="!signedup" name="signup"><sign-up v-on:submit="signedup = true"></sign-up></q-tab-pane>
            </q-tabs>

            <div v-if="signedup" class="layout-padding">
              <h4>we sent you a confirmation email!</h4><br>
              <big class="text-tertiary">
                Confirm your email address and start shopping for everything you love!
              </big>
            </div>
          </div>
        </q-modal>
        <div class="flex group"  id="footer" style="padding: 20px;">
          <q-btn color="primary" class="full-width" @click="formTab='login', $refs.logInSignUp.open()">Login</q-btn>
          <q-btn color="primary" class="full-width" @click="formTab='signup', $refs.logInSignUp.open()">Sign Up</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Login from './Login.vue'
  import SignUp from './Signup.vue'
  import {
    QTabs, QRouteTab, QBtn, QIcon
  } from 'quasar'
  import { mapActions, mapState } from 'vuex'
  export default {
    data () {
      return {
        formTab: 'login',
        signedup: false
      }
    },
    components: {
      Login,
      SignUp,
      QTabs,
      QRouteTab,
      QBtn,
      QIcon
    },
    computed: mapState({
      userAuth: 'authenticated'
    }),
    methods: {
      ...mapActions([
        'authBasedRoute'
      ])
    },
    beforeMount () {
      this.authBasedRoute()
    }
  }
</script>

<style lang="scss">
  #corner {
    background-image: url("../assets/CornerShop.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
  #footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
