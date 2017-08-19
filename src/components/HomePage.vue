<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div style="padding-left: 10px">
    <h5><big><q-icon class="text-bold" color="amber-9" name="arrow_upward"/></big>  Enter your address and find stores near you!</h5>
    <!--<q-item>-->
      <!--<h4 class="text-primary">What is MyCorner?</h4></q-item>-->
    <!--<q-item>-->
      <!--myCorner aims to empower local businesses. Empower local residents. Connect the neighborhood. Everything you need is just around theCorner, yourCorner, myCorner.-->
    <!--</q-item>-->
  </div>
</template>

<script>
  import Review from './Review.vue'
  export default {
    data () {
      return {}
    },
    components: {
      Review
    }
  }
</script>

<style>
</style>
