<template>
  <div>
    <headerComponent />
    <Nuxt />
    <footerComponent />
  </div>
</template>

<script>
import headerComponent from '@/components/header';
import footerComponent from '@/components/footer';
export default {
    name: 'defaultLayout',
    components: {
        headerComponent,
        footerComponent
    }
};
</script>

<style>
</style>