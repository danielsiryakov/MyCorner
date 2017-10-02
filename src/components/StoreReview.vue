<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <h5><q-rating color="amber-4"  v-model="score" :max="5" /></h5>

    <q-field>
      <q-input v-model="username" type="email" float-label="Enter your name"
               :value = "username" clearable/>
    </q-field>

    <q-field icon="">
      <q-input v-model="comment" type="text" float-label="Enter your comment"
               :value = "comment" clearable/>
      <!--:value = "comment" clearable/>-->
    </q-field>
    <br><br>
    <q-btn color="tertiary"  @click="submitReview">Submit</q-btn>
  </div>
</template>

<script>
  import shop from '../api/shop'
  export default {
    data () {
      return {
        comment: '',
        score: this.stars,
        username: '',
        lastName: ''
      }
    },
    props: ['stars', 'store_id'],
    methods: {
      submitReview () {
        shop.addStoreReview({
          comment: this.comment,
          score: this.score,
          store_id: this.store_id
        })
        this.comment = ''
        this.username = ''
        this.$emit('submittedReview')
      }
    }
  }
</script>

<style>
</style>
