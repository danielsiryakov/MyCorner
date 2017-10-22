<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div style="padding-left: 10px">
    <!--<h5><big></big>  Enter your address and find stores near you!</h5>-->

    <q-carousel arrows dots class="bg-light mobile-only text-tertiary">
      <div slot="slide" class="" align="center">
        <h5 class="text-tertiary text-bold"><q-icon class="text-bold" color="amber-9" name="arrow_upward"/>Search for stores on your corner!</h5>
        <img src="../assets/icons/storeSearch.svg" alt="Online Grocery Shopping" height="200px">
      </div>
      <div slot="slide" class="" align="center">
        <h5 class="text-tertiary text-bold">Add your favorite items to your cart!</h5>
        <img src="../assets/icons/addProducts.svg" alt="Online Grocery Shopping" height="200px">
      </div>
      <div slot="slide" class="" align="center">
        <h5 class="text-tertiary text-bold">Have it delivered straight to your home!</h5>
        <img src="../assets/icons/groceryDelivered.svg" alt="Online Grocery Shopping" height="200px">
      </div>
    </q-carousel>

    <div class="row no-wrap desktop-only" style="padding: 20px;">
      <q-card class="bg-white" align="center" style="padding: 20px;">
        <h4 class="float-left text-bold text-primary">1</h4><br>
        <h5 class="text-tertiary text-bold"><q-icon class="text-bold" color="amber-9" name="arrow_upward"/>Search for stores on your corner!</h5>
        <img src="../assets/icons/storeSearch.svg" alt="Online Grocery Shopping" height="200px">
      </q-card>
      <q-card class="bg-white" align="center" style="padding: 20px;">
        <h4 class="float-left text-bold text-primary">2</h4><br>
        <h5 class="text-tertiary text-bold">Add your favorite items to your cart!</h5>
        <img src="../assets/icons/addProducts.svg" alt="Online Grocery Shopping" height="200px">
      </q-card>
      <q-card class="bg-white" align="center" style="padding: 20px;">
        <h4 class="float-left text-bold text-primary">3</h4><br>
        <h5 class="text-tertiary text-bold">Have it delivered straight to your home!</h5>
        <img src="../assets/icons/groceryDelivered.svg" alt="Online Grocery Shopping" height="200px">
      </q-card>
    </div>
    <br><br><br><br>
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
