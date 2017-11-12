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
        <q-collapsible opened icon="shopping_cart" :label="formattedTitle(cart.store_name)" v-if="cart.totals.subtotal" class="cartItems" inset>
          <q-side-link class="text-tertiary" style="border: 1px solid" item :to="{name: 'store', params: {id: cart.store_id}}" exact>
            <q-icon name="keyboard_arrow_left"></q-icon>Shop for more items!
          </q-side-link>
          <br>
          <q-item class="bg-white cursor-pointer" v-for="p in cart.products" :key="p.asset_id" v-if="p.quantity && cart.totals.subtotal">
            <q-item-side @click="open(p, cart)" :avatar="p.image">
              <q-item-tile>
                {{ p.quantity }} x {{ formattedPrice(p.price_cents) }}
              </q-item-tile>
            </q-item-side>
            <q-item-main @click="open(p, cart)">{{ formattedTitle(p.label) }}</q-item-main>
            <q-icon name="delete" color="negative" @click="removeFromCart(p, cart)"></q-icon>
          </q-item>
          <br>
            <span class="text-bold" style="padding-left: 20px;">Subtotal:</span>
            <span>{{ formattedPrice(cart.totals.subtotal) }}</span><br><br>
            <q-btn  color="primary" :disabled="checkoutAvailable(cart)" @click="checkout(cart)" class="full-width">Checkout</q-btn>
        </q-collapsible>
      </q-list>
    </div>

    <q-modal  ref="checkout" class="bg-light maximized" content-classes="bg-light"	>
      <h4><q-icon name="close" class="text-negative absolute-top-right" @click="$refs.checkout.close()"/></h4>
      <checkout v-if="checkoutCart !== ''" :cart="checkoutCart" @checkedOut="checkedout"></checkout>
    </q-modal>

    <q-modal ref="productModal" class="" :content-css="{padding: '20px', maxWidth: '600px'}">
      <h4><q-icon name="close" class="text-negative absolute-top-right" @click="$refs.productModal.close()"/></h4>
      <!--<i class="text-negative" @click="$refs.productModal.close()">close</i>-->
      <product-page :productDetails="currentProductDetails" :product="ProductObject" :quantityProp="cartQuantity" v-on:added="close"></product-page>
    </q-modal>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ProductPage from './ProductPage.vue'
  import Checkout from './Checkout.vue'
  import shop from '../api/shop'
  export default {
    components: {
      ProductPage,
      Checkout
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
        'addToCart',
        'getStore',
        'retriesActiveCarts'
      ]),
      getProductDetails (id) {
        console.log('getting product details')
        shop.productTemplateRetrieve(id).then(response => {
          this.currentProductDetails = response.data
        })
      },
      checkedout () {
        this.retriesActiveCarts()
        this.$refs.checkout.close()
      },
      checkoutAvailable (cart) {
        let isAvailable = true
        if (cart.flags.is_valid_delivery === true || cart.flags.is_valid_pickup === true) {
          isAvailable = false
          console.log(cart.flags.is_valid_delivery)
          console.log(cart.flags.is_valid_pickup)
          console.log(isAvailable)
        }
        return isAvailable
      },
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
      open: function (product, cart) {
        this.ProductObject = product
        this.getProductDetails(product.asset_id)
        this.ProductObject['store_id'] = cart.store_id
        this.cartQuantity = product.quantity
        this.$refs.productModal.open()
      },
      close: function () {
        this.$refs.productModal.close()
      },
      checkout (cart) {
        this.checkoutCart = cart
        this.getStore(cart.store_id)
        this.$refs.checkout.open()
      }
    },
    data () {
      return {
        cartQuantity: 1,
        ProductObject: {},
        checkoutCart: '',
        currentProductDetails: {
          asset_id: '',
          link: '',
          size: '',
          title: '',
          details: [
            {
              body: '',
              header: ''
            }
          ],
          nutrition: {
            calories: '',
            disclaimer: '',
            serving_size: '',
            servings_per_container: '',
            nutrients: [
              {
                total: '',
                label: '',
                pct_daily_value: '',
                subcategories: []
              }
            ]
          },
          price_cents: '',
          display_title: '',
          template_category_id: ''
        }
      }
    }
  }
</script>

<style>
  .cartItems {
     padding: 8px 16px;
  }
</style>
