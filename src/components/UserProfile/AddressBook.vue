<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <q-item  class="group" v-for="address in addressBook" :key="address.id">
      <span class="text-bold" style="padding-right: 10px">{{address.name}}: </span> {{address.line1}}
      <q-chip v-if="address.default" small color="amber-9">default</q-chip>
      <q-item-side right color="primary">
        <q-icon name="edit" @click="editAddress(address)"/>
        <q-icon color="negative" name="delete" @click="removeAddress(address.address_id)"/>
      </q-item-side>
    </q-item>
    <q-modal ref="addressDisplay" class="minimized" :content-css="{padding: '20px', maxWidth: '500px', maxHeight: '300px'}">
      <h4 class="text-bold text-tertiary">Make this Your default address?</h4>
      <span class="text-bold">{{ selectedAddress.line1 }}</span><br><br>
      <div class="group">
        <q-btn color="primary" @click="makeDefault">Make Default</q-btn>
        <q-btn outline color="tertiary" @click="this.$refs.addressDisplay.close()">Cancel</q-btn>
      </div>
      <!--<address-edit :address="selectedAddress"></address-edit>-->
    </q-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import shop from '../../api/shop'
  export default {
    data () {
      return {
        selectedAddress: {}
      }
    },
    methods: {
      ...mapActions([
        'getUserInfo',
        'getAddressBook'
      ]),
      editAddress (address) {
        this.selectedAddress = address
        this.$refs.addressDisplay.open()
      },
      makeDefault () {
        shop.changeDefaultAddress(this.selectedAddress.address_id)
        this.$refs.addressDisplay.close()
        this.getUserInfo()
        this.rerender()
      },
      removeAddress (id) {
        shop.removeAddressByID(id).then(() => {
          this.getAddressBook()
        })
        this.rerender()
      },
      rerender () {
        this.show = false
        this.$nextTick(() => {
          this.show = true
          console.log('re-render start')
          this.$nextTick(() => {
            console.log('re-render end')
          })
        })
      }
    },
    computed: {
      addressBook: {
        get () { return this.$store.state.userInfo.address_book }
      }
    }
  }
</script>

<style>
</style>
