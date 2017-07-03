<template>
  <q-layout>
    <q-toolbar color="tertiary" class="text-white">
      <q-btn v-go-back="'/'" icon="arrow_back"/>
      <q-toolbar-title>Sign Up</q-toolbar-title>
    </q-toolbar>
    <div class="layout-view">
      <div class ="layout-padding">

        <!--<q-stepper @finish="createStore" ref="stepper" v-show="!finished">-->
          <!--<q-step title="Enter Store Info">-->
            <!--<step-two></step-two>-->
          <!--</q-step>-->
          <!--<q-step title="Create Categories and Add Products">-->
            <!--<step-three></step-three>-->
          <!--</q-step>-->
          <!--<q-step title="Enter Payment Information">-->
            <!--<step-four></step-four>-->
          <!--</q-step>-->
        <!--</q-stepper>-->
        <div class="row justify-center">
          <div class="col-lg-8">
        <q-stepper vertical color="secondary" ref="stepper" alternative-labels>
          <q-step default name="first" title="Enter Store Info">
            <step-two></step-two>

            <!-- Navigation for this step at the end of QStep-->
            <q-stepper-navigation>
              <q-btn color="secondary" @click="$refs.stepper.next()">Continue</q-btn>
            </q-stepper-navigation>
          </q-step>
          <q-step name="second" title="Create Categories and Add Products" subtitle="">
            <step-three></step-three>
            <q-stepper-navigation>
              <q-btn color="secondary" @click="$refs.stepper.next()">Next</q-btn>
              <q-btn color="secondary" flat @click="$refs.stepper.previous()">Back</q-btn>
            </q-stepper-navigation>
          </q-step>
          <q-step name="third" title="Get code">
            <div v-for="n in 3">Step 3</div>
            <q-stepper-navigation>
              <q-btn color="secondary" @click="$refs.stepper.next()">Next</q-btn>
              <q-btn color="secondary" flat @click="$refs.stepper.previous()">Back</q-btn>
            </q-stepper-navigation>
          </q-step>
          <q-step name="fifth" disable title="Disabled">
            <div v-for="n in 3">Step 4</div>
            <q-stepper-navigation>
              <q-btn color="secondary" @click="$refs.stepper.next()">Next</q-btn>
              <q-btn color="secondary" flat @click="$refs.stepper.previous()">Back</q-btn>
            </q-stepper-navigation>
          </q-step>
          <q-step name="fourth" title="Review and Finalize">
            <div v-for="n in 3">Step 5</div>
            <q-stepper-navigation>
              <q-btn color="secondary" @click="$refs.stepper.goToStep('first')">Restart</q-btn>
              <q-btn color="secondary" flat @click="$refs.stepper.previous()">Back</q-btn>
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>


<script>
  import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'
  import StepOne from '../Admin/StepOne.vue'
  import StepTwo from '../Admin/StepTwo.vue'
  import StepThree from '../Admin/StepThree.vue'
  import StepFour from '../Admin/StepFour.vue'
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QInput,
    QStepper
  } from 'quasar'
  import { mapActions } from 'vuex'

  //  import StepFour from '../Admin/StripeTest.vue'
  export default {
    data () {
      return {
        ready: false,
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
        this.$refs.stepper.reset()
        this.finished = false
      },
      ...mapActions([
        'createStore'
      ])
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
