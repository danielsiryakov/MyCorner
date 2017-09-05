<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <div v-if="completedCarts.length > 0">
      <q-item v-for="(order, key) in completedCarts" :key="key" @click="reorderItems(order)">
        <q-item-side>
          <span class="text-bold">{{ order.store_name }}</span><br>
          <small>{{ formatTimeStamp(order.last_updated) }}</small>
        </q-item-side>
        <q-item-main></q-item-main>
        <q-item-side>{{ formattedPrice(order.totals.total) }}</q-item-side>
      </q-item>
    </div>
    <div v-if="completedCarts.length === 0">
      No orders to show :/ order some products...they are good, we promise :)
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import shop from '../../api/shop'
  import { date, Dialog } from 'quasar'
  export default {
    data () {
      return {
        targetOrder: '',
        activeCartId: ''
      }
    },
    computed: {
      completedCarts: {
        get () { return this.$store.state.userInfo.completedCarts }
      },
      ...mapGetters({
        carts: 'cartProducts'
      })
    },
    methods: {
      ...mapActions([
        'reactivatePastCart'
      ]),
      formatTimeStamp (timeStamp) {
        return date.formatDate(timeStamp, 'MM/DD/YYYY HH:mmA')
      },
      formattedPrice (itemTotal) {
        return (itemTotal / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
      },
      isCartActive (storeID) {
        console.log('entered is active')
        let isActive = false
        this.carts.forEach(cart => {
          if (cart.store_id === storeID) {
            console.log(cart.store_id)
            console.log(storeID)
            this.activeCartId = cart.id
            isActive = true
            console.log('is active should be true ' + isActive)
          }
        })
        console.log(isActive)
        return isActive
      },
      reorderItems (order) {
        this.targetOrder = order.id
        console.log('reorderItems: ' + order.store_id)
        if (!this.isCartActive(order.store_id)) {
          Dialog.create({
            title: 'The usual stuff you love',
            message: 'Do you want to reorder from ' + order.store_name + '?',
            buttons: [
              {
                color: 'negative',
                label: 'Cancel',
                handler () {
                }
              },
              {
                color: 'primary',
                label: 'Yes!',
                handler: () => {
                  console.log(this.targetOrder)
                  this.reactivatePastCart(this.targetOrder)
                  this.$emit('reordered')
                }
              }
            ]
          })
        }
        else {
          Dialog.create({
            title: 'The usual stuff you love',
            message: 'This will replace your cart. Do you want to abandon your current cart?',
            buttons: [
              {
                color: 'negative',
                label: 'Cancel',
                handler () {
                }
              },
              {
                color: 'primary',
                label: 'Yes!',
                handler: () => {
                  console.log(this.targetOrder)
                  shop.cartAbandon(this.activeCartId).then(() => {
                    this.reactivatePastCart(this.targetOrder)
                    this.$emit('reordered')
                  })
                }
              }
            ]
          })
        }
      }
    }
  }
</script>

<style>
</style>
