<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <category-products></category-products>    <!-- your content -->
    <q-btn outline>Save Changes</q-btn>
    <!--<q-data-table-->
      <!--v-for="(categories, key) in productData" :key="key"-->
      <!--:data="productData[key].products"-->
      <!--class="text-dark bg-light"-->
      <!--:config="{-->
          <!--title: categories.name,-->
          <!--noHeader: false,-->
          <!--columnPicker: true,-->
          <!--leftStickyColumns: 0,-->
          <!--rightStickyColumns: 2,-->
          <!--bodyStyle: {-->
            <!--maxHeight: '500px'-->
          <!--},-->
          <!--rowHeight: '50px',-->
          <!--responsive: true,-->
          <!--pagination: {-->
            <!--rowsPerPage: 15,-->
            <!--options: [5, 10, 15, 30, 50, 500]-->
          <!--},-->
          <!--selection: 'multiple'-->
        <!--}"-->
      <!--:columns="columns"-->
      <!--@selection="selection"-->
      <!--@refresh="false"-->
    <!--&gt;-->
      <!--<template slot="col-title" scope="cell">-->
        <!--<span class="light-paragraph">{{cell.data}}</span>-->
        <!--<q-input class="light-paragraph" v-model="cell.data" v-if="cell.row.edit"/>-->
      <!--</template>-->
      <!--<template slot="col-price_cents" scope="cell">-->
        <!--<span class="light-paragraph text-black">${{cell.data/100}}</span>-->
      <!--</template>-->
      <!--<template slot="col-asset_id" scope="cell">-->
        <!--<span class="light-paragraph text-black">{{cell.data}}</span>-->
      <!--</template>-->

      <!--<template slot="col-image" scope="cell">-->
        <!--<tooltip-button :url="cell.data"></tooltip-button>-->
      <!--</template>-->

      <!--<template slot="selection" scope="props">-->
        <!--<q-btn flat color="primary" @click="editTitle(props)">-->
          <!--<q-icon name="edit" />-->
          <!--Edit-->
        <!--</q-btn>-->
        <!--<q-btn flat color="primary" @click="deleteRow(props)">-->
          <!--<q-icon name="delete" />-->
          <!--Delete-->
        <!--</q-btn>-->
      <!--</template>-->
    <!--</q-data-table>-->

    <!--<q-modal ref="editProducts" :content-css="'maxWidth: 1000px'">-->
      <!--<h3 class="text-bold">Edit Products</h3>-->
      <!--<div v-for="product in selectedProps.rows" class="group">-->
      <!--<q-field>-->
        <!--<q-input v-model="product.data.title" type="text" float-label="Product Name"-->
                 <!--:value = "product.data.title" clearable/>-->
      <!--</q-field>-->
        <!--<br>-->
      <!--<q-field>-->
        <!--<q-input v-model="product.data.price_cents" type="number" prefix="$" float-label="Product Price"-->
                 <!--:value = "product.data.price_cents / 100" clearable/>-->
      <!--</q-field>-->
      <!--<q-field>-->
        <!--<q-input v-model="product.data.description" type="text" float-label="Product Description"-->
                 <!--:value = "product.data.description" clearable/>-->
      <!--</q-field>-->
        <!--<br>-->
      <!--&lt;!&ndash;<div v-if="product.data.image">&ndash;&gt;-->
        <!--&lt;!&ndash;<img :src="product.data.image" alt="" height="200px" width="200px">&ndash;&gt;-->
        <!--&lt;!&ndash;<br>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div v-if="product.data.image" class="item">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="item-content">&ndash;&gt;-->
          <!--&lt;!&ndash;<q-btn color="primary" @click="add_product()">Add Product</q-btn>&ndash;&gt;-->
          <!--&lt;!&ndash;<q-btn outline class="negative float-right" @click="reset_temp_product()">Cancel</q-btn>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</div>-->
      <!--&lt;!&ndash;<q-item v-for="product in selectedProps.rows" class="group">&ndash;&gt;-->
        <!--&lt;!&ndash;<q-input v-model="product.data.title"/>&ndash;&gt;-->
        <!--&lt;!&ndash;<q-input v-model="product.data.price_cents"/>&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash;{{product.data.title}}&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;</q-item>&ndash;&gt;-->
    <!--</q-modal>-->

  </div>
</template>

<script>
  import tooltipButton from './tooltipButton.vue'
  import ProductAddModal from '../Onboard/ProductAddModal.vue'
  import CategoryProducts from '../Onboard/StepThree.vue'
  export default {
    data () {
      return {
        saved: false
      }
    },
    computed: {
      productData: {
        get () { return this.$store.state.storeInfo.store.categories }
//        set (value) { this.$store.commit('update_full_store', value) }
      }
    },
    components: {
      CategoryProducts,
      tooltipButton,
      ProductAddModal
    },
    methods: {
      editTitle (props) {
//        props.rows.forEach(row => {
//          row.data.edit = true
//        })
        this.selectedProps = props
        this.$refs.editProducts.open()
      },
      selection (number, rows) {
        console.log(`selected ${number}: ${rows}`)
      }
    }
  }
</script>

<style>
</style>
