<template>
  <div class="">
    <!--<h4 class="text-bold text-tertiary">{{ product.title }}</h4>-->
    <h5 class="text-bold text-tertiary">{{ product.title }}</h5>
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
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    mounted () {
//      this.getAllProducts()
    },
    props: ['product', 'quantityProp'],
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
</style>
