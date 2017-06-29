<template>
  <div>
    <div>
      <h4 class="text-dark text-bold">Enter Products for {{current_category.name}}</h4>
      <button class="outline tertiary" @click="create_product_modal_view=true">
        New Product
      </button>
      <br><br>
      <div class="list full-width" v-if="create_product_modal_view">
        <div class="item two-lines">
          <div class="item-content">
            <label class="text-primary">Product Name</label>
            <i v-show="!new_product.title" class="text-red">*</i>
            <i v-show="new_product.title" class="text-green">check</i>
            <input placeholder="Product Name" v-model="new_product.title" class="full-width">
          </div>
        </div>
        <div class="item two-lines">
          <div class="item-content">
            <label class="text-primary">Product Name</label>
            <span v-show="!new_product.dislplay_price" class="text-red">$</span>
            <span v-show="new_product.dislplay_price" class="text-green">$</span>
            <input placeholder="$xx.xx"
               type="number" min="0.01" step="0.01"
               v-model="new_product.dislplay_price"
               class="full-width">
          </div>
        </div>
        <div class="item two-lines">
          <div class="item-content">
            <label class="text-primary">Item Description</label>
            <i v-show="!new_product.short_description" class="text-red">*</i>
            <i v-show="new_product.short_description" class="text-green">check</i>
            <textarea class="full-width" v-model="new_product.short_description" placeholder="Short Description"></textarea>
          </div>
        </div>
        <br>
        <div class="item">
          <div class="item-content">
          <button class="primary" @click="add_product()">Add Product</button>
          <button class="outline negative float-right" @click="reset_temp_product()">Cancel</button>
          </div>
        </div>
        <br>
      </div>
        <!--Category products-->
      <h5 class="text-dark text-bold">{{current_category.name}} Products</h5>
      <div v-if="current_category.products.length==0">No products added :/ Please add some products!</div>
      <div v-if="!current_category.products.length==0">Edit, remove, and finalize category products.</div>
      <div v-for="(product, p_index) in current_category.products" class="list highlight">
        <div class="item multiple-lines">
          <div class="item-primary">
            <q-checkbox :id="p_index" v-model="product.checked" @input="product.add_to_category=true"></q-checkbox>
          </div>
          <div class="item-content has-secondary">
            <big class="">{{product.title}}</big><br>
            $ {{product.dislplay_price}}<br>
            {{product.short_description}}
          </div>
          <div class="item-secondary">
            <input type="checkbox" :id="p_index" class="cbx hidden" v-on:click="product.add_to_category=true"/>
            <i class ="text-negative" @click="removeProduct(p_index)">delete</i>
            <label :for="p_index" class="lbl"></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'quasar'
  export default {
    props: ['current_category'],
    methods: {
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
          images: [], // leaving at top level for now (which means variants cant have imgs)
          category: '', // ? just one or list of cats it falls in (tempted to say list)
          keywords: [],
          checked: false,
          add_to_category: false,
          long_description: '',
          short_description: '',
          dislplay_price: '' // different for variants but top level for product list
        }
        this.create_product_modal_view = false
      },
      add_product: function () {
        this.productAddedToast()
        this.create_product_modal_view = false
        // ajax call to verify and queue storing
        this.current_category.products.push(this.new_product)
        // reset product template
        this.new_product = {
          title: '',
          images: [], // leaving at top level for now (which means variants cant have imgs)
          category: '', // ? just one or list of cats it falls in (tempted to say list)
          keywords: [],
          add_to_category: false,
          checked: false,
          long_description: '',
          short_description: '',
          dislplay_price: '' // different for variants but top level for product list
        }
      },
      removeProduct: function (pindex) {
        this.current_category.products.splice(pindex, 1)
      }
    },
    data () {
      return {
        newProduct: false,
        checked: false,
        create_product_modal_view: false,
        temp_category_prods: [],
        new_product: {
          title: '',
          images: [], // leaving at top level for now (which means variants cant have imgs)
          category: '', // ? just one or list of cats it falls in (tempted to say list)
          keywords: [],
          checked: false,
          add_to_category: false,
          long_description: '',
          short_description: '',
          dislplay_price: '' // different for variants but top level for product list
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
