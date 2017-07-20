<!--suppress ALL -->
<template>
  <div>
    <div class="row sm-gutter">
      <div class="col-12">
        <h5 class="text-tertiary text-bold">Enter Store Information</h5>
        <q-field icon="business">
          <q-input v-model="name" type="text" float-label="Enter Business Name" @input="$v.StepTwoForm.businessname.$touch()"
                   :value = "name"
                   :after="[{icon: 'done', condition: name.length >= 1, handler () {}}]" clearable/>
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
            @input="$v.StepTwoForm.address.$touch()"
            class="search"
          >
          </vue-google-autocomplete>
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-field icon="phone" >
          <q-input v-model="phoneNumber" type="tel" float-label="Enter Business Phone #"
                   clearable
                   :after="[{icon: 'done', condition: phoneNumber.length >= 10, handler () {}}]"/>
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
      <div class="col-12">
        <q-field icon="access_time">
          <div v-for="(day_hours,day) in StepTwoForm.working_hours" >
            <span class="text-tertiary">{{ day }}:</span><br>
            <q-datetime-range @change="update_working_hours(StepTwoForm.working_hours)"
                              color="primary"
                              v-model="day_hours.hours"
                              type="time"
                              class="full-width" />
          </div>
        </q-field>
      </div>
      <q-field icon="info">
        <span class="text-bold">Additional Information </span><br><br>
        <div class="group">
          Pickup Offered?
          <q-toggle v-model="StepTwoForm.pickup.service_offered"></q-toggle>
          Delivery Offered?
          <q-toggle v-model="StepTwoForm.delivery.service_offered"></q-toggle>
        </div>
      </q-field>
    </div>
    <br>
    <div class="row">
      <q-field
          helper="Touch to select # of pickup item"
          label="Pick Up May Contain Up To:"
          v-if="StepTwoForm.pickup.service_offered"
      >
        <q-slider class="text-tertiary" v-model="StepTwoForm.pickup.items" :min="1" :max="50" label-always :label-value="`${StepTwoForm.pickup.items} items`"/>
      </q-field>
      <q-field
        helper="Touch to select min pickup time"
        label="Minimum Time for Pickup:"
        v-if="StepTwoForm.pickup.service_offered"
      >
        <q-slider class="text-tertiary" v-model="StepTwoForm.pickup.minimum_time_to_pickup" :min="0" :max="200" label-always
                  :label-value="`${StepTwoForm.pickup.minimum_time_to_pickup} min`"
        />
      </q-field>
    </div>
    <div class="row ">
      <q-field

        helper="Touch to select # of pickup item"
        label="Delivery May Contain Up To:"
        v-if="StepTwoForm.delivery.service_offered"
      >
        <q-slider class="text-tertiary" v-model="StepTwoForm.delivery.items" :min="1" :max="50" label-always
                  :label-value="`${StepTwoForm.delivery.items} items`"/>
      </q-field>

      <q-field
        helper="Touch to select min delivery time"
        label="Minimum Time for Delivery:"
        v-if="StepTwoForm.delivery.service_offered"
      >
        <q-slider class="text-tertiary" v-model="StepTwoForm.delivery.minimum_time_to_delivery" :min="0" :max="200" label-always
                  :label-value="`${StepTwoForm.delivery.minimum_time_to_delivery} min`"
        />
      </q-field>
    </div>
  </div>
</template>

<script>
  import {required, minLength} from 'vuelidate/lib/validators'
  import Cleave from 'vue-cleave'
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
          this.$store.commit('update_store', {phone: value})
          this.StepTwoForm.phone = value.toString()
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
