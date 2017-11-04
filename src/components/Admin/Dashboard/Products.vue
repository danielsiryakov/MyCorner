<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">

    <h4 class="text-tertiary text-bold">Select a category to add products to:</h4>
    <q-select
      v-model="selectedCategory"
      :options="selectOptions"
      @change="getData"
    />
    <br><br>
    <!--{{productsData.results}}-->

    <!--<div v-for="(product, key) in productsData.results" :key="key">-->
      <!--{{ product.title }}-->
    <!--</div>-->
    <div class="row group no-wrap">
      <div class="items-stretch">
        <h5 class="text-tertiary text-bold">Template Products</h5>
        <draggable v-model="productsData.results" class="items-stretch" :options="{group:'products'}">
          <q-item separator class=" group" v-if="productsData.results.length > 0" v-for="(product, key) in productsData.results" :key="key">
            <!--<q-checkbox :id="p_index" v-model="product.checked" @input="product.add_to_category=true"></q-checkbox>-->
            <q-item-side>
              <img :src="product.image" alt="" width="100px" height="100px">
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
      </div>
      <div class="items-stretch bg-light" style="padding: 10px">
        <h5 class="text-tertiary text-bold">Your Added Products</h5>
        <draggable v-model="addedProductsData.results" class="items-stretch bg-light full-height	" :options="{group:'products'}" style="height: inherit">
          <q-item separator class=" group" v-for="(product, key) in addedProductsData.results" :key="key" >
            {{key}}
            <!--<q-checkbox :id="p_index" v-model="product.checked" @input="product.add_to_category=true"></q-checkbox>-->
            <q-item-side>
              <img :src="product.image" alt="" width="100px" height="100px">
            </q-item-side>
            <q-item-main>
              {{ product.label }}<br>
              $ {{product.price_cents / 100}}<br>
              <!--{{product.description}}-->
            </q-item-main>
            <q-item-side class="group">
              <q-btn outline @click="openProduct(key)">Edit</q-btn>
            </q-item-side>
          </q-item>
        </draggable>
      </div>
      <q-btn @click="addProducts">add products</q-btn>

    </div>
    <q-modal ref="productEdit" minimized :content-css="{padding: '20px', maxWidth: '50vw'}">
      <h4><q-icon name="close" style="padding: 10px" class="text-negative absolute-top-right" @click="closeProductModal()"/></h4>
      <div class="layout-padding">
        <h5 class="text-bold text-tertiary">{{ currentProduct.label}}</h5>
        <br>
        <div class="row">
          <div class="">
            <!--<h5 class="text-grey"><small>{{mutation.quantity}}x &nbsp</small></h5>-->
            <h5 class="">Price: <q-input
              v-model="newPrice"
              type="number"
              inverted
              :step="0.05"
            /></h5>
            <h5 class="">Size: {{ currentProduct.size }} &nbsp</h5>
          </div>
          <img :src="currentProduct.image" style="width: 30vh; height: 30vh">
        </div>
        <br><br>
        <div class="product-details group">
          <q-btn big color="primary full-width" class="block" @click="closeProductModal()">Save</q-btn>
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
  export default {
    data () {
      return {
        newPrice: 0,
        currentProduct: {},
        selectedCategory: '',
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
    computed: {
      productData: {
        get () { return this.$store.state.storeInfo.store.categories }
//        set (value) { this.$store.commit('update_full_store', value) }
      },
      selectOptions () {
        let options = []
        let categoryIds = this.$store.state.storeInfo.store.category_ids
        let categoriesT2 = this.$store.state.storeInfo.categoriesT2
        categoryIds.forEach(category => {
          let record = categoriesT2.find(c => c.category_id === category)
          if (record) {
            options.push({
              label: record.name,
              value: record.category_id,
              inset: true
            })
          }
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
      draggable
    },
    methods: {
      openProduct (pindex) {
        this.productIndex = pindex
        this.currentProduct = this.addedProductsData.results[pindex]
        this.newPrice = this.currentProduct.price_cents / 100
        setTimeout(this.$refs.productEdit.open(), 300)
      },
      closeProductModal () {
        this.currentProduct.price_cents = this.newPrice * 100
        setTimeout(this.$refs.productEdit.close(), 300)
      },
      getData () {
        this.getAddedProducts()
        this.getProductData()
      },
      getProductData () {
        shop.templateProducts(this.selectedCategory, 1).then(response => {
          this.productsData = response.data
        })
      },
      getAddedProducts () {
        shop.storeCategoryProductsRetrieve(this.selectedCategory, 1).then(response => {
          this.addedProductsData = response.data
        })
      },
      addProducts () {
        shop.productCreate(this.addedProductsData.results)
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

</style>
