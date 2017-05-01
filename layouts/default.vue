<template>
  <div>
    <navigation />
    <steps />
    <nuxt/>
    <custom-footer />
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import Steps from '../components/Steps.vue';
import CustomFooter from '../components/Footer.vue';

export default {
  components: {
    Navigation,
    Steps,
    CustomFooter,
  },
};
</script>
