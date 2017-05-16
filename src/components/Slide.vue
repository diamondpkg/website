<template>
  <div class="slide">
    <container>
      <slot />
    </container>
  </div>
</template>

<script>
  export default { name: 'slide' };
</script>

<style scoped>
  .slide {
    padding: 16px;
  }
</style>
