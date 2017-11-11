<template>
  <div align="" class="text-tertiary">
    <div style="margin:0 auto;max-width:800px;background:white;">
      <div style="padding:0px; color:#0f1f38; font-size:16px;line-height:30px;text-align: left">
        <h4 class="bg-tertiary text-white" style="padding: 10px">Frequently Asked Questions</h4>
        <br>
      </div>
      <q-list>
        <q-collapsible opened  icon="store" label="Commonly asked questions by store owners">
          <div>
            <q-list>
              <q-collapsible opened  icon="add circle outline" label="What if I don't offer delivery?">
                <div class="answer">
                  You may disable delivery and or pickup services in your admin panel at
                  any time. These changes will instantly be applied to your store. That
                  means that as soon as you enable or disable the feature your customers
                  will automatically see the effect.
                </div>
              </q-collapsible>
              <q-collapsible icon="add circle outline" label="What are your fees?">
                <div class="answer">
                  We do not have any subscription fees. You are offered a free trial. Once
                  your trial has expired you may continue using our services. Our fees on
                  credit card orders are 8% plus $0.30. Cash transactions are completely free
                  without exception.
                </div>
              </q-collapsible>
              <q-collapsible icon="add circle outline" label="What does your platform offer?">
                <div class="answer">
                  Think of us as the online version of your store. We allow you to manage
                  your inventory, edit your store details, accept orders and have automatic
                  checkout for your customers. But most importantly we promote your store.
                  We hope that everyone will benefit from the network we are trying to build.
                </div>
              </q-collapsible>
              <q-collapsible icon="add circle outline" label="This sounds like something I may be interested in but I'm not sure I'm ready to take the plunge?">
                <div class="answer">
                  Until it is time for you to enable your store the only commitment you
                  are making is singing up. We will not charge you a cent until your trial
                  period expires. We hope to make long lasting partnerships. That being said,
                  we completely understand if you would simply like to try us out or if
                  it is not for you. You may disable your store at any time. This means that
                  you will not be available for customers to order from and there are no
                  around disabling a store.
                </div>
              </q-collapsible>
                <q-collapsible icon="add circle outline" label="I have too many products to count. How will I upload all of them?">
                  <div class="answer">
                    We have worked hard on making this as pleasant an experience as we could
                    imagine. We have roughly 18k items in our current inventory database armed
                    with standard pricing, details, images, and nutrition facts. Our admin panel
                    allows you to simply drop those items into your aisle and the item will
                    instantly appear in your store for all customers to see. You may save your
                    progress at any time and come back to continue adding and editing inventory.
                    Our goal is to help you start receiving orders as quickly as possible.
                  </div>
                </q-collapsible>
                <q-collapsible icon="add circle outline" label="What if I run out of a product or would like to edit a couple of items in a category?">
                  <div class="answer">
                    There are a couple of options to deal with this. If you have to work on
                    a couple of items in a single category you may either work on them directly
                    or disable the category and, once your done editing, re-enable it. If you
                    choose to disable a category this will mean that it is inaccessible to
                    your customers. If you have extensive work to do on your store and would
                    like to take time to go over a large portion of your inventory you may
                    also disable your store until you are ready to reactivate it and start
                    receiving orders.
                  </div>
                </q-collapsible>
                <q-collapsible icon="add circle outline" label="What happens if I get an order for an item that is out of stock?">
                  <div class="answer">
                    Although we would encourage you to keep your store up to date we understand
                    that this is not always possible. So if you do end up receiving an order
                    including an item that you no longer have available you may always contact
                    the customer and if needed reject the order.
                  </div>
                </q-collapsible>
              </q-list>
          </div>
        </q-collapsible>
        <q-collapsible icon="perm_identity" label="Commonly asked questions by customers">
          <div>
            Content
          </div>
        </q-collapsible>
      </q-list>
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
.answer {
  padding: 20px;
}
</style>
