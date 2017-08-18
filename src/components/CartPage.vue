<template>
  <div class="">
    <!--<h3><q-icon name="shopping_cart"/></h3>-->
    <p class="text-bold text-tertiary" style="padding: 10px;" v-show="!hasNonEmptyCart">
      Please add some products to cart :/
    </p>

    <div v-if="hasNonEmptyCart">
      <q-list multiline no-border inset-separator	sparse highlight
              v-if="hasNonEmptyCart"
              v-for="(cart, key) in carts" :key="key">
        <q-collapsible opened icon="shopping_cart" :label="formattedTitle(cart.store_name)" v-if="cart.totals.subtotal" class="" inset>
          <q-side-link class="bg-tertiary text-white" item :to="{name: 'store', params: {id: cart.store_id}}" exact>< Shop for more items!</q-side-link>
          <br>
          <q-item class="bg-white" @click="open(p, cart)" v-for="p in cart.products" :key="p.asset_id" v-if="p.quantity && cart.totals.subtotal">
            <q-item-side :avatar="p.image">
              <q-item-tile>
                {{ p.quantity }} x {{ formattedPrice(p.price_cents) }}
              </q-item-tile>
            </q-item-side>
            <q-item-main>{{ formattedTitle(p.title) }}</q-item-main>
            <q-icon name="delete" color="negative" @click="removeFromCart(p, cart)"></q-icon>
          </q-item>
          <br>
            <span class="text-bold" style="padding-left: 20px;">Cart Subtotal:</span>
            <span>{{ formattedPrice(cart.totals.subtotal) }}</span><br><br>
            <q-btn  color="primary" :disabled="true" @click="" class="full-width">Checkout</q-btn>
        </q-collapsible>
        <!--<q-list-header v-if="cart.totals.subtotal" class="text-bold" inset>-->
          <!--<q-icon name="shopping_cart"/>{{ formattedTitle(cart.store_name) }}-->
        <!--</q-list-header>-->

      </q-list>
    </div>
    <q-modal ref="productModal" class="minimized" :content-css="{padding: '20px', maxWidth: '500px', maxHeight: '500px'}">
      <h4><q-icon name="close" class="text-negative absolute-top-right" @click="$refs.productModal.close()"/></h4>
      <!--<i class="text-negative" @click="$refs.productModal.close()">close</i>-->
      <product-page :product="ProductObject" :quantityProp="cartQuantity" v-on:added="close"></product-page>
    </q-modal>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ProductPage from './ProductPage.vue'
  export default {
    components: {
      ProductPage
    },
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
      },
      open: function (Product, cart) {
        this.ProductObject = Product
        this.ProductObject['store_id'] = cart.store_id
        this.cartQuantity = Product.quantity
        this.$refs.productModal.open()
      },
      close: function () {
        this.$refs.productModal.close()
      }
    },
    data () {
      return {
        cartQuantity: 1,
        ProductObject: {}
      }
    }
  }
</script>

<style>
</style>
