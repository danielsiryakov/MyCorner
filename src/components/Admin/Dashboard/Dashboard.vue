<template>
  <q-layout
    ref="layoutD"
    :left-breakpoint="900"
    :view="'hHr LpR lFr'"
    :reveal="true"
    class=""
  >
    <q-toolbar  color="tertiary" class="text-white" slot="header">
      <q-btn class="hide-me" flat @click="$refs.layoutD.toggleLeft()">
        <q-icon name="menu"/>
      </q-btn>
      <q-toolbar-title>
        <router-link to="/admin"><img src="../../../assets/fulllogo.png" id="logo"></router-link>
        <span slot="subtitle">Empowering Your Neighborhood</span>
      </q-toolbar-title>
    </q-toolbar>


    <q-scroll-area slot="left" class="group bg-light" style="width: 100%; height: 100%">
      <q-side-link item to="/admin/orders">
        <q-item-side icon="shopping_cart"/>
        <q-item-main label="Orders"/>
      </q-side-link>
      <q-side-link item to="/admin/store">
        <q-item-side icon="store"/>
        <q-item-main label="Store Info"/>
      </q-side-link>
      <q-side-link item to="/admin/products">
        <q-item-side icon="add_shopping_cart"/>
        <q-item-main label="Products"/>
      </q-side-link>
      <q-side-link item :to="{path: '/store-sign-up', exact: true}">
        <q-item-side icon="dashboard"/>
        <q-item-main label="Create New Store"/>
      </q-side-link>
      <q-side-link item to="/admin/payments">
        <q-item-side icon="attach_money"/>
        <q-item-main label="Payments"/>
      </q-side-link>
      <br>
      <q-btn class="full-width" color="primary" outline @click="logout">Log out</q-btn>    </q-scroll-area>

    <q-select
      inverted
      float-label="Which Store To Display?"
      v-model="selectedStore"
      :options="storeSelect"
      @change="getSelectionInfo"
    />

    <transition name="slide-fade" mode="out-in">
      <router-view class="layout-view"></router-view>
    </transition>

  </q-layout>
</template>

<script>
  import layoutStore from '../../../store/otherJS/layout-store'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        layoutStore
      }
    },
    components: {
    },
    methods: {
      ...mapActions([
        'getFullStoreInfo',
        'logout',
        'getActiveOrders'
      ]),
      getSelectionInfo () {
        this.getFullStoreInfo(this.selectedStore)
        this.getActiveOrders()
      }
    },
    computed: {
      storeID: function () {
//        console.log(Object.keys(this.$store.state.userInfo.info.user_roles.Access))
        return this.$store.state.userInfo.info.user_roles.store_map
      },
      storeSelect: function () {
        let selectOptions = []
//        let keys = Object.keys(this.storeID)
        if (this.storeID) {
          Object.keys(this.storeID).forEach(key => {
            selectOptions.push({
              label: this.storeID[key],
              value: key
            })
          })
        }
        return selectOptions
      },
      selectedStore: {
        get () { return this.$store.state.storeInfo.selectedStore },
        set (value) { this.$store.commit('update_store_selection', value) }
      }
    }
  }
</script>

<style>
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

  .fade-enter-active, .fade-enter{
    -webkit-animation: moveFromRight .5s both ease;
    animation: moveFromRight .5s both ease;
  }
  .fade-leave-to, .fade-leave-active {
    -webkit-animation: moveToLeft 1s both ease;
    animation: moveToLeft 1s both ease;
  }
  @media (min-width: 800px) {
    .hide-me {
      display: none !important;
    }
  }
  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

</style>
