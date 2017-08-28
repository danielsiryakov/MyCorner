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
        <q-item-side>${{ order.totals.total/100 }}</q-item-side>
      </q-item>
    </div>
    <div v-if="completedCarts.length === 0">
      No orders to show :/ order some products...they are good, we promise :)
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { date, Dialog } from 'quasar'
  export default {
    data () {
      return {
        targetOrder: ''
      }
    },
    computed: {
      completedCarts: {
        get () { return this.$store.state.userInfo.completedCarts }
      }
    },
    methods: {
      ...mapActions([
        'reactivatePastCart'
      ]),
      formatTimeStamp (timeStamp) {
        return date.formatDate(timeStamp, 'MM/DD/YYYY HH:mmA')
      },
      reorderItems (order) {
        this.targetOrder = order.id
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
    }
  }
</script>

<style>
</style>
