<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding bg-light">
    <div class="row justify-center group" v-if="cart">
      <div class="col-lg-8">
        <div v-if="!orderPlaced">
          <h4 class="text-bold">Review and place order</h4>
          <q-tabs :refs="$refs" v-model="orderType" no-pane-border color="white" >
            <q-tab default slot="title" name="Delivery" label="Delivery" class="text-tertiary text-bold"/>
            <q-tab slot="title" name="Pick-Up" label="Pick-Up" class="text-tertiary text-bold" />
          </q-tabs>
          <!--<h5 class="text-bold">Review name, address, payments to complete your purchase</h5>-->
          <br>
          <div v-if="orderType == 'Delivery'" class="">
            <span class="text-bold">Address:</span>
            <q-select
              v-model="selectedAddress"
              radio
              class="bg-white"
              :options="addressBookOptions"
            />
          </div>
          <br>
          <q-select
            v-model="selectedCC"
            radio
            class="bg-white"
            :options="walletOptions"
          />
          <!--:display-value="this.searchAddress"-->

          <!--{{ user.defaultAddress.line1 }}<br><br>-->
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
          <q-btn color="primary" class="full-width" @click="checkout">Checkout</q-btn>
        </div>
      </div>
    </div>

    <div v-if="orderPlaced">
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
  import { QSelect } from 'quasar'
  import shop from '../api/shop'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        isDelivery: true,
        orderType: 'Delivery',
        selectedAddress: '',
        selectedCC: '',
        orderPlaced: false
      }
    },
    components: {
      QSelect
    },
    props: ['cart'],
    computed: {
      searchAddress () {
        if (this.$store.state.storeSearch.address2.formatted_address === 'Type Your Address') {
          return this.defaultAddress.line1
        }
        else {
          return this.$store.state.storeSearch.address2.formatted_address
        }
      },
      store () {
        return this.$store.state.storeSearch.currentStore
//        return this.allStores.find((s) => s._id === this.id) || {}}
      },
      user () {
        return this.$store.state.userInfo
      },
      wallet: {
        get () { return this.$store.state.userInfo.wallet.sources }
      },
      defaultAddress () {
        if (this.$store.state.userInfo.defaultAddress) {
          return this.$store.state.userInfo.defaultAddress
        }
      },
      addressBook: {
        get () { return this.$store.state.userInfo.address_book }
      },
      addressBookOptions () {
        let options = []
        this.addressBook.forEach(address => {
          options.push({
            label: address.line1,
            value: address.address_id
          })
        })
        return options
      },
      walletOptions () {
        let options = []
        if (Object.keys(this.wallet).length !== 0 && this.wallet.constructor === Object) {
          this.wallet.data.forEach(card => {
            options.push({
              label: card.brand + ': ' + card.last4 + ' exp: ' + card.exp_month + '/' + card.exp_year,
              value: card.id
            })
          })
        }
        return options
      }
    },
    created () {
      if (this.cart.store_id) {
        this.getStore(this.cart.store_id)
        this.getAddressBook()
      }
//      this.getAllProducts(this.id)
    },
    methods: {
      ...mapActions([
        'getStore',
        'getAllProducts',
        'getAddressBook'
      ]),
      formattedPrice (itemTotal) {
        return (itemTotal / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
      },
      checkout () {
        let payload = {}
        payload.cart_id = this.cart.id
        payload.store_id = this.cart.store_id
        payload.instructions = ''
        console.log(this.orderType)
        if (this.orderType === 'Delivery') {
          payload.address_id = this.selectedAddress
          shop.orderCashDelivery(payload).then(response => {
            console.log('checkout successful')
            this.$emit('checkedOut')
            console.log(response.data)
          }).catch(error => {
            console.log(error)
          })
        }
        if (this.orderType === 'Pick-Up') {
          payload.card_id = this.selectedCC
          shop.orderCCPickup(payload).then(response => {
            console.log('checkout successful')
            this.$emit('checkedOut')
            console.log(response.data)
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }
</script>

<style>
</style>
