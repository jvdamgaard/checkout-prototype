<template>
  <div class="Step">
    <nuxt-link :to="step.path" class="Step-circle" :class="{
      'Step-circle--valid': step.valid
    }">
      {{ step.valid ? '&#10003;' : number }}
    </nuxt-link>
    <p>{{ step.title }}</p>
  </div>
</template>

<script>
export default {
  props: [
    'number',
    'step',
  ],
};
</script>

<style>
  .Step {
    display: block;
    flex: 1;
    text-align: center;
    margin-top: 2.5rem;
    color: var(--color-grey);
  }
  .Step p {
    margin-top: 0.25rem;
  }
  .Step-circle {
    display: inline-block;
    background-color: var(--color-grey);
    color: var(--color-white);
    font-weight: 700;
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 50%;
    cursor: not-allowed;
    text-decoration: none;
  }
  .Step-circle:hover {
    color: var(--color-white);
  }
  .Step-circle--valid {
    background-color: var(--color-secondary);
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
    font-size: 1.5rem;
    cursor: auto;
  }
  .Step-circle--valid:hover {
    color: var(--color-primary);
  }
  .nuxt-link-active.Step-circle {
    background-color: var(--color-primary);
  }
  .nuxt-link-active.Step-circle--valid {
    color: var(--color-white);
  }
</style>
