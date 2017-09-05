<!--userOrderRetrieve-->
<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <q-stepper v-model="currentStep" vertical ref="stepper" v-for="(order, key) in currentOrders" :key="key">
      <!-- Step: -->
      <q-step :title="step.data" v-for="(step, key) in order.status_log" :key="key">
        {{ step.message }}
      </q-step>
    </q-stepper>
    <!--{{ currentOrders }}-->
  </div>
</template>

<script>
  import shop from '../../api/shop'
  export default {
    data () {
      return {
        currentStep: '',
        currentOrders: ''
      }
    },
    methods: {
      getActiveOrders () {
        shop.userOrderRetrieve().then(response => {
          this.currentOrders = response.data
        })
      }
    },
    created () {
      this.getActiveOrders()
    }
  }
</script>

<style>
</style>
