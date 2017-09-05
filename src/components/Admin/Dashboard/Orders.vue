<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <q-list v-if="orders.length > 0">
      <q-item v-for="(order, key) in orders" :key="key" class="group">
        <q-item-side>
          <span class="text-bold">Type: {{ order.order_type }}</span><br>
          <span class="text-bold">Payment:</span> {{order.payment_method}}<br>
          <span class="text-bold">Status:</span> {{order.order_status}}<br>
          {{ formatTimeStamp(order.created_at) }} <br>

        </q-item-side>
        <q-item-main></q-item-main>
        <q-item-side>
          <q-btn big color="primary" @click="updateStatus(order, orderPath[order.order_type][order.order_status][0])">{{orderPath[order.order_type][order.order_status][0]}}</q-btn>
          <q-btn small outline color="negative" @click="updateStatus(order, orderPath[order.order_type][order.order_status][1])">{{orderPath[order.order_type][order.order_status][1]}}</q-btn>
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
  import { date } from 'quasar'
  import shop from '../../../api/shop'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        orderPath: ''
      }
    },
    created () {
      this.getActiveOrders()
      this.getHelperOrderPath()
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
      },
      getHelperOrderPath () {
        shop.helperOrderStatusPath().then(response => {
          this.orderPath = response.data
        })
      },
      updateStatus (order, status) {
        shop.orderStatusUpdate({
          order_id: order.id,
          new_status: status,
          message: status
        }).then(() => {
          this.getActiveOrders()
        })
      }
    }
  }
</script>

<style>
</style>
