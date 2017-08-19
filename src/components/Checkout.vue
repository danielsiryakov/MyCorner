<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding bg-light">
    <div class="row justify-center group" v-if="cart">
      <div class="col-lg-8">
        <div v-if="orderPlaced == false">
          <h4 class="text-bold">Review and place order</h4>

          <!--<h5 class="text-bold">Review name, address, payments to complete your purchase</h5>-->
          <br>
          <span class="text-bold">Address:</span>
          {{ user.defaultAddress.line1 }}<br><br>
          <span class="text-bold">Order Details:</span>
          <q-list no-border>
            <q-item class="bg-white" v-for="p in cart.products" :key="p.product_id" v-if="p.quantity>0">
              <q-item-side>{{ p.quantity }} x</q-item-side>
              <q-item-main>
                {{ p.title }}
              </q-item-main>

              <q-item-side>${{ p.price_cents / 100 }}</q-item-side>
            </q-item>
          </q-list>
          <br>
          <div class="group bg-white">
            <span class="text-bold">Item subtotal: </span> {{ formattedPrice(cart.totals.subtotal) }}<br>
            <span class="text-bold">Tax: </span>{{ formattedPrice(cart.totals.tax) }}<br>
            <span class="text-bold">Delivery Fee: </span> {{ formattedPrice(cart.delivery_fee) }} <br><br>
            <h5><span class="text-bold">Order Total: </span> {{ formattedPrice(cart.totals.total) }}</h5>
          </div>
          <br>
          <q-btn color="primary" class="full-width">Checkout</q-btn>
        </div>
      </div>
    </div>

    <div v-if="orderPlaced == true">
      <div class="bg-light">
        <h4 class="text-bold">Thank You For Your Order!</h4>
        <br>
        <h5 class="text-bold">{{ cart.store_name }}</h5>
        {{ store.address.line1 }}
      </div>

    </div>

  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        orderPlaced: false
      }
    },
    props: ['cart'],
    computed: {
      store () {
        return this.$store.state.storeSearch.currentStore
//        return this.allStores.find((s) => s._id === this.id) || {}}
      },
      user () {
        return this.$store.state.userInfo
      }
    },
    created () {
      this.getStore(this.cart.store_id)
//      this.getAllProducts(this.id)
    },
    methods: {
      ...mapActions([
        'getStore',
        'getAllProducts'
      ]),
      formattedPrice (itemTotal) {
        return (itemTotal / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
      }
    }
  }
</script>

<style>
</style>
