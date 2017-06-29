<template>
  <q-layout
    ref="layout"
    :view="layoutStore.view"
    :left-breakpoint="layoutStore.leftBreakpoint"
    :right-breakpoint="layoutStore.rightBreakpoint"
    :reveal="layoutStore.reveal"
  >
    <q-toolbar color="tertiary" slot="header" >
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        <router-link to="/"><img src="../assets/fulllogo.png" id="logo"></router-link>
        <span slot="subtitle">Empowering Your Neighborhood</span>
      </q-toolbar-title>
      <q-btn flat @click="$refs.layout.toggleRight()">
        <q-icon name="shopping_cart" />
      </q-btn>
    </q-toolbar>

    <q-toolbar v-if="$store.state.route.path=='/store_search'" slot="header">
        <q-btn flat color="tertiary" class="text-bold" icon="location_on">location</q-btn>
        <q-search :debounce="0" inverted color="primary" class="" v-model="searchValue" @enter="searchForStores"></q-search>
    </q-toolbar>
    <q-toolbar v-if="$store.state.route.path!='/store_search'" slot="header">
      <q-search icon="location_on" :debounce="0" inverted color="primary" v-model="searchValue" @enter="searchForStores"></q-search>
    </q-toolbar>

    <q-tabs class ="mobile-only" inverted color="tertiary" slot="navigation">
      <q-route-tab slot="title" icon="home" to="/"/>
      <q-route-tab slot="title" icon="search" to="/store_search"/>
      <q-route-tab slot="title" icon="store" to="/store/:id"/>
      <q-route-tab slot="title" icon="person" to="/user/:id"/>
    </q-tabs>
    <!--<product-card></product-card>-->

    <q-scroll-area slot="left" style="width: 100%; height: 100%">
      <q-list-header class="bg-tertiary text-primary">Other Info</q-list-header>
      <q-side-link item :to="{path: '/store-sign-up', exact: true}">
        <q-item-side icon="business"/>
        <q-item-main label="Are you a local business?" sublabel="Add your store - join the community!"/>
      </q-side-link>
      <q-side-link item to="/stores">
        <q-item-side icon="info"/>
        <q-item-main label="About Us"/>
      </q-side-link>
        <!--<q-side-link icon="compare_arrows" to="/stores">Contact Us</q-side-link>-->
      <br>
      <q-btn class="full-width" color="primary" @click="logout">Log out</q-btn>
    </q-scroll-area>

    <q-scroll-area slot="right" class="bg-light" style="width: 100%; height: 100%">
      <!--<q-toolbar color="tertiary">-->
        <!--<q-toolbar-title :padding="1">-->
          <!--<h5 class="text-primary">Cart</h5>-->
        <!--</q-toolbar-title>-->
      <!--</q-toolbar>-->
      <cartpage class="layout-padding"></cartpage>
    </q-scroll-area>

    <router-view class="layout-view"></router-view>

  </q-layout>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
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

  import Login from './Login.vue'
  import SignUp from './Signup.vue'
  import cartpage from './CartPage.vue'
  import ProductCard from './ProductCard.vue'
  export default {
    mounted () {
      this.getAllProducts()
//      if ($store.state.route ==)
      console.log(this.$store.state.route.path)
    },
    computed: {
      ...mapGetters([
        'allProducts'
      ]),
      searchValue: {
        get () { return this.$store.state.storeSearch.searchValue },
        set (value) { this.$store.commit('newSearch', value) }
      }
    },
    methods: {
      ...mapActions([
        'getAllProducts',
        'logout',
        'searchForStores'
      ])
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
      QScrollArea
    },
    data () {
      return {
        formTab: 'login',
        isSearchPage: false,
        layoutStore
      }
    }
  }
</script>

<style>
  .layout-footer {
    border-top: 1px solid hsla(0, 0%, 0%, 0.27);
  }
  .layout-header {
    border-bottom: 1px solid hsla(0, 0%, 0%, 0.27);
  }
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


  .siginup {
    /*padding-left: 50px;*/
    /*padding-right: 50px;*/
    /*padding-bottom: 50px;*/
  }

</style>
