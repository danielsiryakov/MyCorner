<template>
  <div>
    <card class='StripeElement'
          :class='{ complete }'
          :stripe=stripeKey
          :options='stripeOptions'
          @change='complete = $event.complete'
    />
    <!--<button class='pay-with-stripe' @click='pay' :disabled='!complete'>Pay with credit card</button>-->
  </div>
</template>

<script>
  import { stripeKey, stripeOptions } from './Onboard/stripeConfig.json'
  import { Card, createToken } from 'vue-stripe-elements'
  export default {
    data () {
      return {
        complete: false,
        stripeOptions: stripeOptions,
        stripeKey: stripeKey
      }
    },
    components: { Card },
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
    watch: {
      complete: function () {
        createToken().then(data => {
          this.$emit('gotToken', data.token.id)
          console.log(data.token.id)
        })
      }
    }
  }
</script>

<style scoped>

  .StripeElement {
    background-color: white;
    padding-top: 5px;
    padding-right: 5px;
    padding-left: 5px;
    padding-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #2f2f2f;
    color: black !important;
    /*box-shadow: 0 1px 3px 0 #e6ebf1;*/
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }
  .StripeElement--focus {
    box-shadow: 0 0 5px #3bc18c !important;
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
    border: 1px solid #3bc18c !important;
  }
  /*.StripeElement--focus {*/
    /*box-shadow: 0 1px 3px 0 #cfd7df;*/
  /*}*/

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }

</style>
