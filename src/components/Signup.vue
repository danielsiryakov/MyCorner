<template>
  <div class="group" style="padding: 0px">
    <h3>Sign Up</h3><br>
    <p>Signup and join YOUR corner!
      Groceries, wine, and more!</p>
    <br>
    <q-input v-model="email" type="email" stack-label="Enter Your Email" clearable />
    <q-input v-model="password" type="password" stack-label="Enter Your password" clearable @keyup.enter="submit"/>
    <br>
    <q-btn loader color="primary" @click="submit">Sign Up</q-btn>
    <img class="float-right" src="../assets/basket.png" alt="" width="150px" height="150px">
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import {
    QInput, QBtn
  } from 'quasar'
  export default {
    data () {
      return {
        password: '',
        email: ''
      }
    },
    components: {
      QInput, QBtn
    },
    methods: {
      ...mapActions([
        'signup'
      ]),
      submit () {
        this.signup(
          {
            'password': this.password,
            'email': this.email
          })
        this.$emit('submit')
      }
    }
  }
</script>
