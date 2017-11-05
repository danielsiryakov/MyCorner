<template>
    <div class="" v-if="show">
      <div class ="layout-padding">
        <div class="row justify-center">
          <div class="col-lg-8">
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
        </div>
      </div>

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
  import TrackYourOrder from './TrackYourOrder.vue'
  import shop from '../../api/shop'
  export default {
    components: {
      Wallet,
      AddressEdit,
      AddressBook,
      PastOrders,
      Review,
      TrackYourOrder
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      addressBook: {
        get () { return this.$store.state.userInfo.address_book }
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
      this.getUserInfo()
      this.getWallet()
      this.getCompletedCarts()
    },
    data () {
      return {
        currentOrders: [],
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
