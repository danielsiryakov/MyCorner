<template>
  <div align="center" class="text-tertiary">
    <div style="max-width:800px;background:white;" align="center">
      <div style="margin:auto;max-width:800px;background:#edf0f5;">
        <!--<img alt="MyCorner"-->
             <!--title="MyCorner"-->
             <!--height="auto"-->
             <!--src="https://mycorner.store/img/fulllogo.00df53e.png"-->
             <!--style="display:block;width:95%;height:auto;"-->
        <!--/>-->
      </div>
      <br>
    </div>

    <div style="margin:0 auto;max-width:800px;background:white;">
      <div style="padding:0px 25px 15px; color:#0f1f38; font-size:16px;line-height:30px;text-align: left">
        <h4 class="bg-tertiary text-white" style="padding: 10px">
        Start your 30-day free trial today - You won't even pay transaction fees! <br><br>
          Trial period starts with your first order!
        </h4>
        <div style="float: right">
          <img style="max-width: 185px; max-height: 400px;" src="https://mycorner.store/img/basket.10dcb8f.png" alt="mycorner shopping cart"></img>
          <br>
          <q-btn big color="primary" @click="formTab='signup', $refs.logInSignUp.open()">Start your trial today!</q-btn>
        </div>
        <br>
        <div style="display:inline; width: 95%; cursor:auto;color:#0f1f38;font-size:16px;line-height:30px;">
          <h5 class="text-bold">Learn More</h5>
          <br>
          <h6 class="text-bold">How long does the trial last?</h6>
          <p style="padding: 10px;">
            Your trial period does not begin until you accept your first order. The trial
            expires when your store has received a total of $200 in orders in a single month.
            If you reach the $200 limit early our fees will not kick in until the month is up
            or you receive over $50,000 in orders before the months end.
          </p>
          <h6 class="text-bold">What is the purpose of the trial?</h6>
          <p style="padding: 10px;">
            We know that any new process introduced into your organization is a commitment.
            Our free trial is intended to give you and your employees a chance to explore
            the platform while still accepting orders at no additional cost. That means that
            not only will we not charge our standard platform fees we will also pay for any
            transaction fees on your orders. We want to make happy, long lasting, profitable
            partners. We don't make money until you make money. Period.
          </p>
          <h6 class="text-bold">Still have questions?</h6>
          <p style="padding: 10px;">
            Check our frequently asked questions to help you find what
            your looking for.
          </p><br>
          <h5 class="text-bold">
            Benefits include:
          </h5>
          <ul style="text-align: left;">
            <li>Anyone in your neighborhood with a phone can now shop with you! </li>
            <li>No subscription fees! We make money when you make money.</li>
            <li>No fees on cash orders. Period. </li>
            <li>A team that truly cares. Your satisfaction is our top priority. </li>
            <li>Easy to use tools to manage your online presence. My mom can use them!</li>
            <li>Free marketing. That is always nice. </li>
            <li>Automatic payments backed by one of the world’s leading payment providers that specializes in fraud detection. </li>
            <li>Customers can reorder with the click of a button (let’s keep them coming back!)</li>
            <li>Security and privacy. Your data is sacred to us and we work hard to make our partners feel safe.</li>
          </ul>
        </div>
        <q-modal ref="logInSignUp" transition="fade" :content-css="{maxWidth: '800px',maxHeight: '800px'}">
          <h4><q-icon name="close" class="text-primary absolute-top-right" @click="$refs.logInSignUp.close()"/></h4>
          <br><br>
          <div class="">
            <q-tabs :refs="$refs" v-model="formTab" no-pane-border color="tertiary">
              <q-tab slot="title" name="login" label="log in"/>
              <q-tab slot="title" name="signup" label="Sign Up" />

              <q-tab-pane name="login"><login @closeModal="$refs.logInSignUp.close()"></login></q-tab-pane>
              <q-tab-pane  name="signup"><sign-up v-if="!signedup" v-on:submit="signedup = true"></sign-up>
                <div v-if="signedup" style="padding: 20px;" class="layout-padding">
                  <h4>we sent you a confirmation email!</h4><br>
                  <big class="text-tertiary">
                    Confirm your email address and start shopping for everything you love!
                  </big>
                </div>
              </q-tab-pane>
            </q-tabs>
          </div>
        </q-modal>
      </div>

    </div>
    <div style="margin:0 auto;max-width:800px;background:#F5F7F9;" align="center">
      <div style="cursor:auto;color:#0f1f38 ;font-size:13px;line-height:20px; padding:20px 3px;">
        From our team here at MyCorner we sincerly hope to be a part of your journey!
        Thank you for taking the time to read a little about us and we look forward to hearing from you!
        <br>
        If you have questions, concerns, feedback, suggestions or requests we are here to help in any way we can.
      </div>
    </div>
  </div>
</template>

<script>
  import Login from './Login.vue'
  import SignUp from './Signup.vue'
  import {
    QTabs, QRouteTab, QBtn, QIcon
  } from 'quasar'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        formTab: 'login',
        signedup: false
      }
    },
    components: {
      Login,
      SignUp,
      QTabs,
      QRouteTab,
      QBtn,
      QIcon
    },
    computed: mapState({
      userAuth: 'authenticated'
    }),
    methods: {
      modalClosed () {
        console.log('modal closed')
      }
    }
  }

</script>

<style>

</style>
