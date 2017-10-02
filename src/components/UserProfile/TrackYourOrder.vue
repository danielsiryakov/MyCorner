<!--userOrderRetrieve-->
<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <q-stepper v-model="order.order_status" vertical ref="stepper" v-for="(order, key) in currentOrders" :key="key" v-if="order.order_status !== 'COMPLETED'">
      <!-- Step: -->
      <h5 class="text-bold text-tertiary" style="padding: 0px;">{{ order.store_name }}</h5>
      <q-step :title="step.data" :name="step.data" v-for="(step, key) in order.status_log" :key="key">
        {{ step.message }}
      </q-step>
    </q-stepper>
    <!--{{ currentOrders }}-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentStep: ''
      }
    },
    props: ['currentOrders'],
    methods: {
    }
  }
</script>

<style>
</style>
