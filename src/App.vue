<template>
  <div id="q-app" @load="hideLoader()">
    <router-view></router-view>
      <q-ajax-bar />
  </div>
</template>


<script>
  import Loader from './store/otherJS/Loader'
  import { mapActions } from 'vuex'
  export default {
    name: 'q-app',
    methods: {
      ...mapActions([
        'retriesActiveCarts'
      ])
    },
    created () {
      Loader.show()
      this.retriesActiveCarts()
    },
    beforeMount () {
      Loader.hide()
    }
  }
</script>

<style>
</style>
