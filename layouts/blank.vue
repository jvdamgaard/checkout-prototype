<template>
  <div>
    <prototype />
    <row class="Product-layout-top-bar">
      <column width="12">
        <nuxt-link to="/"><img src="https://jvdamgaard.github.io/checkout-prototype/images/logo.svg" class="Navigation-logo"/></nuxt-link>
      </column>
    </row>
    <nuxt/>
  </div>
</template>

<script>
import Prototype from '../components/Prototype.vue';
import Row from '../components/Row.vue';
import Column from '../components/Column.vue';

export default {
  components: {
    Prototype,
    Row,
    Column,
  },
};
</script>

<style>
  .Product-layout-top-bar {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
</style>
