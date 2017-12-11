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
          <q-card class="bigger">
            <q-card-media overlay-position="bottom">
              <!--<img v-if="store.image" class="dimmed" :src="s.image" alt="" style="object-fit: cover;  width: 100vw; height: 40vh;">-->
              <img v-if="!store.image" class="dimmed" src="../assets/fulllogo.png" alt="" style="object-fit: contain;  width: 100vw; height: 40vh;">
              <img class="dimmed" v-if="store.image" :src="store.image" alt="" style="object-fit: cover;  width: 100vw; height: 40vh;">
              <q-card-title slot="overlay">
                <h4 class="text-bold">{{ store.name }}
                  <q-chip v-if="deliveryOffered == true" color="amber-9">Offers Delivery</q-chip>
                </h4>
                <div>
                  <q-rating @change="submitReview" color="amber-4" slot="subtitle" v-model="stars" :max="5" />
                  <small><span v-if="store.delivery" class="text-light text-bold float-right">{{ formattedPrice(store.delivery.delivery_minimum) }} min <big>&#x22C5</big> {{ formattedPrice(store.delivery.delivery_fee) }} fee</span></small>
                </div>
              </q-card-title>
            </q-card-media>
          </q-card>
        </div>
        <q-tabs class="" no-pane-border inverted>
          <q-tab default slot="title" name="Products" label="Products" class="text-bold text-tertiary"/>
          <q-tab slot="title" name="Information" label="Information" class="text-bold text-tertiary"/>
          <!-- Targets -->
          <q-tab-pane name="Products">
            <!--<q-search clearable inverted :debounce="0" placeholder="Search for products in store!" v-model="search"></q-search>-->
            <!--<div class="row bg-white" v-if="search !== ''">-->
              <!--<q-item class="lt-md"-->
                      <!--v-for="(p, index) in filteredProducts"-->
                      <!--:key="index" @click="open(p)">-->
                <!--<q-item-side :image="p.image" style="padding-right: 10px;">-->
                  <!--&lt;!&ndash;<img :src="p.image" style="width: 100px; height: 100px">&ndash;&gt;-->
                <!--</q-item-side>-->
                <!--<q-item-main style="padding: 5px;" v-if="p.title.length >= 30" class="">{{p.title.substring(0,30)}}...</q-item-main><br>-->
                <!--<q-item-main style="padding: 5px;" v-if="p.title.length < 30" class="">{{p.title}}</q-item-main><br>-->
                <!--<q-item-side>-->
                  <!--<span class="text-bold">${{p.price_cents / 100}}</span>-->
                <!--</q-item-side>-->
              <!--</q-item>-->
              <!--<q-card inline flat style="width: 30vh; height: 30vh"-->
                      <!--class="gt-sm bg-white"-->
                      <!--v-for="p in filteredProducts"-->
                       <!--:key="p.product_id" @click="open(p)">-->
                <!--&lt;!&ndash;<q-card inline flat style="width: 30vh; height: 30vh" class="bg-white" v-for="p in cat.products" :key="p.asset_id" @click="open(p)">&ndash;&gt;-->
                <!--<q-card-media overlay-position="bottom">-->
                  <!--<img :src="p.image" style="padding: 25px">-->
                  <!--<q-card-title class="text-condensed" slot="overlay">-->
                    <!--<small class="">{{p.title.substring(0,30)}}</small><br>-->
                    <!--&lt;!&ndash;{{getProductCartQuantity(id, p.id).quantity}}&ndash;&gt;-->
                    <!--<span class="text-bold ">${{p.price_cents / 100}}</span>-->
                    <!--<q-chip class="float-right" v-if="productCartQuantity(p.asset_id)" color="primary" small>{{productCartQuantity(p.asset_id)}}</q-chip>-->
                  <!--</q-card-title>-->
                <!--</q-card-media>-->
              <!--</q-card>-->
            <!--</div>-->

            <q-tabs class="" no-pane-border inverted>
              <q-tab slot="title" v-for="(aisle, key) in allCategories"
                     :key="key"
                     :name="aisle.name"
                     :label="aisle.name"
                     class="text-bold text-tertiary"/>
              <!--<q-tab slot="title" name="Information" label="Information" class="text-bold text-tertiary"/>-->
              <!-- Targets -->
              <q-tab-pane v-for="(aisle, key) in allCategories"
                          :key="key"
                          :name="aisle.name">
                <br>
                <div class="row group">
                  <div v-for="(category, key) in aisle.children_categories"
                       :key="key"
                       @click="openT2Category(category)"
                       class="full-width">
                    <q-card inline class="desktop-only cursor-pointer bg-white text-bold" style="padding: 15px;">
                      <q-card-title>
                        <h5 class="text-bold" style="word-wrap: break-word; width: 200px; height: 80px">{{category.name}}</h5>
                      </q-card-title>

                      <q-card-media>
                        <img :src="category.icon" alt="" style="padding: 20px; height: 200px; width: 200px">
                      </q-card-media>
                    <!--<q-icon class="float-right" name="keyboard_arrow_right"></q-icon>-->
                    </q-card>
                    <q-card class="full-width mobile-only">
                      <q-item class="full-width">
                        <q-item-side :image="category.icon"></q-item-side>
                        <q-item-main :label="category.name" class="text-bold">
                        </q-item-main>
                      </q-item>
                    </q-card>
                  </div>
                </div>

              </q-tab-pane>
            </q-tabs>
          </q-tab-pane>
          <q-tab-pane name="Information" class="" v-if="store">
            <div class="row justify-center bg-light">
              <div class="col-lg-8" align="center">
                <!--<h3 class="" style="padding: 10px;">Information</h3>-->
                <div class="group " style="padding: 10px;">
                  <span class="text-bold">Phone:</span>
                  {{ formatPhone(store.phone) }}<br>
                </div>
                <div class="group " style="padding: 10px;" v-if="store.address">
                  <span class="text-bold">Address:</span>
                  {{ store.address.line1 }}
                </div>
                <br>
                <h5 class="" style="padding: 10px;">Working Hours</h5>
                <div class="">
                  <table class="q-table" style="display:inline-block;">
                    <tbody v-for="(day, key) in store.working_hours" :key="key">
                      <tr v-if="!checkCurrentDay(key)"
                          :id="key"
                          :title="capitalizeFirstLetter(key)">
                        <td class="text-bold">{{ capitalizeFirstLetter(key) }}:</td>
                        <td>{{ formatTime(day.hours.from) }}</td>
                        <td> - </td>
                        <td>{{ formatTime(day.hours.to) }}</td>
                      </tr>
                      <tr v-if="checkCurrentDay(key) && !checkWorkingHours(day)"
                          class="today" :id="key" :title="capitalizeFirstLetter(key)">
                        <td class="text-bold">{{ capitalizeFirstLetter(key) }}:</td><td></td>
                        <td class="closed"> Closed </td>
                      </tr>
                      <tr v-if="checkCurrentDay(key) && checkWorkingHours(day)"
                          class="today" :id="key" :title="capitalizeFirstLetter(key)">
                        <td class="text-bold">{{ capitalizeFirstLetter(key) }}:</td>
                        <td>{{ formatTime(day.hours.from) }}</td>
                        <td> - </td>
                        <td>{{ formatTime(day.hours.to) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </q-tab-pane>
        </q-tabs>
        <br>
      </div>
      <q-modal ref="T2Products" class="" maximized :content-css="{padding: '20px'}">
        <h4><q-icon name="close" class="text-negative absolute-top-right" @click="$refs.T2Products.close()"/></h4>
        <h4 class="text-bold text-tertiary">{{currentCategory.name}}</h4>
        <div class="row" v-if="search == ''">
          <!--{{ filter(cat.products) }}-->
            <q-item class="lt-md bg-white full-width" v-for="p in T2Products.results"
                    :key="p.asset_id"
                    @click="open(p)">
              <q-item-side :image="p.image" style="padding-right: 10px;">
              <!--<img :src="p.image" style="width: 100px; height: 100px">-->
              </q-item-side>

              <q-item-main v-if="p.label.length >= 30" style="word-wrap: break-word;" class="">{{p.label.substring(0,30)}}...<br></q-item-main>

              <q-item-main v-if="p.label.length < 30" style="word-wrap: break-word;" class="">{{p.label}}<br></q-item-main>

              <q-item-side right>
                <br>
                <q-item-tile>${{p.price_cents / 100}}</q-item-tile>
                <q-item-title>
                  <q-chip v-if="productCartQuantity(p.asset_id)" color="primary" small>{{productCartQuantity(p.asset_id)}}</q-chip>
                </q-item-title>
              </q-item-side>

            </q-item>

            <q-card inline flat
                    style="width: 40vh; height: 40vh"
                    class="gt-sm bg-white"
                    v-for="p in T2Products.results"
                    :key="p.asset_id"
                    @click="open(p)">
              <!--<q-card inline flat style="width: 30vh; height: 30vh" class="bg-white" v-for="p in cat.products" :key="p.asset_id" @click="open(p)">-->
              <q-card-media overlay-position="bottom">
                <img :src="p.image" style="padding: 25px">
                <q-card-title class="text-condensed" slot="overlay">
                <small class="">{{p.label.substring(0,30)}}</small>
                  <br>
              <!--{{getProductCartQuantity(id, p.id).quantity}}-->
                <span class="text-bold">${{p.price_cents / 100}}</span>
                <q-chip class="float-right" v-if="productCartQuantity(p.asset_id)" color="primary" small>{{productCartQuantity(p.asset_id)}}</q-chip>
                </q-card-title>
              </q-card-media>
            </q-card>
        </div>
      </q-modal>

      <q-modal ref="StoreReview" class="" :content-css="{padding: '20px', maxWidth: '800px', maxHeight: '800px'}">
        <h4><q-icon name="close" class="text-negative absolute-top-right" @click="$refs.StoreReview.close()"/></h4>
        <h4>Review {{store.name}}</h4>
        <store-review :store_id="store.store_id" :stars="stars" @submittedReview="$refs.StoreReview.close()"></store-review>
        <!--<address-edit :address="selectedAddress"></address-edit>-->
      </q-modal>

      <q-modal ref="productModal" class="" :content-css="{padding: '20px', maxWidth: '600px'}">
        <h4><q-icon name="close" class="text-negative absolute-top-right" @click="$refs.productModal.close()"/></h4>
        <!--<i class="text-negative" @click="$refs.productModal.close()">close</i>-->
        <product-page
          :product="ProductObject"
          :quantityProp="cartQuantity"
          :productDetails="currentProductDetails"
          v-on:added="close"
          v-on:closeModal="close2"></product-page>
      </q-modal>
    </div>
	</q-layout>
</template>

<script>
  import ProductPage from './ProductPage.vue'
  import layoutStore from '../store/otherJS/layout-store'
  import CartPage from './CartPage.vue'
  import axios from 'axios'
  import StoreReview from './StoreReview.vue'
  import shop from '../api/shop'
//  import shop from '../api/shop'
  import {
    Loading, date, filter, Alert, QItemTitle
  } from 'quasar'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['id'],
    data () {
      return {
        search: '',
        ProductObject: {},
        cartProducts: [],
        stars: 4,
        cartQuantity: 1,
        currentCategory: '',
        layoutStore,
        T2Products: {
          results: [],
          metadata: {}
        },
        currentProductDetails: {
          asset_id: '',
          link: '',
          size: '',
          title: '',
          details: [
            {
              body: '',
              header: ''
            }
          ],
          nutrition: {
            calories: '',
            disclaimer: '',
            serving_size: '',
            servings_per_container: '',
            nutrients: [
              {
                total: '',
                label: '',
                pct_daily_value: '',
                subcategories: []
              }
            ]
          },
          price_cents: '',
          display_title: '',
          template_category_id: ''
        }
      }
    },
    components: {
      ProductPage,
      CartPage,
      StoreReview,
      QItemTitle
    },
    computed: {
      ...mapGetters([
        'allStores',
        'allCategories',
        'cartCount',
        'getCartByStore'
      ]),
      store () {
        return this.$store.state.storeSearch.currentStore
//        return this.allStores.find((s) => s._id === this.id) || {}
      },
      filteredProducts () {
        let filteredProducts = []
        for (var i = 0; i < this.allProducts.length; i++) {
          filteredProducts = filteredProducts.concat(this.allProducts[i].products)
        }
//        return allProducts
        var self = this
        return filteredProducts.filter(function (cust) {
          return cust.title.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
        })
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
      getProductDetails (id) {
        console.log('getting product details')
        shop.productTemplateRetrieve(id).then(response => {
          this.currentProductDetails = response.data
        })
      },
      filter (products) {
        return (filter('S', {field: 'title', list: products}))
      },
      formattedPrice (itemTotal) {
        return (itemTotal / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
      },
      submitReview () {
        this.$refs.StoreReview.open()
      },
      getCategoryProducts (cID) {
        axios.defaults.headers.common['storeID'] = this.id
        shop.storeCategoryProductsRetrieve(cID).then(response => {
          this.T2Products.results = this.T2Products.results.concat(response.data.results)
          this.T2Products.metadata = response.data.metadata
        }).catch(error => {
          console.log(error)
          const alert = Alert.create({html: error.response.data.message, color: 'amber-9'})
          setTimeout(alert.dismiss, 5000)
        })
      },
      openT2Category (category) {
        this.currentCategory = category
        this.T2Products = {
          results: [],
          metadata: {}
        }
        Loading.show({
          delay: 200 // milliseconds
        })
        axios.defaults.headers.common['storeID'] = this.id
        shop.storeCategoryProductsRetrieve(category.category_id).then(response => {
          Loading.hide()
          this.T2Products.results = this.T2Products.results.concat(response.data.results)
          this.T2Products.metadata = response.data.metadata
          this.$refs.T2Products.open()
        }).catch(error => {
          console.log(error)
//          const alert = Alert.create({html: error.response.data.message, color: 'amber-9'})
//          setTimeout(alert.dismiss, 5000)
        })
      },
      checkCurrentDay (key) {
        return [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat'
        ][new Date().getDay()] === this.capitalizeFirstLetter(key).substring(0, 3)
      },
      checkWorkingHours (day) {
        var current = new Date().getHours() * 100 + new Date().getMinutes()
        if (day.open) {
          return day.hours.from < current && current < day.hours.to
        }
        return day.open
      },
//      showProductModal: function (Product) {
//        this.ProductObject = Product
//        this.showModal = true
//      },
      open: function (product) {
        this.getProductDetails(product.asset_id)
        this.ProductObject = product
        this.cartQuantity = this.productCartQuantity(product.asset_id)
        this.$refs.productModal.open()
      },
      close: function () {
        this.$refs.productModal.close()
      },
      close2: function () {
        this.$refs.productModal.close()
        this.$refs.T2Products.close()
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
      formatTime (time) {
        let fTime = time / 100
        let daytime = date.buildDate({ hours: Math.floor(fTime), minutes: (fTime - Math.floor(fTime)) * 100 })
//        string = string.toString()
//        return string.slice(0, -2) + ':' + string.slice(-2)
        return date.formatDate(daytime, 'HH:mm')
      },
      formatPhone (string) {
        if (string) {
          return string.slice(0, 3) + '-' + string.slice(3, 6) + '-' + string.slice(6, 10)
        }
      }
    },
    watch: {
      '$route' (to, from) {
        this.$refs.T2Products.close()
        this.$refs.StoreReview.close()
        this.$refs.productModal.close()
        Loading.show()
        this.getStore(this.id)
        this.getAllProducts(this.id)
        Loading.hide()
      }
    }
  }
</script>

<style>
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
  .q-collapsible-sub-item {
    /* padding: 8px 16px; */
    padding: 0px !important;
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
  .workinghours {
    font-family:Lucida Console;
    font-size: 14px !important;
    border-radius:4px;
    margin:10px;
    box-shadow: 0 0 2px black;
    padding:0 2px 0 2px;
    overflow: hidden;
  }
  .workinginghourscontent h2 {
    text-align: center;
  }
  .closed {
    color: #ff6d4b;
  }
  .today {
    color: #37c064;
  }
  .q-collapsible-sub-item {
   padding: 0px !important;
  }
  .working-status {
    display:block;
    margin-top:1em;
    margin-bottom:1em;
    text-align:center;
    border:dotted lightgrey 3px;
    font-size: 13px !important;
    text-align: center ! important;
  }
</style>
