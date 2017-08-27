<template>
  <q-layout
    ref="layoutTwo"
    class="bg-light"
    :view="layoutStore.view"
    :right-breakpoint="layoutStore.rightBreakpoint"
    :reveal="true">
    <q-toolbar color="tertiary" class="text-white" slot="header">
      <q-btn v-go-back="'/store_search'" icon="arrow_back"/>
      <q-toolbar-title>{{ store.name }}</q-toolbar-title>
      <q-btn flat @click="$refs.layoutTwo.toggleRight()">
        <q-icon name="shopping_cart"/>
        <q-chip v-if="cartCount!=0" small floating color="amber-9">{{cartCount}}</q-chip>
      </q-btn>
    </q-toolbar>
    <q-scroll-area slot="right" class="bg-light" style="width: 100%; height: 100%">
      <cart-page class=""></cart-page>
    </q-scroll-area>

		<div class="layout-view bg-light">
      <div class="layout-padding">
        <div class="row">
          <div class="">
            <q-card class="bigger">
              <q-card-media overlay-position="bottom">
                <!--<img v-if="store.image" class="dimmed" :src="s.image" alt="" style="object-fit: cover;  width: 100vw; height: 40vh;">-->
                <img v-if="!store.image" class="dimmed" src="../assets/fulllogo.png" alt="" style="object-fit: contain;  width: 100vw; height: 40vh;">
                <img class="dimmed" v-if="store.image" :src="store.image" alt="" style="object-fit: cover;  width: 100vw; height: 40vh;">
                <q-card-title slot="overlay">
                  <h4 class="text-bold">{{ store.name }}
                    <q-chip v-if="deliveryOffered == true" color="amber-9">Offers Delivery</q-chip>
                  </h4>
                  <q-rating @change="submitReview" color="amber-4" slot="subtitle" v-model="stars" :max="5" />
                </q-card-title>
              </q-card-media>
            </q-card>
          </div>
        </div>
        <q-tabs class="" no-pane-border inverted>
          <q-tab default slot="title" name="Products" label="Products" class="text-bold text-tertiary"/>
          <q-tab slot="title" name="Information" label="Information" class="text-bold text-tertiary"/>
          <!-- Targets -->
          <q-tab-pane name="Products">
            <div class="row">
              <q-collapsible separator class="full-width" opened :label="cat.name" v-for="(cat, index) in allProducts" :key="index" v-if="cat.products.length !== 0">
                <q-card inline flat style="width: 30vh; height: 30vh" class="col-sm-2 col-lg-4 col-md-4 bg-white" v-for="p in cat.products" :key="p.asset_id" @click="open(p)">
                  <q-card-media overlay-position="bottom" style="padding: 20px">
                    <img :src="p.image" >
                    <q-card-title class="text-condensed" slot="overlay">
                      {{p.title.substring(0,30)}}...<br>
                      <!--{{getProductCartQuantity(id, p.id).quantity}}-->
                      <span class="text-bold">${{p.price_cents / 100}}</span>
                      <q-chip class="float-right" v-if="productCartQuantity(p.asset_id)" color="primary" small>{{productCartQuantity(p.asset_id)}}</q-chip>
                    </q-card-title>
                  </q-card-media>
                </q-card>
              </q-collapsible>
            </div>
          </q-tab-pane>
          <q-tab-pane name="Information" class="bg-white" v-if="store">
            <h5 class="">Information about {{ store.name }}</h5>
            <div class="group">
              <div class="group">
                <span class="text-bold">Phone:</span>
                {{ formatPhone(store.phone) }}<br>
              </div>
              <div class="group" v-if="store.address">
                <span class="text-bold" >Address:</span>
                {{ store.address.line1 }}
              </div>
              <div class="group">
                <span class="text-bold">Working Hours:</span>
                <div class="group" v-for="(day, key) in store.working_hours" :key="key">
                  <div>
                    &nbsp &nbsp{{ capitalizeFirstLetter(key) }}: {{ formatTime(day.hours.from) }} - {{ formatTime( day.hours.to) }}
                  </div>
                </div>
              </div>
            </div>
          </q-tab-pane>
        </q-tabs>
        <br>
      </div>

      <q-modal ref="productModal" class="minimized" :content-css="{padding: '20px', maxWidth: '500px', maxHeight: '500px'}">
        <h4><q-icon name="close" class="text-negative absolute-top-right" @click="$refs.productModal.close()"/></h4>
        <!--<i class="text-negative" @click="$refs.productModal.close()">close</i>-->
        <product-page :product="ProductObject" :quantityProp="cartQuantity" v-on:added="close"></product-page>
      </q-modal>
    </div>
	</q-layout>
</template>

<script>
  import ProductPage from './ProductPage.vue'
  import layoutStore from '../store/otherJS/layout-store'
  import CartPage from './CartPage.vue'
  import shop from '../api/shop'
  import {
    Loading
  } from 'quasar'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['id'],
    data () {
      return {
        ProductObject: {},
        cartProducts: [],
        stars: 4,
        cartQuantity: 1,
        layoutStore
      }
    },
    components: {
      ProductPage,
      CartPage
    },
    computed: {
      ...mapGetters([
        'allStores',
        'allProducts',
        'cartCount',
        'getCartByStore'
      ]),
      store () {
        return this.$store.state.storeSearch.currentStore
//        return this.allStores.find((s) => s._id === this.id) || {}
      },
      deliveryOffered () {
        if (this.store.hasOwnProperty('delivery')) {
          return this.$store.state.storeSearch.currentStore.delivery.service_offered
        }
        else {
          return false
        }
      }
    },
    created () {
      Loading.show()
      this.getStore(this.id)
      this.getAllProducts(this.id)
      Loading.hide()
    },
    methods: {
      ...mapActions([
        'getStore',
        'getAllProducts'
      ]),
      submitReview () {
        shop.addStoreReview({
          comment: '',
          score: this.stars,
          store_id: this.store.store_id
        })
      },

//      showProductModal: function (Product) {
//        this.ProductObject = Product
//        this.showModal = true
//      },
      open: function (Product) {
        this.ProductObject = Product
        this.cartQuantity = this.productCartQuantity(Product.asset_id)
        this.$refs.productModal.open()
      },
      close: function () {
        this.$refs.productModal.close()
      },
      productCartQuantity (productID) {
        let storeCart = this.getCartByStore(this.id)
        if (storeCart) {
          let cartProduct = storeCart.products.find(product => product.asset_id === productID)
//          this.cartProducts = this.getCartByStore(this.id).products
          if (cartProduct) {
            return cartProduct.quantity
          }
          else {
            return cartProduct
          }
        }
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      formatTime (string) {
        string = string.toString()
        return string.slice(0, -2) + ':' + string.slice(-2)
      },
      formatPhone (string) {
        return string.slice(0, 3) + '-' + string.slice(3, 6) + '-' + string.slice(6, 10)
      }
    },
    watch: {
      '$route' (to, from) {
        Loading.show()
        this.getStore(this.id)
        this.getAllProducts(this.id)
        Loading.hide()
      }
    }
  }
</script>

<style scoped>
  /*StorePage.vue css*/
  .item:not(.two-lines):not(.three-lines):not(.multiple-lines) > .item-content > div:not(.stacked-label):not(.floating-label):not([class^='q-']) {
    font-size: 35px !important;
  }
  .q-card-title {
    /*font-size: 18px;*/
    font-weight: 400;
    /*letter-spacing: normal;*/
     line-height: 1.5rem;
  }
  container{
    padding-top: 10px;
  }
  .panel {
    margin-bottom: 20px;
    background-color: #eeeff7;
    border: 1px solid transparent;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
  }
  .panel-group {
    text-align: left;
    margin-bottom: 20px;
  }
  .panel-group .panel {
     margin-bottom: 10px;
     /* border-radius: 4px; */
  }
  .panel-heading {
    padding-top: 10px;
    padding-right: 15px;
    padding-left: 0px;
    padding-bottom: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    /* border-top-left-radius: 3px; */
    border-top-right-radius: 3px;
  }
  .panel-default>.panel-heading {
      color: #333;
      background-color: #eeeff7;
      /* border-color: #ddd; */
      text-align: left;
    }
  .panel-default {
       border-color: #eeeff7;
     }
  .panel-default>.panel-heading {
        color: #333;
        background-color: #eeeff7;
        /* border-color: #ddd; */
        text-align: left;
      }
   .StoreItem {
     padding-top: 15px;
     padding-right: 16px;
     padding-left: 16px;
     padding-bottom: 15px;
     border-bottom-width: 1px;
     border-bottom-style: groove;
     border-bottom-color: #1b9872;
     font-weight: bold;
     color: #1b9872;
     background-color: #fff;
     width: 50%
   }
  div .q-item .q-item-division .relative-position {
    background-color: white !important;
    font-weight: bold !important;
  }

</style>
