<template>
  <div class="Steps">
    <template v-for="(step, index) in steps">
      <step :step="step" :number="index+1" />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Step from './Step.vue';

export default {
  components: {
    Step,
  },
  computed: mapState(['steps']),
};
</script>

<style>
  .Steps {
    display: flex;
    flex-wrap: wrap;
    margin: -1rem 0;
    padding: 1rem 4rem;
    z-index: 1;
    position: relative;
  }
  .Steps:after {
    content: '';
    position: absolute;
    border-top: 1px solid var(--color-grey);
    width: 100%;
    left: 0;
    top: 50%;
    z-index: -1;
  }
</style>
