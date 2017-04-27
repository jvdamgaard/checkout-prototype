<template>
  <div class="Steps">
    <div class="Steps-padding" />
    <template v-for="(step, index) in steps">
      <step :step="step" :number="index+1" />
    </template>
    <div class="Steps-padding" />
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
    margin-bottom: -1rem;
    margin-top: -1rem;
    padding: 1rem 0;
    background: center repeat-x url(/images/line.svg);
  }
  .Steps-padding {
    margin-left: 5rem;
    flex: 0 0 8.3333%;
  }
</style>
