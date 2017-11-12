<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <div class="row no-wrap">
      <div class="full-width" style="padding: 15px">
        <h4 class="text-tertiary text-bold">Aisle:</h4>
        <q-select
          v-model="selectedT1"
          :options="T1SelectOptions"
          @change="getT2Data"
        />
      </div>
      <div class="full-width" style="padding: 15px">
        <h4 class="text-tertiary text-bold">Category:</h4>
        <q-select
          v-model="selectedCategory"
          :options="selectOptions"
          @change="getData"
        />
      </div>
    </div>
    <br><br>
    <q-btn v-if="selectedCategory !== ''" outline @click="openSearchModal">Search for a product to add</q-btn>
    <q-modal v-if="selectedCategory !== ''" ref="productSearch" minimized :content-css="{padding: '20px', minWidth: '600px'}">
      <q-search inverted placeholder="Search for Products to Add!" v-model="terms" v-if="create_product_modal_view">
        <q-autocomplete
          separator
          @search="search"
          @selected="selected"
          :max-results="100"
        />
      </q-search>
      <br>
      <q-field v-if="create_product_modal_view">
        <q-input v-model="new_product.title" type="text" float-label="Product Name"
                 :value = "new_product.title" clearable/>
      </q-field>
      <q-field v-if="create_product_modal_view">
        <q-input v-model="new_product.price_cents" type="number" prefix="$" float-label="Product Price"
                 :value = "new_product.price_cents" clearable/>
      </q-field>

      <q-field v-if="create_product_modal_view">
        <q-input v-model="new_product.description" type="text" float-label="Product Description"
                 :value = "new_product.description" clearable/>
      </q-field>
      <div class="col-12">
        <q-field>
          <div v-if="!new_product.image">
            <div class="dropzone-area"
                 drag-over="handleDragOver"
                 @dragenter="this.hovering=true"
                 @dragleave="this.hovering=false"
                 :class="{'hovered': this.hovering}">
              <div class="dropzone-text">
                <span class="dropzone-title">
                  Drag and drop an image of your item here or click to select one from your device
                </span>
              </div>
              <input type="file" @change="onFileChange">
            </div>
          </div>
          <div class="dropzone-preview" v-if="new_product.image">
            <img :src="new_product.image" alt="" height="200px" width="200px">
            <q-btn @click="removeImage" flat color="tertiary">Remove</q-btn>
          </div>
        </q-field>
      </div>
      <q-btn outline @click="addProduct">Add Product</q-btn>
    </q-modal>

    <!--{{productsData.results}}-->

    <!--<div v-for="(product, key) in productsData.results" :key="key">-->
      <!--{{ product.title }}-->
    <!--</div>-->
    <div class="row group no-wrap">
      <div class="items-stretch full-width" style="padding: 15px; border-right-style: groove">
        <h5 class="text-tertiary text-bold">Template Products</h5>
          <!--<q-infinite-scroll :handler="refresher" v-if="selectedCategory !== ''">-->
            <draggable v-model="productsData.results" class="items-stretch" :options="{group:'products'}">

            <q-item separator class=" group" v-if="productsData.results.length > 0" v-for="(product, key) in productsData.results" :key="key">
              <!--<q-checkbox :id="p_index" v-model="product.checked" @input="product.add_to_category=true"></q-checkbox>-->
              <q-item-side :image="product.image">
                <!--<img :src="product.image" alt="" width="100px" height="100px">-->
              </q-item-side>
              <q-item-main>
                {{product.label}}<br>
                $ {{product.price_cents / 100}}<br>
                <!--{{product.description}}-->
              </q-item-main>
              <q-item-side class="group">
              </q-item-side>
            </q-item>
            </draggable>
        <q-btn v-if="selectedCategory != ''" outline @click="refresher">Load More...</q-btn>

          <!--</q-infinite-scroll>-->
      </div>
      <div class="items-stretch full-width" style="padding: 15px">
        <h5 class="text-tertiary text-bold">Store Products</h5>

        <draggable
          v-model="addedProductsData.results"
          class="items-stretch full-height	"
          :options="{group:'products'}"
          style="height: inherit">
          <q-item separator class=" group" v-for="(product, key) in addedProductsData.results" :key="key" >
            <!--<q-checkbox :id="p_index" v-model="product.checked" @input="product.add_to_category=true"></q-checkbox>-->
            <q-item-side :image="product.image">
              <!--<img :src="product.image" alt="" width="100px" height="100px">-->
            </q-item-side>
            <q-item-main>
              {{ product.label }}<br>
              $ {{product.price_cents / 100}}<br>
              <!--{{product.description}}-->
            </q-item-main>
            <q-item-side class="group">
              <q-btn outline @click="openProduct(product, key)">Edit</q-btn>
            </q-item-side>
          </q-item>
        </draggable>
      </div>
      <q-fixed-position corner="bottom-left" :offset="[18, 18]">
        <q-btn color="primary" big @click="addProducts">
          Save
        </q-btn>
      </q-fixed-position>
      <q-btn
        v-back-to-top.animate="{offset: 500, duration: 200}"
        round
        color="primary"
        class="fixed-bottom-right animate-pop"
        style="margin: 0 15px 105px 0"
      >
        <q-icon name="keyboard_arrow_up" />
      </q-btn>
      <q-btn v-if="selectedCategory != ''" @click="addProducts" style="margin: 0 15px 15px 0" round class="fixed-bottom-right animate-pop" color="primary">Save</q-btn>
    </div>
    <q-modal ref="productEdit" minimized :content-css="{padding: '0px'}">
      <h4><q-icon name="close" style="padding: 10px" class="text-negative absolute-top-right" @click="closeProductModal()"/></h4>
      <div class="layout-padding">
        <h5 class="text-bold text-tertiary">{{ }}</h5>
        <br>
        <div class="row no-wrap">
          <div class="">
            <!--<h5 class="text-grey"><small>{{mutation.quantity}}x &nbsp</small></h5>-->
            <q-field
              icon="label_outline"
              label="Product Label">
              <q-input
                v-model="currentProduct.label"
                type="text"
              />
            </q-field>
            <br>
            <q-field
              icon="attach_money"
              label="Product Price">
              <q-input
                v-model="currentProduct.price_cents"
                type="number"
                prefix="$"
                :step="0.05"/>
            </q-field>
            <br>
            <q-field
              icon="check_box_outline_blank"
              label="Product Size:">
              <q-input
                v-model="currentProduct.size"
                type="text"
                />
            </q-field>
            <br>
            <q-field
              icon="sentiment_very_dissatisfied"
              label="Tax Rate:">
              <q-input
                v-model="currentProduct.tax_rate"
                type="number"
                prefix="%"
                :step="0.1"
              /></q-field>
          </div>
          <div>
            <img :src="currentProduct.image" style="width: 30vh; height: 30vh">
          </div>
        </div>
        <br><br>
        <div class="product-details group">
          <q-btn big color="primary full-width" class="block" @click="saveProductModal()">Save</q-btn>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import tooltipButton from './tooltipButton.vue'
  import ProductAddModal from '../Onboard/ProductAddModal.vue'
  import CategoryProducts from '../Onboard/StepThree.vue'
  import shop from '../../../api/shop'
  import axios from 'axios'
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import {
    Loading,
    Alert,
    QSpinnerDots
  } from 'quasar'
  export default {
    data () {
      return {
        hovering: false,
        create_product_modal_view: true,
        addedPage: 1,
        templatePage: 1,
        newPrice: 0,
        currentProduct: {},
        selectedCategory: '',
        selectedT1: '',
        productsData: {
          results: [],
          metadata: {}
        },
        addedProductsData: {
          results: [],
          metadata: {}
        },
        productIndex: '',
        terms: '',
        new_product: {
          label: '',
          title: '',
          image: '', // leaving at top level for now (which means variants cant have imgs)
          category_id: '', // ? just one or list of cats it falls in (tempted to say list)
          asset_id: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'getT1Aisles',
        'getT2Categories',
        'getUserInfo'
      ]),
      onFileChange (e) {
        var reader = new FileReader()
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        console.log(files)
        if (files.length !== 1) {
          setTimeout(Alert.create({
            html: 'Please include an image for your new item.',
            color: 'red-7'
          }).dismiss, 5000)
          return
        }
        reader.onload = (e) => {
          this.new_product.image = e.target.result
          this.new_asset = e.target.result
        }
        console.log(e.target.files)
        reader.readAsDataURL(files[0])
      },
      createImage (file) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.new_product.images.push(e.target.result)
          this.new_asset = e.target.result
        }
        reader.readAsDataURL(file)
      },
      openSearchModal () {
        this.$refs.productSearch.open()
      },
      removeImage: function (e) {
        this.new_product.image = ''
      },
      selected (item) {
        this.new_product.title = item.title
        this.new_product.label = item.label
        this.new_product.image = item.image
        this.new_product.asset_id = item.asset_id
        this.new_product.category_id = item.template_category_id
      },
      search: function (terms, done) {
        axios.get(shop.ASSET_IMAGE_SEARCH + terms, {
        }).then(function (response) {
          console.log(response.data)
          done(response.data)
        }).catch(function (error) {
          done([error])
        })
      },
      openProduct (product, pindex) {
        this.productIndex = pindex
//        this.currentProduct = this.addedProductsData.results[pindex]
        this.currentProduct = Object.assign({}, product)
        this.currentProduct.price_cents /= 100
        this.$refs.productEdit.open()
      },
      closeProductModal () {
//        this.currentProduct.price_cents = this.currentProduct.price_cents * 100
        this.$refs.productEdit.close()
      },
      saveProductModal () {
        this.currentProduct.price_cents = this.currentProduct.price_cents * 100
        if (this.currentProduct.enabled) {
          Vue.set(this.currentProduct, 'store_id', this.selectedStore)
          shop.categoryProductUpdate(this.currentProduct)
        }
        this.addedProductsData.results[this.productIndex] = Object.assign({}, this.currentProduct)
        this.$refs.productEdit.close()
      },
      getData () {
        this.addedPage = 1
        this.templatePage = 1
        this.productsData = {
          results: [],
          metadata: {}
        }
        this.addedProductsData = {
          results: [],
          metadata: {}
        }
        this.getAddedProducts()
        this.getProductData()
      },
      getT2Data () {
        this.selectedCategory = ''
        this.productsData = {
          results: [],
          metadata: {}
        }
        this.addedProductsData = {
          results: [],
          metadata: {}
        }
        this.getT2Categories(this.selectedT1)
      },
      getProductData () {
        shop.templateProducts(this.selectedCategory, this.templatePage).then(response => {
          this.productsData.results = this.productsData.results.concat(response.data.results)
          this.productsData.metadata = response.data.metadata
        }).catch(error => {
          console.log(error)
          const alert = Alert.create({html: error.response.data.message, color: 'amber-9'})
          setTimeout(alert.dismiss, 5000)
        })
      },
      getAddedProducts () {
        shop.storeCategoryProductsRetrieve(this.selectedCategory, this.addedPage).then(response => {
          this.addedProductsData.results = this.addedProductsData.results.concat(response.data.results)
          this.addedProductsData.metadata = response.data.metadata
        }).catch(error => {
          console.log(error)
          const alert = Alert.create({html: error.response.data.message, color: 'amber-9'})
          setTimeout(alert.dismiss, 5000)
        })
      },
      addProduct () {
        this.$refs.productSearch.close()
        this.new_product.price_cents = this.new_product.price_cents * 100
        this.addedProductsData.results.push(this.new_product)
        this.new_product = {
          label: '',
          title: '',
          image: '', // leaving at top level for now (which means variants cant have imgs)
          category_id: '', // ? just one or list of cats it falls in (tempted to say list)
          asset_id: ''
        }
        this.addProducts()
      },
      addProducts () {
        shop.productCreate(this.addedProductsData.results, this.selectedCategory).then(response => {
          this.addedProductsData = response.data
        }).catch(error => {
          console.log(error)
          const alert = Alert.create({html: error.response.data.message, color: 'amber-9'})
          setTimeout(alert.dismiss, 5000)
        })
      },
      refresher () {
        Loading.show()
        setTimeout(() => {
          this.templatePage = this.templatePage + 1
          this.getProductData()
          Loading.hide()
        }, 200)
      }
    },
    computed: {
      productData: {
        get () { return this.$store.state.storeInfo.store.categories }
      },
      selectOptions () {
        let options = []
        let T2Categories = this.$store.state.storeInfo.T2Categories
        T2Categories.forEach(category => {
          options.push({
            label: category.name,
            value: category.category_id,
            stamp: category.product_count.toString(),
            inset: true
          })
        })
        return options
      },
      T1SelectOptions () {
        let options = []
        let T1Aisles = this.$store.state.storeInfo.T1Aisles
        T1Aisles.forEach(aisle => {
          options.push({
            label: aisle.name,
            value: aisle.category_id,
            stamp: aisle.product_count.toString(),
            inset: true
          })
        })
        return options
      },
      selectedStore: {
        get () { return this.$store.state.storeInfo.selectedStore }
      }
    },
    components: {
      CategoryProducts,
      tooltipButton,
      ProductAddModal,
      draggable,
      QSpinnerDots
    },
    created () {
      this.getUserInfo()
//      this.getT1Aisles()
    },
    watch: {
      '$route' (to, from) {
        this.getUserInfo()
      }
    }
  }
</script>

<style>
  .dragArea {
    min-height: 2000px;
  }
  .list-complete-enter, .list-complete-leave-active {
    opacity: 0;
  }
  .modal-content.scroll{
    padding: 10px;
  }
  .list-complete-item {
    padding: 4px;
    margin-top: 4px;
    border: solid 1px;
    transition: all 1s;
  }

  .list-complete-enter, .list-complete-leave-active {
    opacity: 0;
  }
  .dropzone-area {
    width: 100% !important;
    height: 100px !important;
    position: relative;
    border: 2px dashed #CBCBCB;
  &.hovered {
     border: 2px dashed #2E94C4;
  .dropzone-title {
    color: #1975A0;
  }
  }
  }

  .dropzone-area input {
    position: absolute;
    cursor: pointer;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .dropzone-text {
    position: absolute;
    top: 50%;
    text-align: center;
    transform: translate(0, -50%);
    width: 100%;
  span {
    display: block;
    font-family: Arial, Helvetica;
    line-height: 1.9;
  }
  }

  .dropzone-title {
    font-size: 13px;
    color: #787878;
    letter-spacing: 0.4px;
  }
  .dropzone-info {
    font-size: 13px;
    font-size: 0.8125rem;
    color: #A8A8A8;
    letter-spacing: 0.4px;
  }

  .dropzone-button {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
  }

  .dropzone-preview {
    width: 80% !important;
    position: relative;
  &:hover .dropzone-button {
     display: block;
   }
  img {
    display: block;
    height: auto;
    max-width: 100%;
  }
  }
</style>
