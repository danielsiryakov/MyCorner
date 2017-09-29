<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <div v-if="Object.keys(wallet).length !== 0 && wallet.constructor === Object && wallet.sources">
      <q-item class="group" v-for="(card, key) in wallet.sources.data" :key="key" >
        <span class="text-bold">{{ card.brand }}: </span>
        ******{{ card.last4 }} <span style="padding-left: 10px;">exp: </span>{{ card.exp_month }}/{{ card.exp_year }}
      </q-item>
    </div>
    <q-btn color="primary"  @click='addCreditCard'>Add CC to your wallet</q-btn>

    <q-item right color="primary">
      <!--<q-btn color="primary"  @click='customButton'>Add CC to your wallet</q-btn>-->


    </q-item>
    <div v-if="addcard">
      <q-field>
        <span class="">Enter card information:</span>
        <stripe-card  @gotToken="updateStripe"></stripe-card>
      </q-field>
      <br><br>
      <q-btn color="tertiary" :disabled="enablePayments" big @click="addCard">add card!</q-btn>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import {Cookies, LocalStorage} from 'quasar'
  import StripeCheckout from 'stripe-checkout'
  import StripeCard from '../Admin/StripeCard.vue'
  import { stripeKey, stripeOptions } from '../Admin/Onboard/stripeConfig.json'
  import shop from '../../api/shop'
  export default {
    data () {
      return {
        stripeKey: stripeKey,
        stripeOptions: stripeOptions,
        token: '',
        addcard: false,
        enablePayments: true
      }
    },
    components: {
      'stripe-checkout': StripeCheckout,
      StripeCard
    },
    computed: {
      wallet: {
        get () { return this.$store.state.userInfo.wallet }
      }
    },
    methods: {
      addCreditCard () {
        this.addcard = true
      },
      updateStripe (value) {
        console.log(value)
        this.token = value
        this.enablePayments = false
      },
      addCard () {
//        const stripe = StripeCheckout({
//          key: this._data.stripeKey
//        })
//        stripe({
//          label: '',
//          name: 'Wallet',
//          description: 'Add a credit card to your wallet!',
//          allowRememberMe: true,
//          email: 'users@email.com',
//          image: './statics/iconDark.ico'
//        }).then(token => {
        shop.userWalletAdd(this.token).then(response => {
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
        this.addcard = false
      }
    }
  }
</script>

<style>
</style>
