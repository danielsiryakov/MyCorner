<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h4>Review Store Details</h4>
    <q-list v-if="selectedStore">
      <q-item>
        <q-item-main>
          <q-field label="Business Name" class="">
            <q-input dark v-model="fullStoreInfo.name" color="primary"/>
          </q-field>
        </q-item-main>
      </q-item>

      <q-item>
        <q-item-main>
          <q-field label="Phone Number">
            <q-input dark v-model="fullStoreInfo.phone" color="primary"/>
          </q-field>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-field label="Business Address">
            <q-input dark v-model="fullStoreInfo.address['postal_code']" color="primary"/>
          </q-field>
        </q-item-main>
      </q-item>

    </q-list>

    <!-- your content -->
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import StepTwo from './Onboard/StepTwo.vue'
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
      ])
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
        get () { return this.$store.state.storeInfo.dashboardStore }
//        set (value) { this.$store.commit('update_full_store', value) }
      },
      selectedStore: {
        get () { return this.$store.state.storeInfo.selectedStore }
      }
    },
    mounted () {
    }
  }
</script>

<style>
</style>
