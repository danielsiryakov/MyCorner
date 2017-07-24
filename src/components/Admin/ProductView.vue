<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <q-data-table
      :data="table"
      class="text-white"
      :config="config"
      :columns="columns"
      @refresh="refresh"
    >
      <template slot="col-title" scope="cell">
        <span class="light-paragraph">{{cell.data}}</span>
      </template>
      <template slot="col-price_cents" scope="cell">
        <span class="light-paragraph text-black">{{cell.data}}</span>
      </template>
      <template slot="col-asset_id" scope="cell">
        <span class="light-paragraph text-black">{{cell.data}}</span>
      </template>

      <template slot="col-image" scope="cell">
        <tooltip-button :url="cell.data"></tooltip-button>
      </template>
    </q-data-table>
  </div>
</template>

<script>
  import table from './table.json'
  import tooltipButton from './tooltipButton.vue'
  export default {
    data () {
      return {
        table: table,
        config: {
          title: 'Store Products',
          refresh: true,
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
        },
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
        get () { return this.$store.state.storeInfo.dashboardStore }
//        set (value) { this.$store.commit('update_full_store', value) }
      }
    },
    components: {
      tooltipButton
    }
  }
</script>

<style>
</style>
