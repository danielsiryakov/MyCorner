<template>
    <div class="" v-if="show">
      <div class ="layout-padding">
        <div class="row justify-center">
          <div class="col-lg-8" v-if="isUser">
            <h4 class="text-bold">Profile Information</h4>
            <q-list separator	highlight class="bg-white">
              <q-list-header>{{ user.email }}</q-list-header>
              <q-item
                link
                v-for="modal in types"
                :key="modal.label"
                @click="openPageModal(modal)"
                v-ripple.mat
              >
                <q-item-main :label="modal.label" />
                <q-item-side right icon="keyboard_arrow_right" />
              </q-item>
            </q-list>
            <br>
            <br>
            <div class="row justify-center">
              <div class="col-8">
                <!--<q-btn class="full-width" color="tertiary" @click="$refs.review.open()">Need Help? Have Feedback?</q-btn>-->
                <br><br>
                <q-btn class="full-width" color="primary" outline @click="logout">Log out</q-btn>
              </div>
            </div>
          </div>
          <div class="col-lg-8 group inline" v-if="!isUser">
            <div class="row group no-wrap justify-center">
              <q-btn big
                     class="col-5 offset-1"
                     color="primary"
                     @click="formTab='login', $refs.logInSignUp.open()">Login</q-btn>
              <q-btn big
                     class="col-5"
                     color="primary"
                     @click="formTab='signup', $refs.logInSignUp.open()">Sign Up</q-btn>
            </div>
            </div>
        </div>
      </div>
      <q-modal ref="logInSignUp" transition="fade" :content-css="{maxWidth: '800px',maxHeight: '800px'}">
        <h4><q-icon name="close" class="text-primary absolute-top-right" @click="$refs.logInSignUp.close()"/></h4>
        <!--<h4><q-icon class="text-primary float-right" style="padding-right: 20px" @click="$refs.logInSignUp.close()" name="close"/></h4>-->
        <br><br>
        <div class="">
          <q-tabs :refs="$refs" v-model="formTab" no-pane-border color="tertiary">
            <q-tab slot="title" name="login" label="log in"/>
            <q-tab slot="title" name="signup" label="Sign Up" />

            <q-tab-pane name="login"><login @closeModal="$refs.logInSignUp.close()"></login></q-tab-pane>
            <q-tab-pane  name="signup"><sign-up :formTab="'user'" v-if="!signedup" v-on:submit="signedup = true"></sign-up>
              <div v-if="signedup" style="padding: 20px;" class="layout-padding">
                <h4>we sent you a confirmation email!</h4><br>
                <big class="text-tertiary">
                  Confirm your email address and start shopping for everything you love!
                </big>
              </div>
            </q-tab-pane>
          </q-tabs>
        </div>
      </q-modal>
      <q-modal ref="pages" class="maximized" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <q-modal-layout class="bg-light">
          <q-toolbar class="text-white" slot="header" color="tertiary">
            <q-btn flat @click="$refs.pages.close()">
              <q-icon name="keyboard_arrow_left" />
            </q-btn>
            <q-toolbar-title>
              {{ currentLabel }}
            </q-toolbar-title>
          </q-toolbar>

          <div class="layout-padding">
            <div class="row justify-center">
              <div class="col-lg-8">
                <h4 class="text-bold">{{ currentLabel }}</h4>
                <q-list separator	highlight class="bg-white">
                  <q-list-header>{{ user.email }}</q-list-header>
                  <address-book v-if="currentPage == 'AddressBook'"></address-book>
                  <past-orders v-if="currentPage == 'PastOrders'" @reordered="$refs.pages.close()"></past-orders>
                  <wallet v-if="currentPage == 'Wallet'"></wallet>
                  <track-your-order :currentOrders="currentOrders" v-if="currentPage == 'TrackYourOrder'"></track-your-order>
                </q-list>
              </div>
            </div>
          </div>
        </q-modal-layout>
      </q-modal>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AddressEdit from './AddressEdit.vue'
  import AddressBook from './AddressBook.vue'
  import PastOrders from './PastOrders.vue'
  import Review from '../Review.vue'
  import Wallet from './Wallet.vue'
  import Login from '../LogInSignUp/Login'
  import SignUp from '../LogInSignUp/Signup'
  import TrackYourOrder from './TrackYourOrder.vue'
  import shop from '../../api/shop'
  export default {
    components: {
      Wallet,
      AddressEdit,
      AddressBook,
      PastOrders,
      Review,
      TrackYourOrder,
      Login,
      SignUp
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      addressBook: {
        get () { return this.$store.state.userInfo.address_book }
      },
      isUser: {
        get () { return this.$store.state.userInfo.info.confirmed }
      }
    },
    methods: {
      ...mapActions([
        'getUserInfo',
        'logout',
        'getWallet',
        'addWallet',
        'getAddressBook',
        'getCompletedCarts'
      ]),
      openPageModal (page) {
        this.currentPage = page.ref
        if (this.currentPage === 'TrackYourOrder') { this.getActiveOrders() }
        if (this.currentPage === 'PastOrders') { this.getCompletedCarts() }
        this.currentLabel = page.label
        this.$refs.pages.open()
      },
      rerender () {
        this.show = false
        this.$nextTick(() => {
          this.show = true
          console.log('re-render start')
          this.$nextTick(() => {
            console.log('re-render end')
          })
        })
      },
      getActiveOrders () {
        shop.userOrderRetrieve().then(response => {
          this.currentOrders = response.data
        })
      }
    },
    created () {
      if (this.isUser) {
        this.getUserInfo()
        this.getWallet()
        this.getCompletedCarts()
      }
    },
    data () {
      return {
        currentOrders: [],
        formTab: 'login',
        signedup: false,
        currentPage: '',
        currentLabel: '',
        show: true,
        selectedAddress: {},
        complete: false,
        types: [
          {
            label: 'Address Book',
            ref: 'AddressBook'
          },
          {
            label: 'Track Your Order',
            ref: 'TrackYourOrder'
          },
          {
            label: 'Past Orders/Reorder',
            ref: 'PastOrders'
          },
          {
            label: 'Your Wallet',
            ref: 'Wallet'
          }
        ]
      }
    }
  }
</script>

<style scoped>
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
