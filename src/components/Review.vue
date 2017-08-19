<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <q-field icon="mail">
      <q-input v-model="comment" type="text" float-label="Enter your issue or comment" @input="$v.StepTwoForm.businessname.$touch()"
               :value = "comment"/>
    </q-field>
    <q-field icon="mail">
      <q-input v-model="email" type="email" float-label="Enter Email for Notifications" @input="$v.StepTwoForm.businessname.$touch()"
               :value = "email" clearable/>
    </q-field>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        comment: '',
        firstName: '',
        lastName: ''
      }
    }
  }
</script>

<style>
</style>
