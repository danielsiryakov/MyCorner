<template>
  <div id="q-app" @load="hideLoader()">
    <router-view></router-view>
    <q-ajax-bar position="top" color="amber-9"/>
  </div>
</template>

<script>
  import Loader from './store/otherJS/Loader'
  import { mapActions } from 'vuex'
  export default {
    name: 'q-app',
    methods: {
      ...mapActions([
        'retriesActiveCarts',
        'getUserInfo',
        'checkAuth',
        'getAddressBook',
        'getWallet'
      ]),
      atStartUp () {
        this.checkAuth()
//        isAuthenticated =
        if (this.$store.state.auth.authenticated === true) {
          this.getUserInfo()
        }
      }
    },
    created () {
      Loader.show()
      this.atStartUp()
    },
    beforeMount () {
      Loader.hide()
    }
  }
</script>

<style>
</style>
