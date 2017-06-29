<template>
  <div class="cart">
    <p v-show="!products.length">
      Please add some products to cart.
    </p>
    <div v-show="products.length > 0">
      <ul class ="cd-cart-items" v-for="p in products">
        <li>
          <span class="cd-qty">{{ p.quantity }}x</span><router-link :to="{name: 'product', params: {id: p.id}}">{{ p.title }}</router-link>
          <div class="cd-price">$ {{ p.price }}</div>
          <a href="#0" class="cd-item-remove cd-img-replace">Remove</a>
        </li>
      </ul>

      <div class="cd-cart-total">
        <p>Total <span>$ {{ total }}</span></p>
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
        products: 'cartProducts'
      }),
      checkoutStatus () {
        return this.$store.state.cart.lastCheckout
      },
      total () {
        return this.products.reduce((total, p) => {
          return total + p.price * p.quantity
        }, 0)
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
