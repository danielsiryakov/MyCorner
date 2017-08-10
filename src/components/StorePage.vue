<template>
  <q-layout
    ref="layoutTwo"
    :view="layoutStore.view"
    :right-breakpoint="layoutStore.rightBreakpoint"
    :reveal="true">
    <q-toolbar color="tertiary" class="text-white">
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
                <img :src="store.image" alt="" style="object-fit: cover;  width: 100vw; height: 40vh;">
                <q-card-title slot="overlay">
                  <h4 class="text-bold">{{ store.name }}
                    <q-chip v-if="deliveryOffered == true" color="amber-9">Offers Delivery</q-chip>
                  </h4>
                  <q-rating color="amber-4" slot="subtitle" v-model="stars" :max="5" />
                </q-card-title>
              </q-card-media>
            </q-card>
          </div>
          <br>
          <div class="row">
            <div v-for="(cat, index) in allProducts" :key="index">
              <q-card inline flat style="width: 30vh; height: 30vh" class="col-sm-2 col-lg-4 col-md-4 bg-white" v-for="p in cat.products" :key="p.asset_id" @click="open(p)">
                <q-card-media overlay-position="bottom" style="padding: 20px">
                  <img :src="p.image" >
                  <q-card-title class="text-condensed" slot="overlay">
                    {{p.title}}<br>
                    {{getProductCartQuantity(id, p.id)}}
                    <span class="text-bold">${{p.price_cents / 100}}</span>
                  </q-card-title>
                </q-card-media>

              </q-card>
            </div>
                <!--</q-collapsible>-->
          </div>
        </div>
      </div>

      <q-modal ref="productModal" :content-css="{padding: '20px', maxWidth: '500px'}">
        <h4><q-icon name="close" class="text-negative absolute-top-right" @click="$refs.productModal.close()"/></h4>
        <!--<i class="text-negative" @click="$refs.productModal.close()">close</i>-->
        <product-page :product="ProductObject" quantityProp="1" v-on:added="close"></product-page>
      </q-modal>


      <!--<modal name="modal">-->
        <!--<h2 class =categoryTitle>{{ProductObject.ProductName}}</h2>-->
        <!--&lt;!&ndash;{{ProductObject.ProductName}}&ndash;&gt;-->
      <!--</modal>-->
    </div>
	</q-layout>
</template>

<script>
//  const CATPRODS = 'http://mycorner.store:8080/api/store/categories/retrieve/'
  import ProductPage from './ProductPage.vue'
  import layoutStore from '../store/otherJS/layout-store'
  import CartPage from './CartPage.vue'
  import {
    Loading
  } from 'quasar'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['id'],
    data () {
      return {
        ProductObject: {},
        CatProducts: [],
        stars: 4,
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
        'getProductCartQuantity'
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

//      showProductModal: function (Product) {
//        this.ProductObject = Product
//        this.showModal = true
//      },
      open: function (Product) {
        this.ProductObject = Product
        this.$refs.productModal.open()
      },
      close: function () {
        this.$refs.productModal.close()
      }
//      getProducts: function () {
//        axios.get(CATPRODS + this.id).then(response => {
//          this.CatProducts = response.data
//          console.log(response.data)
//        }).catch(function (error) {
//          console.log(error)
//        })
//      }
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

   /*li{*/
     /*float: left;*/
   /*}*/
   /*@media (max-width: 991px){*/
     /*.StoreItem{*/
       /*width: 100%*/
     /*}*/
   /*}*/
  .item-card{
    /*display: inline-block;*/
    /*position: relative;*/
    /*width: 206px;*/
    /*height: 336px;*/
    /*vertical-align: top;*/
    /*background: #fff;*/
    /*border: 1px solid #e5edec;*/
    /*text-align: left;*/
    /*color: #5a5a5a;*/
    /*font-weight: 400;*/
    /*margin: 0 -1px -1px 0;*/
    /*cursor: pointer;*/
    /*white-space: initial;*/
  }
  .product {
    height: 250px;
    width: 250px;
    padding: 20px;
  }
</style>
