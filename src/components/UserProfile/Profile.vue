<template>
    <div class="">
      <div class ="layout-padding">
        <div class="row justify-center">
          <div class="col-lg-8">
            <h4 class="text-bold">Profile Information</h4>
            <q-list separator	highlight class="bg-white">
              <q-list-header>{{ user.email }}</q-list-header>

              <q-collapsible opened indent label="Address Book">
                <q-item  class="group" v-for="address in this.$store.state.userInfo.address_book" :key="address.id">
                  <span class="text-bold" style="padding-right: 10px">{{address.name}}: </span> {{address.line1}}
                  <q-chip v-if="address.default" small color="amber-9">default</q-chip>
                  <q-item-side right color="primary">
                    <q-icon name="edit" @click="editAddress(address)"/>
                  </q-item-side>
                </q-item>
              </q-collapsible>

              <q-collapsible opened label="Track Your Order">
                <div>
                  Content
                </div>
              </q-collapsible>

              <q-collapsible opened label="Past Orders/ Reorder">
                <div v-if="completedCarts.length > 0">
                  {{ completedCarts }}
                </div>
                <div v-if="completedCarts.length === 0">
                  No orders to show :/ order some products...they are good, we promise :)
                </div>
              </q-collapsible>

              <q-collapsible opened label="Your Wallet">
                <q-item class="group" v-for="(card, key) in wallet.sources.data" :key="key" v-if="wallet">
                  <span class="text-bold">{{ card.brand }}: </span>
                  ******{{ card.last4 }} <span style="padding-left: 10px;">exp: </span>{{ card.exp_month }}/{{ card.exp_year }}
                </q-item>
                <q-item-side right color="primary">
                  <q-btn color="primary"  @click='customButton'>Add CC to your wallet</q-btn>
                </q-item-side>
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
            <!--<q-modal ref="review" class="minimized" :content-css="{padding: '20px', maxWidth: '500px', maxHeight: '300px'}">-->
              <!--<review></review>-->
              <!--&lt;!&ndash;<address-edit :address="selectedAddress"></address-edit>&ndash;&gt;-->
            <!--</q-modal>-->


            <div class="row justify-center">
              <div class="col-8">
                <!--<q-btn class="full-width" color="tertiary" @click="$refs.review.open()">Need Help? Have Feedback?</q-btn>-->
                <br><br>
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
  import StripeCheckout from 'stripe-checkout'
  import shop from '../../api/shop'
  import AddressEdit from './AddressEdit.vue'
  import Review from '../Review.vue'
  import axios from 'axios'
  import {Cookies, LocalStorage} from 'quasar'
  export default {
    components: {
      'stripe-checkout': StripeCheckout,
      AddressEdit,
      Review
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      wallet: {
        get () { return this.$store.state.userInfo.wallet }
      },
      completedCarts: {
        get () { return this.$store.state.userInfo.completedCarts }
      }
    },
    methods: {
      ...mapActions([
        'getUserInfo',
        'logout',
        'getWallet',
        'addWallet',
        'getCompletedCarts'
      ]),
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
        }).then(function (token) {
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
      },
      editAddress (address) {
        this.selectedAddress = address
        this.$refs.addressDisplay.open()
      },
      makeDefault () {
        shop.changeDefaultAddress(this.selectedAddress.address_id)
        this.$refs.addressDisplay.close()
        this.getUserInfo()
        this.getWallet()
      }
    },
    created () {
      this.getUserInfo()
      this.getWallet()
      this.getCompletedCarts()
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
