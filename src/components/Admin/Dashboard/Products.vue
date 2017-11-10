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
        productIndex: ''
      }
    },
    methods: {
      ...mapActions([
        'getT1Aisles',
        'getT2Categories'
      ]),
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
            inset: true,
            avatar: category.icon
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
      this.getT1Aisles()
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

</style>
