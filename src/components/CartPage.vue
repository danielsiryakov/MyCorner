<template>
  <div class="">
    <!--<h3><q-icon name="shopping_cart"/></h3>-->
    <p class="text-bold text-tertiary" style="padding: 10px;" v-show="!hasNonEmptyCart">
      Please add some products to cart :/
    </p>

    <div v-show="hasNonEmptyCart">
      <q-list multiline no-border inset-separator	sparse highlight
              v-show="hasNonEmptyCart"
              v-for="(cart, key) in carts" :key="key">
        <q-list-header v-if="cart.totals.subtotal" class="text-bold" inset>
          <q-icon name="shopping_cart"/>{{ formattedTitle(cart.store_name) }}
        </q-list-header>
        <q-item class="bg-white" v-for="p in cart.products" :key="p.asset_id" v-if="p.quantity && cart.totals.subtotal">
          <q-item-side :avatar="p.image">
            <q-item-tile>
              {{ p.quantity }} x {{ formattedPrice(p.price_cents) }}
            </q-item-tile>
          </q-item-side>
          <q-item-main>{{ formattedTitle(p.title) }}</q-item-main>
          <q-icon name="delete" color="negative" @click="removeFromCart(p, cart)"></q-icon>
        </q-item>
        <q-list slot="footer" v-if="cart.totals.subtotal">
          <br>
          <span class="text-bold" style="padding-left: 20px;">Cart Subtotal:</span>
          <span>{{ formattedPrice(cart.totals.subtotal) }}</span>
          <button :disabled="true" @click="" class="on-right">Checkout</button>
        </q-list>
      </q-list>
    </div>
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
      hasNonEmptyCart () {
        var check = false
        Object.keys(this.carts).forEach(key => {
          for (var i = 0; i < this.carts[key].products.length; i++) {
            if (this.carts[key].products[i].quantity) {
              check = true
            }
          }
        })
        return check
      }
    },
    methods: {
      ...mapActions([
        'checkout',
        'addToCart'
      ]),
      formattedPrice (itemTotal) {
        return (itemTotal / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
      },
      formattedTitle (title) {
        if (title.length > 35) {
          return title.substring(0, 35) + '...'
        }
        return title
      },
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
