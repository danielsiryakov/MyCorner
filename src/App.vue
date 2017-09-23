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
        'getAddressBook',
        'getWallet'
      ]),
      atStartUp () {
//        isAuthenticated =
        if (this.$store.state.auth.authenticated === true) {
          this.getUserInfo()
          this.getAddressBook()
          this.retriesActiveCarts()
          this.getWallet()
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
