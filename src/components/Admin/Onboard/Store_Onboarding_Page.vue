<template>
  <q-layout>
    <q-toolbar color="tertiary" class="text-white">
      <q-btn v-go-back="'/admin'" @click="reset" icon="arrow_back"/>
      <q-toolbar-title>Sign Up</q-toolbar-title>
    </q-toolbar>
    <div class="layout-view">
      <div class ="layout-padding">
        <div class="row justify-center">
          <div class="col-lg-8">
            <q-stepper vertical ref="stepper" color="primary" alternative-labels>
              <q-step default  name="first" title="Enter Store Info">
                <h5 class="text-tertiary text-bold">Enter Store Information</h5>
                <step-two></step-two>
                <q-stepper-navigation>
                  <q-btn color="primary" @click="$refs.stepper.next()">Continue</q-btn>
                </q-stepper-navigation>
              </q-step>
              <q-step name="second" title="Terms of Service" subtitle="">
                <h5 class="text-tertiary text-bold"></h5>
                <q-scroll-area style="height: 300px;">
                  <store-contract></store-contract>
                </q-scroll-area>
                <br>
                <q-checkbox v-model="termsAccepted" label="I Accept."/>
                <q-stepper-navigation>
                  <q-btn color="primary" :disable="!termsAccepted" @click="createStore">Create Your Store!</q-btn>
                  <q-btn color="tertiary" flat @click="$refs.stepper.previous()">Back</q-btn>
                </q-stepper-navigation>
              </q-step>
              <!--<q-step name="third" title="Add Payment Info.">-->
                <!--<step-four></step-four>-->
                <!--<q-stepper-navigation>-->
                  <!--<q-btn color="primary" @click="createStore">Submit</q-btn>-->
                  <!--<q-btn color="tertiary" flat @click="$refs.stepper.previous()">Back</q-btn>-->
                <!--</q-stepper-navigation>-->
              <!--</q-step>-->
            </q-stepper>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>


<script>
  import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'
  import StepOne from './StepOne.vue'
  import StepTwo from './StepTwo.vue'
  import StepThree from './StepThree.vue'
  import StepFour from './StepFour.vue'
  import StoreContract from './StoreContract'
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QInput,
    QStepper
  } from 'quasar'
  import { mapActions, mapMutations } from 'vuex'

  //  import StepFour from '../Admin/StripeTest.vue'
  export default {
    data () {
      return {
        ready: false,
        termsAccepted: false,
        finished: false,
        form: {
          username: '',
          email: '',
          password: '',
          repeatPassword: ''
        }
      }
    },
    components: {
      StepOne,
      StepTwo,
      StepThree,
      StepFour,
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QInput,
      StoreContract,
      QStepper
    },
    validations: {
      form: {
        username: {required, minLength: minLength(6)},
        password: {required, minLength: minLength(6)},
        repeatPassword: {required, minLength: minLength(6), sameAsPassword: sameAs('password')},
        email: {required, email}
      }
    },
    computed: {
      selectedStore: {
        get () { return this.$store.state.storeInfo.selectedStore },
        set (value) { this.$store.commit('update_store_selection', value) }
      }
    },
    methods: {
      submit () {
        this.$v.form.$touch()
        if (this.$v.form.$error) {
        }
      },
      finish () {
        this.finished = true
      },
      reset () {
        this.getFullStoreInfo(this.selectedStore)
        this.$refs.stepper.reset()
        this.finished = false
      },
      ...mapActions([
        'createStore',
        'getFullStoreInfo'
      ]),
      ...mapMutations([
        'reset_store'
      ])
    },
    created () {
      this.reset_store()
    }
  }
</script>
<style>
  .item > .item-primary ~ .item-content {
    margin-left: 48px;
  }
  .timeline{
    overflow: auto;
  }
  .timeline-badge {
    box-shadow: none;
  }
</style>
