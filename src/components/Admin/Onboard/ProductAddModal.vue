<template>
  <div>
    <div>
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
                  Drop an image of your store here or click to select
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
    </div>
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
              <q-item-side>
                <q-icon class="text-negative" @click="removeProduct(p_index)" name="delete"/>
              </q-item-side>
            </q-item>
          </transition-group>
        </draggable>
      </q-list>
    </div>
  </div>
</template>
<script>
  import {Toast, Loading} from 'quasar'
  import axios from 'axios'
  import draggable from 'vuedraggable'
  import shop from '../../../api/shop'
  const IMAGEUPLOAD = shop.API_URL + 'assets/image/upload'
  export default {
    props: ['current_category'],
    components: {
      draggable
    },
    methods: {
      onFileChange (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        var reader = new FileReader()
        reader.onload = (e) => {
          Loading.show()
          axios.post(IMAGEUPLOAD, JSON.stringify({
            image: e.target.result,
            display_title: 'image'
          })).then(response => {
            this.new_product.image = response.data.link
            this.new_product.asset_id = response.data.asset_id
            Loading.hide()
          }).catch(error => {
            console.log(error)
          })
        }
        reader.readAsDataURL(files[0])
      },
      search: function (terms, done) {
        axios.get('http://mycorner.store:8080/api/assets/image/search/' + terms, {
        }).then(function (response) {
          console.log(response.data)
          done(response.data)
        }).catch(function (error) {
          done([error])
        })
      },
      selected (item) {
        this.new_product.title = item.label
        this.new_product.image = item.image
        this.new_product.asset_id = item.asset_id
      },
      productAddedToast () {
        Toast.create('New Product Added')
      },
      createImage (file) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.new_product.images.push(e.target.result)
        }
        reader.readAsDataURL(file)
      },
      removeImage: function (e) {
        this.new_product.image = ''
      },
      reset_temp_product: function () {
        this.new_product = {
          title: '',
          image: '', // leaving at top level for now (which means variants cant have imgs)
          category: '', // ? just one or list of cats it falls in (tempted to say list)
          checked: false,
          asset_id: '',
          add_to_category: false,
          long_description: '',
          short_description: '',
          dislplay_price: '', // different for variants but top level for product list
          description: '',
          price_cents: '' // different for variants but top level for product list
        }
        this.create_product_modal_view = true
      },
      add_product: function () {
        this.productAddedToast()
        this.create_product_modal_view = true
        // ajax call to verify and queue storing
        this.current_category.products.push({
          image: this.new_product.image,
          title: this.new_product.title,
          asset_id: this.new_product.asset_id,
          description: this.new_product.description,
          price_cents: this.new_product.price_cents * 100
        })
        if (this.$route.path === '/admin/products') {
          shop.categoryProductCreate({
            image: this.new_product.image,
            asset_id: this.new_product.asset_id,
            enabled: true,
            store_id: this.current_category.store_id,
            price_cents: this.new_product.price_cents * 100,
            category_id: this.current_category.category_id,
            description: this.new_product.description,
            title: this.new_product.title,
            display_price: this.new_product.price_cents
          })
        }
        // reset product template
        this.new_product = {
          title: '',
          images: '', // leaving at top level for now (which means variants cant have imgs)
          category: '', // ? just one or list of cats it falls in (tempted to say list)
          add_to_category: false,
          checked: false,
          long_description: '',
          short_description: '',
          dislplay_price: '', // different for variants but top level for product list
          asset_id: '',
          description: '',
          price_cents: '' // different for variants but top level for product list
        }
      },
      removeProduct: function (pindex) {
        this.current_category.products.splice(pindex, 1)
      },
      reorderProducts () {
        let productIDs = []
        for (var i = 0; i < this.current_category.products.length; i++) {
          productIDs.push(this.current_category.products[i].asset_id)
        }
        if (this.$route.path === '/admin/products') {
          shop.storeProductsReorder({
            category_id: this.current_category.category_id,
            store_id: this.current_category.store_id,
            product_ids: productIDs
          }).then(() => this.rerender())
        }
      },
      editProduct (pindex) {
        this.current_category.products.splice(pindex, 1)
      }
    },
    data () {
      return {
        hovering: false,
        terms: '',
        newProduct: true,
        checked: false,
        create_product_modal_view: true,
        temp_category_prods: [],
        asset_id: '',
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
