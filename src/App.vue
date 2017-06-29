<template>
  <div id="q-app" @load="hideLoader()">
    <router-view></router-view>
    <q-ajax-bar :color="'#2ab982'"></q-ajax-bar>
  </div>
</template>


<script>
  import Loader from './store/otherJS/Loader'
  export default {
    name: 'q-app',
    methods: {
      hideLoader () {
        Loader.hide()
      },
      showLoader () {
        Loader.show()
      }
    },
    created () {
      this.showLoader()
    },
    beforeMount () {
      this.hideLoader()
    }
  }
</script>

<style>
</style>
