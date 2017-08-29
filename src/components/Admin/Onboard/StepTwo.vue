<!--suppress ALL -->
<template>
  <div class="layout-padding">
    <div class="row sm-gutter">
      <div class="col-12">
        <q-field icon="business">
          <q-input v-model="name" type="text" float-label="Enter Business Name" :value = "name" clearable/>
        </q-field>
        <q-field icon="mail">
          <q-input v-model="email" type="email" float-label="Enter Email for Notifications" :value = "email" clearable/>
        </q-field>
      </div>
      <div class="col-12">
        <q-field icon="location_on">
          <vue-google-autocomplete
            id="map"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            country="usa"
            :enableGeolocation="true"
            class="search"
          >
          </vue-google-autocomplete>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-field icon="phone" >
          <q-input v-model="phoneNumber" type="tel" float-label="Enter Business Phone #"
                   clearable/>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-field icon="description" >
          <q-input v-model="description" type="text" float-label="Enter Store Description" clearable/>
        </q-field>
      </div>
      <div class="col-12">
        <q-field icon="image">
          <div v-if="!storeImage">
            <div class="dropzone-area"
                 drag-over="handleDragOver"
                 @dragenter="this.hovering=true"
                 @dragleave="this.hovering=false"
                 :class="{'hovered': this.hovering}">
              <div class="dropzone-text">
                <span class="dropzone-title">
                  Drop an image of your store here or click to select
                </span>
              </div>
              <input type="file" @change="onFileChange">
            </div>
          </div>
          <div class="dropzone-preview" v-if="storeImage">
            <img :src="storeImage">
            <q-btn @click="removeImage" flat color="tertiary">Remove</q-btn>
          </div>
        </q-field>
      </div>
      <div class="col-12 group">
        <q-field icon="access_time">
          <div class="group" v-for="(day_hours,day) in working_hours" :key="day">
            <span class="text-tertiary text-bold">{{ capitalizeFirstLetter(day) }}:</span><br>
            <q-datetime-range @change="update_working_hours(working_hours)"
                              color="primary"
                              inverted
                              v-model="day_hours.hours"
                              type="time"
                              class="full-width" />
          </div>
        </q-field>
      </div>
      <q-field icon="info">
        <span class="text-bold">Additional Information </span><br><br>
        <div class="group">
          <q-toggle label="Pickup Offered?" v-model="pickUpOffered"></q-toggle>
          <q-toggle label="Delivery Offered?" v-model="deliveryOffered"></q-toggle>
        </div>
      </q-field>
    </div>
    <br>
    <div class="row">
      <q-field
          helper="Touch to select # of pickup item"
          v-if="pickUpOffered"
          class="full-width"
      >
        <span class="text-bold"># of pickup items:</span><br><br>
        <q-range class="text-tertiary "
                 v-model="pickUpItems"
                 :min="1"
                 :max="100"
                 label-always
                 :left-label-value="`${pickUpItems.min}`"
                 :right-label-value="`${pickUpItems.max}`"/>
      </q-field>
    </div>
    <div class="row md-gutter" v-if="deliveryOffered">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-field>
          <span class="text-bold">Delivery Fee:</span>
          <q-input v-model="deliveryFee"
                 type="number"
                 prefix="$"
                 placeholder="Enter your delivery fee amount"
          />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-field>
          <span class="text-bold">Minimum $ min for delivery:</span>
          <q-input v-model="deliveryMinimum"
                 type="number"
                 prefix="$"
                 placeholder="Enter the minimum amount needed for delivery"
          />
        </q-field>
      </div>
    </div>
    <br>
    <div class="">
      <q-field
        helper="Touch to select min delivery time"
        v-if="deliveryOffered"
      >
        <span class="text-bold">Minimum Time for Delivery:</span>
        <q-slider class="text-tertiary" v-model="minDeliveryTime" :min="0" :max="200" label-always
                  :label-value="`${minDeliveryTime} min`"
        />
      </q-field>
    </div>
  </div>
</template>

<script>
//  import {required, email, minLength} from 'vuelidate/lib/validators'
  import Cleave from 'vue-cleave'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import {
    QBtn,
    QIcon,
    QInput,
    QField,
    QDatetimeRange,
    QKnob,
    QSlider,
    date
  } from 'quasar'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        address2: '',
//        working_hours: {
//          monday: {
//            hours: {
//              from: '2017-06-29T09:00:00.000-04:00',
//              to: '2017-06-29T17:00:00.000-04:00'
//            },
//            open: true
//          },
//          tuesday: {
//            hours: {
//              from: '2017-06-29T09:00:00.000-04:00',
//              to: '2017-06-29T17:00:00.000-04:00'
//            },
//            open: true
//          },
//          wednesday: {
//            hours: {
//              from: '2017-06-29T09:00:00.000-04:00',
//              to: '2017-06-29T17:00:00.000-04:00'
//            },
//            open: true
//          },
//          thursday: {
//            hours: {
//              from: '2017-06-29T09:00:00.000-04:00',
//              to: '2017-06-29T17:00:00.000-04:00'
//            },
//            open: true
//          },
//          friday: {
//            hours: {
//              from: '2017-06-29T09:00:00.000-04:00',
//              to: '2017-06-29T17:00:00.000-04:00'
//            },
//            open: true
//          },
//          saturday: {
//            hours: {
//              from: '2017-06-29T09:00:00.000-04:00',
//              to: '2017-06-29T17:00:00.000-04:00'
//            },
//            open: true
//          },
//          sunday: {
//            hours: {
//              from: '2017-06-29T09:00:00.000-04:00',
//              to: '2017-06-29T17:00:00.000-04:00'
//            },
//            open: true
//          }
//        },
        hovering: false,
        pickUpChecked: false,
        deliveryChecked: false,
        cleaveOptions: {
          phone: true,
          phoneRegionCode: 'US'
        }
      }
    },
    components: {
      Cleave,
      VueGoogleAutocomplete,
//      VueTimepicker,
      QBtn,
      QIcon,
      QInput,
      QField,
      QKnob,
      QDatetimeRange,
      QSlider
    },
    methods: {
      ...mapActions([
        'onFileChange',
        'removeImage',
        'setName'
      ]),
      ...mapMutations([
        'update_user',
        'update_working_hours'
      ]),
      getAddressData: function (addressData, placeResultData) {
        this.address2 = addressData
        this.address2['line1'] = placeResultData.formatted_address
        this.address = this.address2
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
    },
    computed: {
      ...mapGetters({
        storeImage: 'storeImage'
      }),
      name: {
        get () { return this.$store.state.storeInfo.store.name },
        set (value) { this.$store.commit('update_store', {name: value}) }
      },
      email: {
        get () { return this.$store.state.storeInfo.store.email },
        set (value) { this.$store.commit('update_store', {email: value}) }
      },
      address: {
        get () { return this.$store.state.storeInfo.store.address },
        set (value) { this.$store.commit('update_store', {address: value}) }
      },
      description: {
        get () { return this.$store.state.storeInfo.store.short_description },
        set (value) { this.$store.commit('update_store', {short_description: value}) }
      },
      phoneNumber: {
        get () { return this.$store.state.storeInfo.store.phone },
        set (value) { this.$store.commit('update_store', {phone: value}) }
      },
      pickUpOffered: {
        get () { return this.$store.state.storeInfo.store.pickup.offered },
        set (value) { this.$store.commit('update_pickup', {offered: value}) }
      },
      pickUpMinTime: {
        get () { return this.$store.state.storeInfo.store.pickup.minimum_time_to_pickup },
        set (value) { this.$store.commit('update_pickup', {minimum_time_to_pickup: value}) }
      },
      deliveryOffered: {
        get () { return this.$store.state.storeInfo.store.delivery.service_offered },
        set (value) { this.$store.commit('update_delivery', {service_offered: value}) }
      },
      deliveryFee: {
        get () { return this.$store.state.storeInfo.store.delivery.delivery_fee / 100 },
        set (value) { this.$store.commit('update_delivery', {delivery_fee: value * 100}) }
      },
      deliveryMinimum: {
        get () { return this.$store.state.storeInfo.store.delivery.delivery_minimum / 100 },
        set (value) { this.$store.commit('update_delivery', {delivery_minimum: value * 100}) }
      },
      minDeliveryTime: {
        get () { return this.$store.state.storeInfo.store.delivery.minimum_time_to_delivery },
        set (value) { this.$store.commit('update_delivery', {minimum_time_to_delivery: value}) }
      },
      pickUpItems: {
        get () { return this.$store.state.storeInfo.store.pickup.pickup_items },
        set (value) { this.$store.commit('update_pickup', {pickup_items: value}) }
      },
      working_hours: {
        get () {
          let wh = this.$store.state.storeInfo.store.working_hours
          let wh2 = {}
          let fromH = ''
          let toH = ''
          Object.keys(wh).forEach(day => {
            wh2[day] = wh[day]
            wh2[day].open = wh[day].open
            wh2[day].hours = wh[day].hours
            wh2[day].hours.from = wh[day].hours.from
            wh2[day].hours.to = wh[day].hours.to
            if (typeof wh[day].hours.from === 'number') {
              fromH = wh[day].hours.from / 100
              wh2[day].hours.from = date.buildDate({ hours: Math.floor(fromH), minutes: (fromH - Math.floor(fromH)) * 100 })
            }
            if (typeof wh[day].hours.to === 'number') {
              toH = wh[day].hours.to / 100
              wh2[day].hours.to = date.buildDate({ hours: Math.floor(toH), minutes: (toH - Math.floor(toH)) * 100 })
            }
          })
          return wh2
        },
//          return this.$store.state.storeInfo.store.working_hours },
        set (value) { this.$store.commit('update_working_hours', value) }
      }
    }
  }
</script>

<style >
  .q-datetime-range.row .q-datetime-range-right {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin: 10px !important;
  }
  .q-datetime-range.row .q-datetime-range-left {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin: 10px !important;
  }
  .search {
    width: 100%;
    border: 0;
    outline: 0;
    padding: 0;
    color: #040404;
    background: transparent;
    min-height: 18px;
    font-size: inherit;
    overflow: hidden;
    resize: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 0.5px solid;
    border-color: #CBCBCB;
  }
  .time-picker {
    font-family: Roboto !important;
  }
  .dropzone-area {
    width: 100% !important;
    height: 100px !important;
    position: relative;
    border: 2px dashed #CBCBCB;
    &.hovered {
       border: 2px dashed #2E94C4;
      .dropzone-title {
        color: #1975A0;
      }
    }
  }

  .dropzone-area input {
    position: absolute;
    cursor: pointer;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .dropzone-text {
    position: absolute;
    top: 50%;
    text-align: center;
    transform: translate(0, -50%);
    width: 100%;
    span {
      display: block;
      font-family: Arial, Helvetica;
      line-height: 1.9;
    }
  }

  .dropzone-title {
    font-size: 13px;
    color: #787878;
    letter-spacing: 0.4px;
  }
  .dropzone-info {
    font-size: 13px;
    font-size: 0.8125rem;
    color: #A8A8A8;
    letter-spacing: 0.4px;
  }

  .dropzone-button {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
  }

  .dropzone-preview {
    width: 80% !important;
    position: relative;
    &:hover .dropzone-button {
       display: block;
     }
    img {
      display: block;
      height: auto;
      max-width: 100%;
    }
  }

  div.timeline-content{
    margin-left: 0px;
  }
</style>
