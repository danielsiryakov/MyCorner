<template>
  <div id="q-app" @load="hideLoader()">
    <router-view></router-view>
    <q-ajax-bar position="top" color="red"/>
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
        'getUserInfo'
      ]),
      atStartUp () {
//        isAuthenticated =
        if (this.$store.state.auth.authenticated === true) {
          this.getUserInfo()
          this.retriesActiveCarts()
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
