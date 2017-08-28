<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <div v-if="Object.keys(wallet).length !== 0 && wallet.constructor === Object">
      <q-item class="group" v-for="(card, key) in wallet.data" :key="key">
        <span class="text-bold">{{ card.brand }}: </span>
        ******{{ card.last4 }} <span style="padding-left: 10px;">exp: </span>{{ card.exp_month }}/{{ card.exp_year }}
      </q-item>
    </div>

    <q-item-side right color="primary">
      <q-btn color="primary"  @click='customButton'>Add CC to your wallet</q-btn>
    </q-item-side>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Cookies, LocalStorage} from 'quasar'
  import StripeCheckout from 'stripe-checkout'
  import { stripeKey, stripeOptions } from '../Admin/Onboard/stripeConfig.json'
  import shop from '../../api/shop'
  export default {
    data () {
      return {
        stripeKey: stripeKey,
        stripeOptions: stripeOptions
      }
    },
    components: {
      'stripe-checkout': StripeCheckout
    },
    computed: {
      wallet: {
        get () { return this.$store.state.userInfo.wallet.sources }
      }
    },
    methods: {
      customButton () {
        const stripe = StripeCheckout({
          key: this._data.stripeKey
        })
        stripe({
          label: '',
          name: 'Wallet',
          description: 'Add a credit card to your wallet!',
          allowRememberMe: true,
          email: 'users@email.com',
          image: './statics/iconDark.ico'
        }).then(token => {
          console.log(token)
          shop.userWalletAdd(token.id).then(response => {
            console.log(response.data)
//            console.log(response.data)
            console.log(response.data.login.authtoken)
            Cookies.set('userID', response.data.login.userID, {
              path: '/',
              expires: 10
            })
            Cookies.set('authtoken', response.data.login.authtoken, {
              path: '/',
              expires: 10
            })
            axios.defaults.headers.common['authtoken'] = response.data.login.authtoken
            axios.defaults.headers.common['userID'] = response.data.login.userID
            LocalStorage.set('authtoken', response.data.login.authtoken)
          })
//          shop.userWalletAdd(token)
          shop.userWalletRetrieve()
        })
      }
    }
  }
</script>

<style>
</style>
