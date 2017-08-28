<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <q-list v-if="orders">
      <q-item v-for="(order, key) in orders" :key="key" class="group">
        <q-item-side>
          <span class="text-bold">Type: {{ order.order_type }}</span><br>
          {{ formatTimeStamp(order.times.completed_at) }}
        </q-item-side>
        <q-item-main></q-item-main>
        <q-item-side>
          <span class="text-bold">Payment:</span> {{order.payment_method}}<br>
          <span class="text-bold">Status:</span> {{order.order_status}}
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
  import { date } from 'quasar'
//  import shop from '../../../api/shop'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {}
    },
    created () {
      this.getActiveOrders()
    },
    computed: {
      selectedStore: {
        get () { return this.$store.state.storeInfo.selectedStore }
      },
      orders: {
        get () { return this.$store.state.storeInfo.orders }
      }
    },
    methods: {
      ...mapActions([
        'getActiveOrders'
      ]),
      formatTimeStamp (timeStamp) {
        return date.formatDate(timeStamp, 'MM/DD/YYYY HH:mmA')
      }
    }
  }
</script>

<style>
</style>
