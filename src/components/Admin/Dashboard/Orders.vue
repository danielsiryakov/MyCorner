<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <div v-if="orders.length == 0">
      <h5>You don't have any orders yet :/ You should tell your customers about us!</h5>
    </div>
    <q-list v-if="orders.length > 0">
      <q-item separator
              v-for="(order, key) in orders"
              :key="key"
              class="group cursor-pointer"
              @click="getOrderDetails(order)">
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
    <q-modal ref="orderDetails" class="" :content-css="{padding: '20px', maxWidth: '800px', maxHeight: '800px'}">
      <h4><q-icon name="close" class="text-negative absolute-top-right" @click="$refs.orderDetails.close()"/></h4>
      <h4 class="text-bold text-tertiary">Order Details:</h4>
      <q-item class="bg-white" v-for="p in orderDetails" :key="p.asset_id"
        v-if="p.quantity > 0">
        {{ p.quantity }}x
        <q-item-side :image="p.image" style="padding-right: 10px;">
          <!--<img :src="p.image" style="width: 100px; height: 100px">-->
        </q-item-side>
        <!--<q-item-main v-if="p.title.length >= 30" class="">{{p.title.substring(0,30)}}...</q-item-main><br>-->
        <q-item-main class="">{{p.label}}</q-item-main><br>
      </q-item>
    </q-modal>
  </div>
</template>

<script>
  import { date, Loading, Alert } from 'quasar'
  import shop from '../../../api/shop'
  import { mapActions } from 'vuex'
  import axios from 'axios'
  export default {
    data () {
      return {
        orderPath: [],
        orderDetails: []
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
      getOrderDetails (order) {
        this.orderDetails = []
        Loading.show({
          delay: 200 // milliseconds
        })
        axios.defaults.headers.common['storeID'] = order.store_id
        shop.storeCartRetrieve(order.cart_id).then(response => {
          Loading.hide()
          this.orderDetails = response.data.products
          this.$refs.orderDetails.open()
        }).catch(error => {
          Loading.hide()
          const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
          setTimeout(alert.dismiss, 5000)
        })
      },
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
