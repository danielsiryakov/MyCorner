<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h4>Review Store Details</h4>
    <q-btn big @click="updateStore" outline>Save Changes</q-btn>
    <step-two></step-two>
    <q-btn big @click="updateStore" outline>Save Changes</q-btn>

  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import shop from '../../../api/shop'
  import StepTwo from '../Onboard/StepTwo.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      StepTwo
    },
    methods: {
      ...mapActions([
        'getFullStoreInfo'
      ]),
      updateStore () {
        shop.updateStoreInfo(this.updatedStore)
      }
    },
    computed: {
      storeID: function () {
        console.log(Object.keys(this.$store.state.userInfo.info.user_roles.Access))
        return Object.keys(this.$store.state.userInfo.info.user_roles.Access)
      },
      storeSelect: function () {
        let selectOptions = []
        for (var i = 0; i < this.storeID.length; i++) {
          selectOptions.push({
            label: this.storeID[i],
            value: this.storeID[i]
          })
        }
        return selectOptions
      },
      fullStoreInfo: {
        get () { return this.$store.state.storeInfo.store }
//        set (value) { this.$store.commit('update_full_store', value) }
      },
      selectedStore: {
        get () { return this.$store.state.storeInfo.selectedStore }
      },
      updatedStore: {
        get () { return this.$store.state.storeInfo.store }
      }
    },
    mounted () {
    }
  }
</script>

<style>
</style>
