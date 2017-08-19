<template>
  <div>
    <h5 class="text-tertiary text-bold">Accepted Forms Of Payment</h5><br>
    <q-toggle v-model="ccAccepted" label="Credit Card"/>
    <q-toggle v-model="cashAccepted" label="Cash"/>
    <br><br>
    <q-input v-show="ccAccepted" name="cardholder-name" placeholder="Name on Card" class="full-width" v-model="ccCardName"/>
    <card :class='{ complete }'
          :stripe="stripeKey"
          :options="stripeOptions"
          :v-model="ccNumber"
          v-show="ccAccepted"
          @change='complete = $event.complete'
    ></card>
    <button class='pay-with-stripe' @click='pay' :disabled='!complete'>Pay with credit card</button>

    <q-input v-show="cashAccepted" name="cardholder-name" placeholder="Minimum cash order" class="full-width" v-model="cashMinOrderAmount" type="number" prefix="$"/>
  </div>
</template>

<script>
  import Cleave from 'vue-cleave'
  import { stripeKey, stripeOptions } from './stripeConfig.json'
  import { Card, createToken } from 'vue-stripe-elements'
  export default {
    data () {
      return {
        payment: {
          cash: {
            accepted: false,
            minimum_order_amount: null
            // not sure if we want to ask for a min amount required but this is fine for now
          },
          cc: {
            cardholder_name: '',
            accepted: false,
            cc_number: null,
            cc_exp: null,
            ccv: null
          }
        },
        cleaveOptions: {
          phone: true,
          phoneRegionCode: 'US'
        },
        complete: false,
        stripeKey: stripeKey,
        stripeOptions: stripeOptions
      }
    },
    methods: {
      pay () {
        // createToken returns a Promise which resolves in a result object with
        // either a token or an error key.
        // See https://stripe.com/docs/api#tokens for the token object.
        // See https://stripe.com/docs/api#errors for the error object.
        // More general https://stripe.com/docs/stripe.js#stripe-create-token.
        createToken().then(data => console.log(data.token))
      }
    },
    components: {
      Cleave,
      Card
    },
    computed: {
      cashAccepted: {
        get () { return this.$store.state.storeInfo.payment.cash.accepted },
        set (value) { this.$store.commit('update_cash', {accepted: value}) }
      },
      cashMinOrderAmount: {
        get () { return this.$store.state.storeInfo.payment.cash.minimum_order_amount },
        set (value) { this.$store.commit('update_cash', {minimum_order_amount: value}) }
      },
      ccAccepted: {
        get () { return this.$store.state.storeInfo.payment.cc.accepted },
        set (value) { this.$store.commit('update_cc', {accepted: value}) }
      },
      ccNumber: {
        get () { return this.$store.state.storeInfo.payment.cc.cc_number },
        set (value) { this.$store.commit('update_cc', {cc_number: value}) }
      },
      ccCardName: {
        get () { return this.$store.state.storeInfo.payment.cc.cardName },
        set (value) { this.$store.commit('update_cc', {cardName: value}) }
      }
    }
  }
</script>

<style>
  .stripe-card {
    width: 300px;
    border: 1px solid grey;
  }
  .stripe-card.complete {
    border-color: green;
  }
</style>
