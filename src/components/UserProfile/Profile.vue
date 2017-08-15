<template>
    <div class="">
      <div class ="layout-padding">
        <div class="row justify-center">
          <div class="col-lg-8">
            <h4 class="text-bold">Profile Information</h4>
            <q-list highlight class="bg-white">
              <q-list-header>{{ user.email }}</q-list-header>
              <q-collapsible indent label="Address Book">
                <q-item class="group" v-for="address in this.$store.state.userInfo.address_book" :key="address.id">
                  <span class="text-bold" style="padding-right: 10px">{{address.name}}: </span> {{address.line1}}
                  <q-chip v-if="address.default" small color="amber-9">default</q-chip>
                  <q-item-side right color="primary">
                    <q-icon name="edit" @click="editAddress(address)"/>
                  </q-item-side>
                </q-item>
              </q-collapsible>
              <q-collapsible label="Track Your Order">
                <div>
                  Content
                </div>
              </q-collapsible>
              <q-collapsible label="Past Orders/ Reorder">
                <div>
                  Content
                </div>
              </q-collapsible>
              <q-collapsible label="Your Wallet">
                <q-collapsible label="Add a CC to your wallet">
                  <card class='stripe-card'
                        :class='{ complete }'
                        :stripe= stripeKey
                        :options='stripeOptions'
                        @change='complete = $event.complete'
                  />
                  <q-item-side right color="primary"><q-btn class='pay-with-stripe' @click='pay' :disabled='!complete'>Save</q-btn></q-item-side>
                </q-collapsible>
              </q-collapsible>
            </q-list>
            <q-modal ref="addressDisplay" class="minimized" :content-css="{padding: '20px', maxWidth: '500px', maxHeight: '300px'}">
              <h4 class="text-bold text-tertiary">Make this Your default address?</h4>
              <span class="text-bold">{{ selectedAddress.line1 }}</span><br><br>
              <div class="group">
                <q-btn color="primary" @click="makeDefault">Make Default</q-btn>
                <q-btn outline color="tertiary" @click="this.$refs.addressDisplay.close()">Cancel</q-btn>
              </div>
                <!--<address-edit :address="selectedAddress"></address-edit>-->
            </q-modal>
            <br>
            <br>
            <div class="row justify-center">
              <div class="col-8">
                <q-btn class="full-width" color="primary" outline @click="logout">Log out</q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { stripeKey, stripeOptions } from '../Admin/Onboard/stripeConfig.json'
  import { Card, createToken } from 'vue-stripe-elements'
  import shop from '../../api/shop'
  import AddressEdit from './AddressEdit.vue'
  export default {
    components: {
      AddressEdit,
      Card
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      wallet: {
        get () {
          return this.$store.state.userInfo.wallet
        }
      }
    },
    methods: {
      ...mapActions([
        'getUserInfo',
        'logout',
        'getWallet',
        'addWallet'
      ]),
      editAddress (address) {
        this.selectedAddress = address
        this.$refs.addressDisplay.open()
      },
      makeDefault () {
        shop.changeDefaultAddress(this.selectedAddress.address_id)
      },
      pay () {
        // createToken returns a Promise which resolves in a result object with
        // either a token or an error key.
        // See https://stripe.com/docs/api#tokens for the token object.
        // See https://stripe.com/docs/api#errors for the error object.
        // More general https://stripe.com/docs/stripe.js#stripe-create-token.
        createToken().then(data => {
          shop.userWalletAdd(data.token.id)
        })
        shop.userWalletRetrieve()
      }
    },
    created () {
      this.getUserInfo()
      this.getWallet()
    },
    data () {
      return {
        selectedAddress: {},
        complete: false,
        stripeKey: stripeKey,
        stripeOptions: stripeOptions
      }
    }
  }
</script>

<style>
  .q-item-label {
    font-weight: bold;
    font-size: larger;
    color: #0f1f38;
  }
  .stripe-card {
  }
  .stripe-card.complete {
    border-color: green;
  }
</style>
