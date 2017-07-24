<template>
  <div class="">
    <!--<h3><q-icon name="shopping_cart"/></h3>-->
    <p v-show="Object.keys(carts).length == 0">
      Please add some products to cart.
    </p>

    <div v-show="Object.keys(carts).length > 0">
      <q-list multiline no-border inset-separator	sparse highlight
              v-show="Object.keys(carts).length > 0"
              v-for="(cart, key) in carts" :key="key">
        <q-list-header class="text-bold" inset><q-icon name="shopping_cart"/> Cart Products</q-list-header>
        <q-item class="bg-white" v-for="p in cart.products" :key="p.asset_id">
          <q-item-side :avatar="p.image">{{ p.quantity }} x </q-item-side>
          <q-item-main>{{ p.title }}</q-item-main>
        </q-item>
      </q-list>
      <br>
      <div class="cd-cart-total">
        <p class="group">Total: <span>$ {{ total }}</span></p>
      </div> <!-- cd-cart-total -->
      <!--<p><button :disabled="!products.length" @click="checkout(products)" class='checkout-button'>Checkout</button></p>-->
    </div>
    <!--<p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>-->
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        carts: 'cartProducts'
      }),
      checkoutStatus () {
        return this.$store.state.cart.lastCheckout
      },
      total () {
        let totalDollar = 0
        Object.keys(this.carts).forEach(key => {
          for (var i = 0; i < this.carts[key].products.length; i++) {
            totalDollar += (this.carts[key].products[i].quantity * this.carts[key].products[i].price_cents / 100)
          }
        })
        return totalDollar
      }
    },
    methods: {
      ...mapActions([
        'checkout'
      ])
    },
    data () {
      return {
      }
    }
  }
</script>

<style>
</style>
