<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style lang="sass">
  html 
    height: 100%
  
  #app > div 
    min-height: 100vh
    display: flex
    flex-direction: column
  
  .wrapper 
    flex: 1 
</style>
