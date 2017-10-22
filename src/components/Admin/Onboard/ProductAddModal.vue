<template>
  <div class="row justify-center">
    <div class="md-10">
      <h4 class="text-dark text-bold">Enter Products for {{current_category.name}}</h4>
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
      <!--<div v-if="new_product.image">-->
        <!--<img :src="new_product.image" alt="" height="200px" width="200px">-->
        <!--<br>-->
      <!--</div>-->
      <br>
        <div class="item-content">
          <q-btn color="primary" @click="add_product()">Add Product</q-btn>
          <q-btn outline class="negative float-right" @click="reset_temp_product()">Reset Product</q-btn>
        </div>
      <br>

      <!--Category products-->
    <h5 class="text-dark text-bold">{{current_category.name}} Products</h5>
    <div v-if="current_category.products">
      <div v-if="current_category.products.length==0">No products added :/ Please add some products!</div>
      <div v-if="!current_category.products.length==0">Edit, remove, drag, drop and finalize products.</div>
      <q-list highlight no-pane>
        <draggable v-model="current_category.products" @end="reorderProducts">
          <transition-group>
            <q-item separator class=" group" v-for="(product, p_index) in current_category.products" :key="p_index">
              <!--<q-checkbox :id="p_index" v-model="product.checked" @input="product.add_to_category=true"></q-checkbox>-->
              <q-item-side>
                <img :src="product.image" alt="" width="100px" height="100px">
              </q-item-side>
              <q-item-main>
                {{product.title}}<br>
                $ {{product.price_cents / 100}}<br>
                {{product.description}}
              </q-item-main>
              <q-item-side class="group">
                <q-btn outline
                       v-back-to-top
                       @click="editProduct(product)">Edit Product </q-btn>
                <q-icon class="text-negative" @click="removeProduct(p_index)" name="delete"/>
              </q-item-side>
            </q-item>
          </transition-group>
        </draggable>
      </q-list>
    </div>
    </div>
  </div>
</template>
<script>
  import {
    Toast,
    Alert
  } from 'quasar'
  import axios from 'axios'
  import draggable from 'vuedraggable'
  import shop from '../../../api/shop'
  export default {
    props: ['current_category'],
    components: {
      draggable
    },
    methods: {
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
      search: function (terms, done) {
        axios.get(shop.ASSET_IMAGE_SEARCH + terms, {
        }).then(function (response) {
          console.log(response.data)
          done(response.data)
        }).catch(function (error) {
          done([error])
        })
      },
      editProduct (product) {
        this.productEdit = true
        this.new_product.title = product.title
        this.new_product.image = product.image
        this.new_product.category = product.category // ? just one or list of cats it falls in (tempted to say list)
        this.new_product.asset_id = product.asset_id
        this.new_product.dislplay_price = product.display_price // different for variants but top level for product list
        this.new_product.description = product.description
        this.new_product.price_cents = product.price_cents / 100
      },
      selected (item) {
        this.new_product.title = item.label
        this.new_product.image = item.image
        this.new_product.asset_id = item.asset_id
      },
      productAddedToast () {
        Toast.create('New Product Added')
        this.productEdit = false
      },
      createImage (file) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.new_product.images.push(e.target.result)
          this.new_asset = e.target.result
        }
        reader.readAsDataURL(file)
      },
      removeImage: function (e) {
        this.new_product.image = ''
      },
      reset_temp_product: function () {
        this.productEdit = false
        this.new_product = {
          title: '',
          image: '', // leaving at top level for now (which means variants cant have imgs)
          category: '', // ? just one or list of cats it falls in (tempted to say list)
          checked: false,
          asset_id: '',
          new_asset: '',
          add_to_category: false,
          long_description: '',
          short_description: '',
          dislplay_price: '', // different for variants but top level for product list
          description: '',
          price_cents: '' // different for variants but top level for product list
        }
        this.create_product_modal_view = true
      },
      add_ready_product: function () {
        if (!this.productEdit) {
          shop.categoryProductCreate({
            image: this.new_product.image,
            asset_id: this.new_product.asset_id,
            store_id: this.current_category.store_id,
            price_cents: this.new_product.price_cents * 100,
            category_id: this.current_category.category_id,
            description: this.new_product.description,
            title: this.new_product.title,
            display_price: this.new_product.price_cents
          }).then(response => {
            this.productAddedToast()
            this.current_category.products.push(response.data)
            this.reset_temp_product()
          }).catch(error => {
            setTimeout(Alert.create({
              html: error.response.data.message,
              color: 'red-7'
            }).dismiss, 5000)
          })
        }
        else {
          shop.categoryProductUpdate({
            image: this.new_product.image,
            asset_id: this.new_product.asset_id,
            store_id: this.current_category.store_id,
            price_cents: this.new_product.price_cents * 100,
            category_id: this.current_category.category_id,
            description: this.new_product.description,
            title: this.new_product.title,
            display_price: this.new_product.price_cents
          }).then(response => {
            this.productAddedToast()
            this.current_category.products.push(response.data)
            this.reset_temp_product()
          }).catch(error => {
            setTimeout(Alert.create({
              html: error.response.data.message,
              color: 'red-7'
            }).dismiss, 5000)
          })
        }
      },
      add_product: function () {
        this.create_product_modal_view = true
        // ajax call to verify and queue storing
        if (!this.new_product.title || !this.new_product.price_cents) {
          setTimeout(Alert.create({
            html: 'An image, title, and price is required to create an item',
            color: 'red-7'
          }).dismiss, 5000)
          return
        }
        if (!this.new_product.asset_id) {
          if (!this.new_asset) {
            setTimeout(Alert.create({
              html: 'Please include an image for your new item.',
              color: 'red-7'
            }).dismiss, 5000)
            return
          }
          axios.post(shop.ASSET_IMAGE_UPLOAD, JSON.stringify({
            image: this.new_asset,
            display_title: this.new_product.title
          })).then(response => {
            this.new_product.image = response.data.link
            this.new_product.asset_id = response.data.asset_id
            if (this.$route.path === '/admin/products') {
              this.add_ready_product()
            }
          }).catch(error => {
            setTimeout(Alert.create({
              html: error.response.data.message,
              color: 'red-7'
            }).dismiss, 5000)
            console.log(error)
          })
        }
        else {
          if (this.$route.path === '/admin/products') {
            this.add_ready_product()
          }
          else {
            this.new_product.price_cents = this.new_product.price_cents * 100
            this.current_category.products.push(this.new_product)
            this.productAddedToast()
            this.reset_temp_product()
          }
        }
      },
      removeProduct: function (pindex) {
        this.current_category.products.splice(pindex, 1)
      },
      reorderProducts () {
        let productIDs = []
        for (var i = 0; i < this.current_category.products.length; i++) {
          productIDs.push(this.current_category.products[i].product_id)
        }
        if (this.$route.path === '/admin/products') {
          shop.storeProductsReorder({
            category_id: this.current_category.category_id,
            store_id: this.current_category.store_id,
            product_ids: productIDs
          }).then(() => this.rerender())
        }
      }
    },
    data () {
      return {
        productEdit: false,
        hovering: false,
        terms: '',
        newProduct: true,
        checked: false,
        create_product_modal_view: true,
        temp_category_prods: [],
        asset_id: '',
        new_asset: '',
        new_product: {
          title: '',
          image: '', // leaving at top level for now (which means variants cant have imgs)
          category: '', // ? just one or list of cats it falls in (tempted to say list)
          keywords: [],
          asset_id: '',
          checked: false,
          add_to_category: false,
          long_description: '',
          description: '',
          price_cents: '' // different for variants but top level for product list
        }
      }
    }
  }
</script>

<style>
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
