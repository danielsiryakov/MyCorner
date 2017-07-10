<template>
  <q-layout>
    <q-toolbar color="tertiary" class="text-white">
      <q-btn v-go-back="'/store_search'" icon="arrow_back"/>
      <q-toolbar-title>{{ store.name }}</q-toolbar-title>
    </q-toolbar>

		<div class="layout-view bg-light">
      <div class="layout-padding">
        <div class="row">
          <div class="col-lg-8 offset-lg-2">
            <div class="col-12">
              <q-card class="layout-padding bg-white">
                <h4 slot="storeName"><strong>{{ store.name }}</strong></h4>
                <p class="float-left">
                  {{ store.address2 }} <br>
                  {{ store.address1 }} <br>
                </p>
              </q-card>
            </div>
            <br>
            <div class="list card bg-light text-bold" v-for="category in allProducts">
              <!--<q-collapsible :label="category.name" class="primary">-->
              <div class ="row wrap">
                <q-card inline flat class ="item-card" v-for="p in category.products">
                  <div class="product text-tertiary" @click="open(p)">
                    <img :src="p.image" style="width: 150px; height: 150px">
                    {{p.title}}
                  </div>
                </q-card>
              </div>
              <!--</q-collapsible>-->
            </div>
          </div>
        </div>
      </div>

      <!--<q-modal ref="productModal" class="minimized" :content-css="{padding: '40px'}">-->
        <!--<h4><i class="text-negative absolute-top-right" @click="$refs.productModal.close()">close</i></h4>-->
        <!--&lt;!&ndash;<i class="text-negative" @click="$refs.productModal.close()">close</i>&ndash;&gt;-->
        <!--<product-page :product="ProductObject"></product-page>-->
      <!--</q-modal>-->
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
//  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['id'],
    data () {
      return {
        ProductObject: {},
        CatProducts: []
      }
    },
    components: {
      ProductPage
    },
    computed: {
      ...mapGetters([
        'allStores',
        'allProducts'
      ]),
      store () {
        return this.allStores.find((s) => s._id === this.id) || {}
      }
    },
    mounted () {
      this.getAllProducts(this.id)
    },
    methods: {
      ...mapActions([
        'getAllStores',
        'getAllProducts'
      ]),

//      showProductModal: function (Product) {
//        this.ProductObject = Product
//        this.showModal = true
//      },
      open: function (Product) {
        this.ProductObject = Product
        this.$refs.productModal.open()
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
    display: inline-block;
    position: relative;
    width: 206px;
    height: 336px;
    vertical-align: top;
    background: #fff;
    border: 1px solid #e5edec;
    text-align: left;
    color: #5a5a5a;
    font-weight: 400;
    margin: 0 -1px -1px 0;
    cursor: pointer;
    white-space: initial;
  }
  .product {
    height: 250px;
    width: 250px;
    padding: 20px;
  }
</style>
