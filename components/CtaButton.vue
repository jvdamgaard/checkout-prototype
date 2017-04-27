<template>
  <nuxt-link :to="to" class="CtaButton" :class="[
    `CtaButton--${type}`,
    { 'CtaButton--inactive': inactive }
  ]">
    <slot />
  </nuxt-link>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'ghost',
        validator(value) {
          return ['primary', 'ghost', 'facebook'].indexOf(value) !== -1;
        },
      },
      inactive: {
        type: Boolean,
        default: false,
      },
      to: String,
    },
  };
</script>

<style>
  .CtaButton {
    display: block;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    line-height: 4rem;
    transition: all 0.25s cubic-bezier(.5,0,.1,1);
  }
  .CtaButton:focus {
    outline: 0;
    box-shadow: 0 0 2rem -0.5rem var(--color-primary);
  }

  .CtaButton--primary {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
  .CtaButton--primary:hover {
    background-color: var(--color-black);
    color: var(--color-white);
  }

  .CtaButton--ghost {
    border: 1px solid var(--color-primary);
  }
  .CtaButton--ghost:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .CtaButton--facebook {
    background-color: #3b5998;
    color: var(--color-white);
  }
  .CtaButton--facebook:hover {
    color: var(--color-white);
  }

  .CtaButton--inactive {
    background-color: var(--color-grey-light);
    color: var(--color-grey);
    cursor: not-allowed;
  }
  .CtaButton--inactive:hover {
    background-color: var(--color-grey-light);
    color: var(--color-grey);
  }
  .CtaButton--inactive:focus {
    box-shadow: none;
  }
</style>
