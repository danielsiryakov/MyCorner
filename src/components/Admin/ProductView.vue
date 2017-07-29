<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="">
    <!-- your content -->
    <q-data-table
      v-for="(categories, key) in productData" :key="key"
      :data="productData[key].products"
      class="text-dark bg-light"
      :config="{
          title: categories.name,
          noHeader: false,
          columnPicker: true,
          leftStickyColumns: 0,
          rightStickyColumns: 2,
          bodyStyle: {
            maxHeight: '500px'
          },
          rowHeight: '50px',
          responsive: true,
          pagination: {
            rowsPerPage: 15,
            options: [5, 10, 15, 30, 50, 500]
          },
          selection: 'multiple'
        }"
      :columns="columns"
      @selection="selection"
      @refresh="false"
    >
      <template slot="col-title" scope="cell">
        <span class="light-paragraph">{{cell.data}}</span>
        <q-input class="light-paragraph" v-model="cell.data" v-if="cell.row.edit"/>
      </template>
      <template slot="col-price_cents" scope="cell">
        <span class="light-paragraph text-black">${{cell.data/100}}</span>
      </template>
      <template slot="col-asset_id" scope="cell">
        <span class="light-paragraph text-black">{{cell.data}}</span>
      </template>

      <template slot="col-image" scope="cell">
        <tooltip-button :url="cell.data"></tooltip-button>
      </template>

      <template slot="selection" scope="props">
        <q-btn flat color="primary" @click="editTitle(props)">
          <q-icon name="edit" />
          Edit
        </q-btn>
        <q-btn flat color="primary" @click="deleteRow(props)">
          <q-icon name="delete" />
          Delete
        </q-btn>
      </template>
    </q-data-table>

    <q-modal ref="editProducts" :content-css="'maxWidth: 1000px'">
      <h3 class="text-bold">Edit Products</h3>
      <div v-for="product in selectedProps.rows" class="group">
      <q-field>
        <q-input v-model="product.data.title" type="text" float-label="Product Name"
                 :value = "product.data.title" clearable/>
      </q-field>
        <br>
      <q-field>
        <q-input v-model="product.data.price_cents" type="number" prefix="$" float-label="Product Price"
                 :value = "product.data.price_cents / 100" clearable/>
      </q-field>
      <q-field>
        <q-input v-model="product.data.description" type="text" float-label="Product Description"
                 :value = "product.data.description" clearable/>
      </q-field>
        <br>
      <!--<div v-if="product.data.image">-->
        <!--<img :src="product.data.image" alt="" height="200px" width="200px">-->
        <!--<br>-->
      <!--</div>-->
      <!--<div v-if="product.data.image" class="item">-->
        <!--<div class="item-content">-->
          <!--<q-btn color="primary" @click="add_product()">Add Product</q-btn>-->
          <!--<q-btn outline class="negative float-right" @click="reset_temp_product()">Cancel</q-btn>-->
        <!--</div>-->
      <!--</div>-->
      </div>
      <!--<q-item v-for="product in selectedProps.rows" class="group">-->
        <!--<q-input v-model="product.data.title"/>-->
        <!--<q-input v-model="product.data.price_cents"/>-->
        <!--&lt;!&ndash;{{product.data.title}}&ndash;&gt;-->
      <!--</q-item>-->
    </q-modal>

  </div>
</template>

<script>
  import table from './table.json'
  import tooltipButton from './tooltipButton.vue'
  import ProductAddModal from './Onboard/ProductAddModal.vue'
  export default {
    data () {
      return {
        selectedProps: '',
        table: table,
        columns: [
          {
            label: 'Title',
            field: 'title',
            width: '140px',
            classes: 'text-black',
            filter: true,
            sort (a, b) {
              return (new Date(a)) - (new Date(b))
            },
            format (value) {
//              return new Date(value).toLocaleString()
            }
          },
          {
            label: 'Price',
            field: 'price_cents',
            format (value) {
              return '$' + value / 100
            },
            width: '40px'
          },
          {
            label: 'ID',
            field: 'asset_id',
            width: '80px',
            sort: true,
            type: 'string'
          },
          {
            label: 'Image',
            field: 'image',
            width: '70px'
          }]
      }
    },
    computed: {
      productData: {
        get () { return this.$store.state.storeInfo.dashboardStore.categories }
//        set (value) { this.$store.commit('update_full_store', value) }
      }
    },
    components: {
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
