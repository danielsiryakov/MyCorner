<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <div class="row justify-center">
      <div class="col-lg-8">
        <h5>Payments are around the corner!</h5>
        ...but first we need some information. <span class="text-bold">It's secure and confidential!</span>
        <!-- your content -->
        <br><br>
        <div class="row sm-gutter">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-field>
              <span class="">First Name:</span>
              <input v-model="legal_entity.Owner.First"
                     type="text"
                     placeholder="Enter your first name"
                     class="formInput"/>
            </q-field>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-field>
              <span class="">Last Name:</span>
              <input v-model="legal_entity.Owner.Last"
                     type="text"
                     placeholder="Enter your last name"
                     class="formInput"/>
            </q-field>
          </div>
        </div>
        <q-field>
          <span class="">Date of birth:</span>
          <cleave class="formInput" v-model="birthday" placeholder="mm/dd/yyyy" :options="{date: true, datePattern: ['m', 'd', 'Y']}"></cleave>
        </q-field>

        <q-field>
          <span class="">Last 4 digits of your SSN:</span>
          <input v-model="legal_entity.last_4_ssn"
                 type="text"
                 placeholder="Enter your personal tax id number"
                 class="formInput"/>
        </q-field>

        <q-field>
          <span class="">Legal Business Name:</span>
          <input v-model="legal_entity.legal_business_name"
                 type="text"
                 placeholder="Enter Legal Business Name"
                 class="formInput"/>
        </q-field>

        <q-field>
          <span class="">Address:</span>
          <vue-google-autocomplete
            id="map"
            ref="addressSearch"
            placeholder="Enter your LEGAL business address"
            v-on:placechanged="getLocation"
            country="usa"
            :enableGeolocation="true"
            class="formInput full-width"
          />
        </q-field>
        <q-field>
          <span class="">Employer Identification Number (EIN):</span>
          <input v-model="legal_entity.business_tax_id"
                 type="text"
                 placeholder="Enter 9 digit Employer Identification Number"
                 class="formInput"/>
        </q-field>
        <q-field>
          <span class="">Enter card information:</span>
          <stripe-card  @gotToken="updateStripe"></stripe-card>
        </q-field>
        <br><br>
        <q-btn color="tertiary" :disabled="enablePayments" big @click="createPayment" outline>Create Payment Options!</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import StripeCard from '../StripeCard.vue'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import Cleave from 'vue-cleave'
  import shop from '../../../api/shop'
  export default {
    components: {
      VueGoogleAutocomplete,
      Cleave,
      StripeCard
    },
    data () {
      return {
        enablePayments: true,
        token: '',
        birthday: '',
        legal_entity: {
          billing_address: {
            name: '',
            city: '',
            line1: '',
            route: '',
            country: '',
            latitude: '',
            longitude: '',
            postal_code: '',
            administrative_area_level_1: ''
          },
          business_tax_id: '',
          legal_business_name: '',
          personal_id: '',
          last_4_ssn: '',
          Owner: {
            First: '',
            Last: '',
            DOB: {
              day: 10,
              month: 10,
              year: 1990
            }
          }
        },
        PlaceResult: ''
      }
    },
    methods: {
      getLocation (addressData, placeResultData) {
        this.legal_entity.billing_address = addressData
        Vue.set(this.legal_entity.billing_address, 'line1', placeResultData.formatted_address)
        Vue.set(this.legal_entity.billing_address, 'city', addressData.locality)
        this.PlaceResult = placeResultData
      },
      updateStripe (value) {
        console.log(value)
        this.token = value
        this.enablePayments = false
      },
      createPayment () {
        let payload = {}
        Vue.set(payload, 'business_type', 'company')
        Vue.set(payload, 'legal_entity', this.legal_entity)
//        payload.business_type = ,
//        payload.legal_entity = this.legal_entity
//        payload.legal_entity.billing_address = this.legal_entity.billing_address
//        payload.legal_entity.Owner = this.legal_entity.Owner
        payload.token = this.token
        payload.store_id = this.selectedStore
//        payload.legal_entity.Owner = this.legal_entity.Owner
        payload.legal_entity.Owner.DOB.month = parseInt(this.birthday.slice(0, 2))
        payload.legal_entity.Owner.DOB.day = parseInt(this.birthday.slice(3, 5))
        payload.legal_entity.Owner.DOB.year = parseInt(this.birthday.slice(6, 10))
        shop.paymentStoreCreate(payload)
      }
    },
    computed: {
      selectedStore: {
        get () { return this.$store.state.storeInfo.selectedStore },
        set (value) { this.$store.commit('update_store_selection', value) }
      }
    }
  }
</script>

<style scoped>
  input[type=text], textarea {
    -webkit-transition: all 0.30s ease-in-out;
    -moz-transition: all 0.30s ease-in-out;
    -ms-transition: all 0.30s ease-in-out;
    -o-transition: all 0.30s ease-in-out;
    outline: none;
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
    border: 1px solid #2f2f2f;
  }

  input[type=text]:focus, textarea:focus {
    /*box-shadow: 0 0 5px #3bc18c;*/
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
    border: 1px solid #3bc18c;
  }
  .formInput {
    -webkit-appearance: none;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: none;
    border-radius: 3px;
    box-shadow: none;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1rem;
    height: 2.285em;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    line-height: 1.5;
    padding-left: .75em;
    padding-right: .75em;
    position: relative;
    vertical-align: top;
    background-color: #fff;
    border: 1px solid #40dba1;
    color: #363636;
    box-shadow: inset 0 1px 2px rgba(10,10,10,.1);
    max-width: 100%;
    width: 100%;
  }
  formInput:focus {
    border: 1px solid #40dba1;
  }
</style>
