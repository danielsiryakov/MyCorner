<template>
	<q-layout>
		<div slot="header" class="toolbar tertiary text-white">
			<button v-go-back="'/store_search'" class="within-iframe-hide">
				<i>arrow_back</i>
			</button>

			<q-toolbar-title :padding="1" class="" >
				<span class="page_title">{{ store.name }}</span>
			</q-toolbar-title>
		</div>

		<div class="layout-view bg-light">
      <div class="layout-padding">
        <div class="row">
          <div class="card layout-padding bg-white">
            <div class="sm-width-1of1 md-width-1of1 bg-width-1of1 lg-width-1of1">
              <h4 slot="storeName"><strong>{{ store.name }}</strong></h4>
              <p class="float-left">
                {{ store.address2 }} <br>
                {{ store.address1 }} <br>
              </p>
            </div>
          </div>
        </div>
        <br>
        <div class="list card bg-white text-bold" v-for="category in store.c_names">
          <q-collapsible :label="category" class="primary">
            <div class ="row wrap">
              <div class ="card product" v-for="p in allProducts">
                <div class="column layout-padding" @click="open(p)">
                  {{p.fields.gtin_nm}} <br>
                  <img :src="p.fields.gtin_img" style="width: 150px; height: 150px">
                </div>
              </div>
            </div>
          </q-collapsible>
        </div>
      </div>

      <q-modal ref="productModal" class="minimized" :content-css="{padding: '40px'}">
        <h4><i class="text-negative absolute-top-right" @click="$refs.productModal.close()">close</i></h4>
        <!--<i class="text-negative" @click="$refs.productModal.close()">close</i>-->
        <product-page :product="ProductObject"></product-page>
      </q-modal>
      <!--<modal name="modal">-->
        <!--<h2 class =categoryTitle>{{ProductObject.ProductName}}</h2>-->
        <!--&lt;!&ndash;{{ProductObject.ProductName}}&ndash;&gt;-->
      <!--</modal>-->
    </div>
	</q-layout>
</template>

<script>
  import ProductPage from './ProductPage.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['id'],
    data () {
      return {
        ProductObject: {}
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
    }
//    mounted () {
//      getAllStores
//      getAllProducts
//    }
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
  .categoryTitle{
    font-weight: bold;
    font-size: 25px;
    color: #1b9872;
    font-family: Helvetica;

  }
  .product {
    height: 250px;
    width: 250px;
  }
</style>
