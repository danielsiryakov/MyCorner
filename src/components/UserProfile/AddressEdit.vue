<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h5 class="text-bold text-tertiary">Edit Address</h5><br>
    {{address.line1}}<br>
    Make this your default address?


    <!-- your content -->
  </div>
</template>

<script>
  export default {
    props: ['address'],
    data () {
      return {}
    }
  }
</script>

<style>
</style>
