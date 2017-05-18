<template>
  <div>
    <prototype />
    <navigation />
    <steps />
    <nuxt/>
    <custom-footer />
  </div>
</template>

<script>
import Prototype from '../components/Prototype.vue';
import Navigation from '../components/Navigation.vue';
import Steps from '../components/Steps.vue';
import CustomFooter from '../components/Footer.vue';

export default {
  components: {
    Prototype,
    Navigation,
    Steps,
    CustomFooter,
  },
};
</script>
