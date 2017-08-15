<template>
  <q-layout
    ref="layout"
    :view="layoutStore.view"
    :left-breakpoint="layoutStore.leftBreakpoint"
    :right-breakpoint="layoutStore.rightBreakpoint"
    :reveal="true"
    class="bg-light"
  >
    <q-toolbar color="tertiary" class="text-white" slot="header">
      <q-toolbar-title>
        <router-link to="/"><img src="../assets/fulllogo.png" id="logo"></router-link>
        <span slot="subtitle">Empowering Your Neighborhood</span>
      </q-toolbar-title>
      <q-btn flat @click="$refs.layout.toggleRight()">
        <q-icon name="shopping_cart"/>
        <q-chip v-if="cartCount!=0" small floating color="amber-9">{{cartCount}}</q-chip>
      </q-btn>
    </q-toolbar>

    <q-toolbar slot="header">
      <vue-google-autocomplete
        id="map"
        ref="addressSearch"
        :placeholder="savedAddress"
        v-on:placechanged="getLocation"
        country="usa"
        :enableGeolocation="true"
        class="locationSearch full-width"
      >
        <q-input></q-input>
      </vue-google-autocomplete>
      <!--<q-search icon="location_on" :debounce="0" inverted color="primary light" v-model="searchValue" @enter="searchForStores"></q-search>-->
    </q-toolbar>

    <q-tabs inverted color="tertiary" class="bg-white" slot="navigation">
      <q-route-tab hide="label" label="Home" slot="title" name="home" icon="home" to="/"/>
      <q-route-tab hide="label" label="Search Stores" slot="title" name="store_search" icon="search" to="/store_search"/>
      <!--<q-route-tab slot="title" name="store" icon="store" :to="{name: 'store', params: {id: ''}}"/>-->
      <q-route-tab hide="label" label="Profile" slot="title" name="user" icon="person"  :to="{name: 'profile', params: {id: this.$store.state.userInfo.info.user_id}}"/>
      <q-route-tab hide="label" label="Cart" slot="title" name="cart" icon="shopping_cart" to="/cart" :count="cartCount"/>
    </q-tabs>

    <!--<q-scroll-area slot="left" style="width: 100%; height: 100%">-->
      <!--<q-list-header class="bg-tertiary text-primary">Other Info</q-list-header>-->
      <!--<q-side-link item :to="{path: '/store-sign-up', exact: true}">-->
        <!--<q-item-side icon="business"/>-->
        <!--<q-item-main label="Are you a local business?" sublabel="Add your store - join the community!"/>-->
      <!--</q-side-link>-->
      <!--<q-side-link item to="/stores">-->
        <!--<q-item-side icon="info"/>-->
        <!--<q-item-main label="About Us"/>-->
      <!--</q-side-link>-->
        <!--&lt;!&ndash;<q-side-link icon="compare_arrows" to="/stores">Contact Us</q-side-link>&ndash;&gt;-->
      <!--<br>-->
      <!--<q-btn class="full-width" color="primary" @click="logout">Log out</q-btn>-->
    <!--</q-scroll-area>-->

    <q-scroll-area slot="right" class="bg-light" style="width: 100%; height: 100%">
      <cartpage class=""></cartpage>
    </q-scroll-area>

    <router-view class="layout-view"></router-view>

  </q-layout>
</template>
<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import axios from 'axios'
  const API_URL = 'http://mycorner.store:8080/api/'
  const ADDRESS_BOOK_ADD = API_URL + 'user/address_book/add'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QTabs,
    QRouteTab,
    QBtn,
    QIcon,
    QItemSide,
    QItemMain,
    QSideLink,
    QListHeader,
    QScrollArea
  } from 'quasar'

  import layoutStore from '../store/otherJS/layout-store'

  import Login from './LogInSignUp/Login.vue'
  import SignUp from './LogInSignUp/Signup.vue'
  import cartpage from './CartPage.vue'
  import ProductCard from './ProductCard.vue'
  export default {
    computed: {
      ...mapGetters([
        'cartCount',
        'savedAddress'
      ]),
      searchValue: {
        get () { return this.$store.state.storeSearch.searchValue },
        set (value) { this.$store.commit('newSearch', value) }
      },
      currentStore: {
        get () { return this.$store.state.storeSearch.currentStore }
      },
      userID: {
        get () { return this.$store.state.storeSearch.currentStore }
      }
    },
    methods: {
      ...mapActions([
        'logout',
        'searchForStores',
        'getAllStores',
        'addUserAddress'
      ]),
      ...mapMutations([
        'userAddress',
        'formattedAddress'
      ]),
      getLocation (addressData, placeResultData) {
        axios.post(ADDRESS_BOOK_ADD, JSON.stringify(
          {
            street_number: addressData.street_number,
            route: addressData.route,
            administrative_area_level_1: addressData.administrative_area_level_1,
            country: addressData.country,
            postal_code: addressData.postal_code,
            latitude: addressData.latitude,
            longitude: addressData.longitude,
            city: 'Brooklyn',
            line1: placeResultData.formatted_address,
            name: 'Home'
          }
        )).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
        this.address = addressData
//        this.addUserAddress(JSON.stringify(addressData))
        this.address2 = placeResultData
        this.userAddress(addressData)
//        this.getAllStores()
        this.formattedAddress(placeResultData)
        this.$refs.addressSearch.clear()
        this.searchForStores()

//        if (navigator.geolocation) {
//          navigator.geolocation.getCurrentPosition((position) => {
//            this.longitude = position.coords.longitude
//            this.latitude = position.coords.latitude
//          })
//        }
      }
    },
    components: {
      Login,
      SignUp,
      cartpage,
      ProductCard,
      QLayout,
      QToolbar,
      QToolbarTitle,
      QSearch,
      QTabs,
      QRouteTab,
      QBtn,
      QIcon,
      QItemSide,
      QItemMain,
      QSideLink,
      QListHeader,
      QScrollArea,
      VueGoogleAutocomplete
    },
    data () {
      return {
        detailsPath: '/store/' + this.$route.params.id,
        selectedTab: 'login',
        isSearchPage: false,
        layoutStore,
        latitude: '',
        longitude: '',
        address: '',
        address2: {
          formatted_address: 'Type Your Address'
        },
        address3: {
          formatted_address: 'Type Your Address'
        }
      }
    }
  }
</script>

<style>
  /*.layout-footer {*/
    /*border-top-color: 1px solid hsla(0, 0%, 0%, 0.27);*/
  /*}*/
  /*.layout-header {*/
  /*border-bottom-color: black*/
  /*}*/
  #logo {
      /*background-image: url("../assets/fulllogo.png");*/
      padding-top: 0px;
      height:2.19rem;
      /* delete this property if you don't want your logo to scale down on mobile devices */
      -webkit-transorm: scale(0.8);
    -moz-transform: scale(0.8);
    -ms-transform: scale(0.8);
    -o-transform: scale(0.8);
    transform: scale(0.8);
  }
  .locationSearch {
    -webkit-appearance: none;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: none;
    border-radius: 3px;
    box-shadow: none;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1rem;
    height: 2.285em;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    line-height: 1.5;
    padding-left: .75em;
    padding-right: .75em;
    position: relative;
    vertical-align: top;
    background-color: #fff;
    border: 1px solid #40dba1;
    color: #363636;
    box-shadow: inset 0 1px 2px rgba(10,10,10,.1);
    max-width: 100%;
    width: 100%;
  }
  .siginup {
    /*padding-left: 50px;*/
    /*padding-right: 50px;*/
    /*padding-bottom: 50px;*/
  }

</style>
