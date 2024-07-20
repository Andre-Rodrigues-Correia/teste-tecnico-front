<template>
  <div class="text-center">
    <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
  export default {
    name: 'AppLoader'
  }
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>