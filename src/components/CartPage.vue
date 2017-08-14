<template>
  <div class="">
    <!--<h3><q-icon name="shopping_cart"/></h3>-->
    <p class="text-bold text-tertiary" style="padding: 10px;" v-show="Object.keys(carts).length == 0">
      Please add some products to cart :/
    </p>

    <div v-show="Object.keys(carts).length > 0">
      <q-list multiline no-border inset-separator	sparse highlight
              v-show="Object.keys(carts).length > 0"
              v-for="(cart, key) in carts" :key="key">
        <q-list-header class="text-bold" inset><q-icon name="shopping_cart"/> {{ cart.store_name }}</q-list-header>
        <q-item class="bg-white" v-for="p in cart.products" :key="p.asset_id" v-if="p.quantity > -1">

          <q-item-side :avatar="p.image">
            <q-item-tile>
              {{ p.quantity }} x {{ (p.price_cents/100).toLocaleString('en-US', {style: 'currency', currency: 'USD',}) }}
            </q-item-tile>
          </q-item-side>
          <q-item-main v-if="p.title.length > 35">{{ p.title.substring(0,35) }}...</q-item-main>
          <q-item-main v-if="p.title.length <= 35">{{ p.title }}</q-item-main>
          <q-icon name="delete" color="negative" @click="removeFromCart(p, cart)"></q-icon>
        </q-item>
        <br>
        <span class="text-bold" style="padding-left: 20px;">Cart Total:</span>
          {{ (cart.totals.total/100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }) }}
      </q-list>
      <br>
      <div class="cd-cart-total">
        <p class="group">Total: <span> {{ total.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }) }}</span></p>
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
//        Object.keys(this.carts).forEach(key => {
//          for (var i = 0; i < this.carts[key].products.length; i++) {
//            totalDollar += (this.carts[key].products[i].quantity * this.carts[key].products[i].price_cents / 100)
//          }
//        })
        return totalDollar
      }
    },
    methods: {
      ...mapActions([
        'checkout',
        'addToCart'
      ]),
      removeFromCart (product, cart) {
        this.addToCart({
          asset_id: product.asset_id,
          title: product.title,
          image: product.image,
          price_cents: product.price_cents,
          quantity: 0,
          store_id: cart.store_id,
          product_id: product.product_id
        })
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style>
</style>
