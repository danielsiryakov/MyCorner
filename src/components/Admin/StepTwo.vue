<!--suppress ALL -->
<template>
  <div>
    <div class="list bg-inverted-light">
      <!--<q-input v-model="password" float-label="Minimum 5 characters password" inverted color="amber" type="password"  />-->

      <q-field icon="business">
        <q-input v-model="name" type="text" float-label="Enter Business Name" @input="$v.StepTwoForm.businessname.$touch()"
           :value = "name"
           :after="[{icon: 'done', condition: name.length >= 1, handler () {}}]" clearable/>
      </q-field>


      <!--<q-field icon="location_on" :error="error2" error-label="We got an error">-->
        <!--&lt;!&ndash;:value = "name" clearable&ndash;&gt;-->
        <!--&lt;!&ndash;:after="[{icon: 'done', condition: name.length >= 1, handler () {}}]"/>&ndash;&gt;-->
        <!--&lt;!&ndash;<vue-google-autocomplete&ndash;&gt;-->
          <!--&lt;!&ndash;id="map"&ndash;&gt;-->
          <!--&lt;!&ndash;placeholder="Please type your address"&ndash;&gt;-->
          <!--&lt;!&ndash;v-on:placechanged="getAddressData"&ndash;&gt;-->
          <!--&lt;!&ndash;country="usa"&ndash;&gt;-->
          <!--&lt;!&ndash;:enableGeolocation="true"&ndash;&gt;-->
          <!--&lt;!&ndash;@input="$v.StepTwoForm.address.$touch()"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;&ndash;&gt;-->

        <!--&lt;!&ndash;</vue-google-autocomplete>&ndash;&gt;-->
        <!--<q-input id="map" v-model="StepTwoForm.address" v-gmaps-searchbox="StepTwoForm" float-label="Enter Business Address" @input="$v.StepTwoForm.businessname.$touch()">-->
        <!--<q-autocomplete @search="search" @selected="selected" />-->
        <!--</q-input>-->
      <!--</q-field>-->
      <q-field icon="phone" >
        <q-input v-model="phoneNumber" type="tel" float-label="Enter Business Phone #"
                  clearable
                 :after="[{icon: 'done', condition: phoneNumber.length >= 10, handler () {}}]"/>
      </q-field>
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
          <button @click="removeImage" class="outline tertiary small">Remove</button>
        </div>
      </q-field>

      <q-field icon="description" >
        <q-input v-model="description" type="text" float-label="Enter Store Description" clearable/>
      </q-field>

      <q-field icon="access_time" >
          <div v-for="(day_hours,day) in StepTwoForm.working_hours" >
            <span class="text-primary">{{ day }}:</span><br>
            <q-datetime-range @change="update_working_hours(StepTwoForm.working_hours)" color="primary" v-model="day_hours.hours" type="time" class="full-width" />
           </div>
      </q-field>

      <q-field icon="info" >
        <span class="text-bold">Additional Information </span><br><br>
        Pickup Offered?
        <q-toggle v-model="StepTwoForm.pickup.service_offered"></q-toggle>
        <br><br>
        Delivery Offered?

        <q-toggle v-model="StepTwoForm.delivery.service_offered"></q-toggle>
      </q-field>

    </div><br>

    <div class="row">
      <q-field
          helper="Touch to select # of pickup item"
          label="Pick Up May Contain Up To:"
          v-if="StepTwoForm.pickup.service_offered"
      >
        <q-slider class="dark" v-model="StepTwoForm.pickup.items" :min="1" :max="50" label-always :label-value="`${StepTwoForm.pickup.items} items`"/>
      </q-field>
      <q-field
        helper="Touch to select min pickup time"
        label="Minimum Time for Pickup:"
        v-if="StepTwoForm.pickup.service_offered"
      >
        <q-slider class="dark" v-model="StepTwoForm.pickup.minimum_time_to_pickup" :min="0" :max="200" label-always
                  :label-value="`${StepTwoForm.pickup.minimum_time_to_pickup} min`"
        />
      </q-field>
    </div>

    <div class="row">
      <q-field
        helper="Touch to select # of pickup item"
        label="Delivery May Contain Up To:"
        v-if="StepTwoForm.delivery.service_offered"
      >
        <q-slider class="dark" v-model="StepTwoForm.delivery.items" :min="1" :max="50" label-always
                  :label-value="`${StepTwoForm.delivery.items} items`"/>
      </q-field>

      <q-field
        helper="Touch to select min delivery time"
        label="Minimum Time for Delivery:"
        v-if="StepTwoForm.delivery.service_offered"
      >
        <q-slider class="dark" v-model="StepTwoForm.pickup.minimum_time_to_pickup" :min="0" :max="200" label-always
                  :label-value="`${StepTwoForm.pickup.minimum_time_to_pickup} min`"
        />
      </q-field>
    </div>

    <!--<div class="list bg-inverted-light" >-->
      <!--<div class="item multiple-lines" >-->
        <!--<i class="item-primary text-secondary">business</i>-->
        <!--<div class="item-content">-->
          <!--<label class ="text-secondary text-bold">Delivery Details</label>-->
          <!--<div class="item-content">-->
            <!--<label class ="text-primary">Delivery May Contain Up To: </label>-->
            <!--<span class="label bg-secondary text-white">{{StepTwoForm.delivery.items}} items</span>-->
            <!--<q-range v-model="StepTwoForm.delivery.items" :min="1" :max="50"></q-range>-->
          <!--</div>-->
          <!--<div class="item-content">-->
            <!--<label class ="text-primary">Minimum Time for Delivery: </label>-->
            <!--<span class="label bg-secondary text-white">{{StepTwoForm.delivery.minimum_time_to_delivery}} minutes</span>-->
          <!--</div>-->
          <!--<div class="item-content">-->
           <!--<label class ="text-primary">Delivery Fee</label>-->
            <!--<input-->
              <!--type="number"-->
              <!--v-model ="StepTwoForm.delivery.delivery_fee"-->
              <!--required class="full-width"-->
              <!--placeholder="Enter Delivery Fee"-->
            <!--&gt;-->
          <!--</div>-->
          <!--<div class="item-content">-->
           <!--<label class ="text-primary">Delivery Minimum</label>-->
            <!--<input-->
              <!--type="number"-->
              <!--prefix="$"-->
              <!--v-model ="StepTwoForm.delivery.delivery_minimum"-->
              <!--required class="full-width"-->
              <!--placeholder="Enter Delivery Minimum"-->
            <!--&gt;-->
          <!--</div>-->
          <!--<div class="item-content">-->
           <!--<label class ="text-primary">Delivery Distance Within: (Miles)</label>-->
            <!--<input-->
              <!--type="number"-->
              <!--v-model ="StepTwoForm.delivery.delivery_distance"-->
              <!--required class="full-width"-->
              <!--placeholder="Enter Delivery Distance"-->
            <!--&gt;-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>


<script>
  import {required, minLength} from 'vuelidate/lib/validators'
  import Cleave from 'vue-cleave'
  import moment from 'moment'
//  import VueTimepicker from 'vue2-timepicker'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import {
    QBtn,
    QIcon,
    QInput,
    QField,
    QDatetimeRange,
    QKnob,
    QSlider
  } from 'quasar'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        StepTwoForm: {
          businessname: '',
          description: '',
          working_hours: {
            monday: {
              hours: {
                from: '2017-06-29T09:00:00.000-04:00',
                to: '2017-06-29T17:00:00.000-04:00'
              },
              open: true
            },
            tuesday: {
              hours: {
                from: '2017-06-29T09:00:00.000-04:00',
                to: '2017-06-29T17:00:00.000-04:00'
              },
              open: true
            },
            wednesday: {
              hours: {
                from: '2017-06-29T09:00:00.000-04:00',
                to: '2017-06-29T17:00:00.000-04:00'
              },
              open: true
            },
            thursday: {
              hours: {
                from: '2017-06-29T09:00:00.000-04:00',
                to: '2017-06-29T17:00:00.000-04:00'
              },
              open: true
            },
            friday: {
              hours: {
                from: '2017-06-29T09:00:00.000-04:00',
                to: '2017-06-29T17:00:00.000-04:00'
              },
              open: true
            },
            saturday: {
              hours: {
                from: '2017-06-29T09:00:00.000-04:00',
                to: '2017-06-29T17:00:00.000-04:00'
              },
              open: true
            },
            sunday: {
              hours: {
                from: '2017-06-29T09:00:00.000-04:00',
                to: '2017-06-29T17:00:00.000-04:00'
              },
              open: true
            }
          },
          phone: '',
          address: '',
          pickup: {
            service_offered: false,
            items: 25,
            minimum_time_to_pickup: 90
          },
          delivery: {
            service_offered: false,
            items: 25,
            delivery_fee: '$0.00',
            delivery_minimum: '$10.00',
            delivery_distance: 2,
            minimum_time_to_delivery: 60
          }
        },
        hovering: false,
        pickUpChecked: false,
        deliveryChecked: false,
        min: moment().hour(0).minute(0).format(),
        max: moment().hour(24).minute(0).format(),
        cleaveOptions: {
          phone: true,
          phoneRegionCode: 'US'
        }
      }
    },
    validations: {
      StepTwoForm: {
        businessname: {required},
        address: {required},
        phone: {required, minLength: minLength(10)}
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
        this.address = addressData
      }
//      getItem: function (item) {
//        var state = this.$store.state.storeInfo.store
//        console.log('state is ', state[item])
//        return state[item]
//      }
    },
    computed: {
      ...mapGetters({
        storeImage: 'storeImage'
      }),
      name: {
        get () { return this.$store.state.storeInfo.store.name },
        set (value) {
          this.$store.commit('update_store', {name: value})
          this.StepTwoForm.businessname = value
        }
      },
      address: {
        get () { return this.$store.state.storeInfo.store.address },
        set (value) {
          this.$store.commit('update_store', {address: value})
          this.StepTwoForm.address = value
        }
      },
      description: {
        get () { return this.$store.state.storeInfo.store.description },
        set (value) { this.$store.commit('update_store', {description: value}) }
      },
      phoneNumber: {
        get () { return this.$store.state.storeInfo.store.phone },
        set (value) {
          this.$store.commit('update_store', {phone: value.trim()})
          this.StepTwoForm.phone = value
        }
      },
      pickUpItems: {
        get () { return this.$store.state.storeInfo.store.pickup.pickUpItems },
        set (value) { this.$store.commit('update_store', {pickUpItems: value}) }
      }
    }
  }
</script>

<style>
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
