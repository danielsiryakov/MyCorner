
<template>
  <div>
    <card class='stripe-card'
          :stripe="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
          :options="options"
          @change='this.complete = true'
    />
    <button class='pay-with-stripe' @click='pay' :disabled='!complete'>Pay with credit card</button>
  </div>
</template>

<script>
  import { stripeKey, stripeOptions } from './stripeConfig.json'
  import { Card, createToken } from 'vue-stripe-elements'
  export default {
    data () {
      return {
        complete: false
      }
    },
    components: { Card },
    methods: {
      pay () {
        createToken().then(data => console.log(data.token))
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
