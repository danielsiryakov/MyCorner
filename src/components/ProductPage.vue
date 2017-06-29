<template>
  <div class="">
    <!--<h4 class="text-bold text-tertiary">{{ product.title }}</h4>-->
    <h4 class="text-bold text-tertiary">{{ product.fields.gtin_nm }}</h4>
    <img :src="product.fields.gtin_img" style="width: 150px; height: 150px">
    <br><br>
    <div class="row">
      <h6>{{number}}x &nbsp</h6>
      <h6 class="text-primary">${{ product.display_price }} &nbsp</h6><h6>= ${{ total }}</h6>
    </div>
    <div class="product-details group">
      <q-numeric
        v-model="number"
        :min="0"
        :max="20"
        class="full-width text-primary bg-tertiary"
      ></q-numeric>
      <br>
      <div class="row group">
        <button class="primary full-width" @click="addToCart(product)">Add</button>
      </div>
    </div>
  </div>
</template>

<!--this.new_product = {-->
<!--title: '',-->
<!--images: [], // leaving at top level for now (which means variants cant have imgs)-->
<!--category: '', // ? just one or list of cats it falls in (tempted to say list)-->
<!--keywords: [],-->
<!--add_to_category: false,-->
<!--checked: false,-->
<!--long_description: '',-->
<!--short_description: '',-->
<!--dislplay_price: '' // different for variants but top level for product list-->
<!--}-->
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    mounted () {
      this.getAllProducts()
    },
    props: ['product'],
    computed: {
      ...mapGetters([
        'allProducts'
      ]),
//      product () {
//        let id = parseInt(this.$route.params.id)
//        return this.allProducts.find((p) => p.id === id) || {}
//      },
      total: function () {
        return (this.number * this.product.display_price)
      }
    },
    methods: {
      ...mapActions([
        'getAllProducts',
        'addToCart'
      ])
    },
    data () {
      return {
        number: 0
      }
    }
  }
</script>

<style>
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
  margin-top: 60px;
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
.q-numeric input {
  color: #2ab982;
}
</style>
