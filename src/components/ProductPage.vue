<template>
  <div class="">
    <!--<h4 class="text-bold text-tertiary">{{ product.title }}</h4>-->
    <h5 class="text-bold text-tertiary">{{ product.label }}</h5>
    <span v-if="productDetails">Size: {{productDetails.size}}</span>
    <br>

    <div class="row justify-center">
      <img :src="product.image" style="width: 30vh; height: 30vh">
    </div>
    <div class="row justify-center">
      <h5 class="text-grey"><small>{{mutation.quantity}}x &nbsp</small></h5>
      <h5 class="text-primary">${{ product.price_cents / 100 }} &nbsp</h5><h5>= ${{ total }}</h5>
    </div>
    <div class="product-details group">
      <div class="row no-wrap group justify-center">
        <q-btn icon="remove" big outline @click="offset(-1)"></q-btn>
        <q-input align="center" :min="1" v-model="displayQuantity" type="number"/>
        <q-btn icon="add" outline @click="offset(1)"/>
      </div>
      <q-btn color="primary full-width" class="block" @click="addItem">Add</q-btn>
      <hr>
      <!--{{productDetails.nutrition}}-->
      <div class="row no-wrap group desktop-only">
        <div v-if="productDetails">
          <section class="performance-facts">
            <header class="performance-facts__header">
              <h1 class="performance-facts__title">Nutrition Facts</h1>
              <p>Serving Size {{productDetails.nutrition.serving_size}}
              <p>Serving Per Container {{productDetails.nutrition.servings_per_container}}</p>
            </header>
            <table class="q-table performance-facts__table">
              <thead class="">
              <tr>
                <th colspan="3" class="small-info text-right">
                  Amount Per Serving
                  <hr>
                </th>
              </tr>
              </thead>
              <tbody style="margin: 0px">
              <tr style="border-bottom: solid 3px">
                <th colspan="3" class="text-left full-wdith" style="border-bottom: solid 5px">
                  <b>Calories</b>
                  {{productDetails.nutrition.calories}}
                </th>
              </tr>
              <tr class="thick-row">
                <td colspan="3" class="small-info text-right">
                  <b>% Daily Value*</b>
                </td>
              </tr>
              <tr v-for="(fact, key) in productDetails.nutrition.nutrients">
                <th colspan="2" class="text-left">
                  <b>{{ fact.label }}</b>
                  {{ fact.total }}
                </th>
                <td class="text-right">
                  <b>{{ fact.pct_daily_value }}</b>
                </td>
              </tr>
              </tbody>
            </table>
          </section>
        </div>
        <div>
          <div v-for="(detail, key) in productDetails.details">
            <span class="text-bold">{{ detail.header }}:</span> {{ detail.body }}
          </div>
        </div>
      </div>
      <div class="row no-margin group mobile-only">
        <div v-if="productDetails">
          <section class="performance-facts">
            <header class="performance-facts__header">
              <h1 class="performance-facts__title">Nutrition Facts</h1>
              <p>Serving Size {{productDetails.nutrition.serving_size}}
              <p>Serving Per Container {{productDetails.nutrition.servings_per_container}}</p>
            </header>
            <table class="q-table performance-facts__table">
              <thead class="">
              <tr>
                <th colspan="3" class="small-info text-right">
                  Amount Per Serving
                  <hr>
                </th>
              </tr>
              </thead>
              <tbody style="margin: 0px">
              <tr style="border-bottom: solid 3px">
                <th colspan="3" class="text-left full-wdith" style="border-bottom: solid 5px">
                  <b>Calories</b>
                  {{productDetails.nutrition.calories}}
                </th>
              </tr>
              <tr class="thick-row">
                <td colspan="3" class="small-info text-right">
                  <b>% Daily Value*</b>
                </td>
              </tr>
              <tr v-for="(fact, key) in productDetails.nutrition.nutrients">
                <th colspan="2" class="text-left">
                  <b>{{ fact.label }}</b>
                  {{ fact.total }}
                </th>
                <td class="text-right">
                  <b>{{ fact.pct_daily_value }}</b>
                </td>
              </tr>
              </tbody>
            </table>
          </section>
        </div>
        <div>
          <div v-for="(detail, key) in productDetails.details">
            <span class="text-bold">{{ detail.header }}:</span> {{ detail.body }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    mounted () {
//      this.getAllProducts()
    },
    props: ['product', 'quantityProp', 'productDetails'],
    computed: {
      ...mapGetters([
        'allProducts'
      ]),
//      product () {
//        let id = parseInt(this.$route.params.id)
//        return this.allProducts.find((p) => p.id === id) || {}
//      },
      total: function () {
        return (this.mutation.quantity * this.product.price_cents / 100)
      },
      displayQuantity: function () {
        if (this.mutation.name !== this.product.title) {
          this.mutation.name = this.product.title
          if (this.quantityProp) {
            this.mutation.quantity = this.quantityProp
          }
          else {
            this.mutation.quantity = 1
          }
        }
        return this.mutation.quantity
      }
    },
    methods: {
      ...mapActions([
        'getAllProducts',
        'addToCart'
      ]),
      ...mapMutations([
        'add_to_cart'
      ]),
      offset (num) {
        if (this.mutation.quantity + num > 0) {
          this.mutation.quantity = this.mutation.quantity + num
        }
      },
      addItem () {
        this.addToCart({
          asset_id: this.product.asset_id,
          title: this.product.title,
          image: this.product.image,
          price_cents: this.product.price_cents,
          quantity: this.mutation.quantity,
          store_id: this.product.store_id,
          product_id: this.product.product_id
        })
        this.$emit('added')
      }
    },
    data () {
      return {
        quantity: 1,
        mutation: {
          name: '',
          quantity: 1
        }
      }
    }
  }
</script>

<style scoped>
.product-item {
  margin: 10px 10px;
  width: 500px;
  height: 400px;
  border-bottom: 1px solid #aaa;
}
.back-link {
  font-size: 20px;
}
.product-title {
  padding-top: 120px;
  text-align: center;
  margin: 0 auto;
  font-size: 26px;
}
.product-details {
  margin-top: 20px;
}
.inventory {
  float: left;
  font-size: 20px;
  margin-top: 15px;
}
.add-button {
  float: right;
  width: 140px;
  height: 50px;
}
.q-if {
   margin-top: 0px;
   margin-bottom: 0px;
}
.image {
  width: 250px;
  float: left;
  margin: 20px;
}
body {
  font-size: small;
  line-height: 1.4;
}
p {
  margin: 0;
}

.performance-facts {
  border: 1px solid black;
  margin: 0px;
  float: left;
  width: 280px;
  padding: 0.5rem;
table {
  border-collapse: collapse;
}
}
.performance-facts__title {
  font-weight: bold;
  font-size: 2rem;
  margin: 0 0 0.25rem 0;
}
.performance-facts__header {
  border-bottom: 10px solid black;
  padding: 0 0 0.25rem 0;
  margin: 0 0 0.5rem 0;
p {
  margin: 0;
}
}
.performance-facts__table {
  width: 100%;
thead tr {
th, td {
  border: 0;
}
}
th, td {
  font-weight: normal;
  text-align: left;
  padding: 0.25rem 0;
  border-top: 1px solid black;
  white-space: nowrap;
}
td {
&:last-child {
   text-align: right;
 }
}
.blank-cell {
  width: 1rem;
  border-top: 0;
}
.thick-row {
th, td {
  border-top-width: 5px;
}
}
}
.small-info {
  font-size: 0.7rem;
}

.performance-facts__table--small {
@extend .performance-facts__table;
  border-bottom: 1px solid #999;
  margin: 0 0 0.5rem 0;
thead {
tr {
  border-bottom: 1px solid black;
}
}
td {
&:last-child {
   text-align: left;
 }
}
th, td {
  border: 0;
  padding: 0;
}
}

.performance-facts__table--grid {
@extend .performance-facts__table;
  margin: 0 0 0.5rem 0;
td {
&:last-child {
   text-align: left;
&::before {
   content: "•";
   font-weight: bold;
   margin: 0 0.25rem 0 0;
 }
}
}
}

.text-center {
  text-align: center;
}
.thick-end {
  border-bottom: 10px solid black;
}
.thin-end {
  border-bottom: 1px solid black;
}
</style>
