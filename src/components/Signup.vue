<template>
  <div class="group" style="padding: 20px">
    <h3>Sign Up</h3><br>
    <p>Signup and join YOUR corner! Groceries, wine, cigarettes, and more are all around your corner!</p>
    <br>
    <q-input v-model="email" type="email" float-label="Enter Your Email" suffix="@email.com" clearable />
    <br>
    <q-input v-model="password" type="password" float-label="Enter Your password" clearable @keyup.enter="submit"/>
    <br>
    <q-btn color="primary" @click="submit">Sign Up</q-btn>
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
