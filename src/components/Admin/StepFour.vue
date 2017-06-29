<template>
  <div>
    <h6>Accepted Forms Of Payment</h6><br>
    <label>
      <q-toggle v-model="ccAccepted"></q-toggle>
        Credit Card
    </label>
    <label>
      <q-toggle v-model="cashAccepted"></q-toggle>
      Cash
    </label>
    <br><br>
    <div class="list bg-inverted-light" v-show="ccAccepted">
      <div class="item two-lines">
        <div class="item-content">
          <label class="text-primary">Name on Card</label>
          <i v-show="!ccCardName" class="text-red">*</i>
          <i v-show="ccCardName" class="text-green">check</i>
          <input name="cardholder-name" placeholder="Name on Card" class="full-width" v-model="ccCardName">
        </div>
      </div>
      <div class="item two-lines">
        <div class="item-content">
          <card :class='{ complete }'
                :stripe="stripeKey"
                :options="stripeOptions"
                :v-model="ccNumber"
                @change='complete = $event.complete'
          ></card>
        </div>
      </div>
    </div>
    <br>
    <div class="list bg-inverted-light" v-show="cashAccepted">
      <div class="item two-lines">
        <div class="item-content">
          <label class="text-primary">Cash orders must be at least:</label>
          <i v-show="!cashMinOrderAmount" class="text-red">attach_money</i>
          <i v-show="cashMinOrderAmount" class="text-green">attach_money</i>
          <input name="cardholder-name" placeholder="Minimum cash order" class="full-width" v-model="cashMinOrderAmount">
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
  import Cleave from 'vue-cleave'
  import { stripeKey, stripeOptions } from './stripeConfig.json'
  import { Card } from 'vue-stripe-elements'
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
