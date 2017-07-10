<template>
  <div>
    <div>
      <h4 class="text-dark text-bold">Enter Products for {{current_category.name}}</h4>
      <q-btn outline color="tertiary" @click="create_product_modal_view=true">
        New Product
      </q-btn>
      <br><br>
      <q-search inverted placeholder="Search for Products to Add!" v-model="terms" v-if="create_product_modal_view">
        <q-autocomplete
          separator
          @search="search"
          @selected="selected"
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
      <div v-if="new_product.image">
        <img :src="new_product.image" alt="" height="200px" width="200px">
      </div>
      <br>
      <div class="item">
        <div class="item-content">
          <q-btn color="primary" @click="add_product()">Add Product</q-btn>
          <q-btn outline class="negative float-right" @click="reset_temp_product()">Cancel</q-btn>
        </div>
      </div>
      <br>
    </div>
      <!--Category products-->
    <h5 class="text-dark text-bold">{{current_category.name}} Products</h5>
    <div v-if="current_category.products.length==0">No products added :/ Please add some products!</div>
    <div v-if="!current_category.products.length==0">Edit, remove, and finalize category products.</div>
    <div v-for="(product, p_index) in current_category.products" class="list highlight">
      <q-item class="group">
        <!--<q-checkbox :id="p_index" v-model="product.checked" @input="product.add_to_category=true"></q-checkbox>-->
        <img :src="product.image" alt="" width="100px" height="100px">
        {{product.title}}<br>
        $ {{product.price_cents}}<br>
        {{product.description}}
        <q-icon class="text-negative" @click="removeProduct(p_index)" name="delete"/>
      </q-item>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'quasar'
  import axios from 'axios'
  export default {
    props: ['current_category'],
    methods: {
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
//        this.new_product.short_description = item.label
        this.new_product.image = item.image
        this.new_product.asset_id = item.asset_id

//        Toast.create(`Selected suggestion "${item.label}"`)
      },
      productAddedToast () {
        Toast.create('New Product Added')
      },
      onFileChange (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files[0])
      },
      createImage (file) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.new_product.images.push(e.target.result)
        }
        reader.readAsDataURL(file)
      },
      removeImage: function (e) {
        this.new_product.images = []
      },
      reset_temp_product: function () {
        this.new_product = {
          title: '',
          image: '', // leaving at top level for now (which means variants cant have imgs)
          category: '', // ? just one or list of cats it falls in (tempted to say list)
          keywords: [],
          checked: false,
          asset_id: '',
          add_to_category: false,
          long_description: '',
          description: '',
          price_cents: '' // different for variants but top level for product list
        }
        this.create_product_modal_view = false
      },
      add_product: function () {
        this.productAddedToast()
        this.create_product_modal_view = false
        // ajax call to verify and queue storing
        this.current_category.products.push({
          image: this.new_product.image,
          title: this.new_product.title,
          asset_id: this.new_product.asset_id,
          price_cents: this.new_product.price_cents * 100
        })
        // reset product template
        this.new_product = {
          title: '',
          images: [], // leaving at top level for now (which means variants cant have imgs)
          category: '', // ? just one or list of cats it falls in (tempted to say list)
          keywords: [],
          add_to_category: false,
          checked: false,
          long_description: '',
          asset_id: '',
          description: '',
          price_cents: '' // different for variants but top level for product list
        }
      },
      removeProduct: function (pindex) {
        this.current_category.products.splice(pindex, 1)
      }
    },
    data () {
      return {
        terms: '',
        newProduct: false,
        checked: false,
        create_product_modal_view: false,
        temp_category_prods: [],
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
</style>
