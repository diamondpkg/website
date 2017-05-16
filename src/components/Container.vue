<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
  .container {
    margin: 0 auto;
    max-width: 1120px;
  }
</style>

<script>
  export default { name: 'container' };
</script>
