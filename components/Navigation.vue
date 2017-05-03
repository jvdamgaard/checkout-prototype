<template>
  <div class="Navigation">
    <div class="Navigation-column">
      <nuxt-link to="/"><img src="https://jvdamgaard.github.io/checkout-prototype/images/logo.svg" class="Navigation-logo"/></nuxt-link>
    </div>
    <div class="Navigation-column Navigation-security">
      <img src="https://jvdamgaard.github.io/checkout-prototype/images/lock.svg"/> 100% sikker betaling
    </div>
  </div>
</template>

<style>
  .Navigation {
    background-color: var(--color-white);
    padding: 1.5rem 4rem;
    display: flex;
    flex-wrap: wrap;
  }
  .Navigation-column {
    flex: 1;
  }
  .Navigation-logo {
    height: 1.5rem;
  }
  .Navigation-security {
    text-align: right;
    color: var(--color-grey);
    text-transform: uppercase;
    font-weight: 700;
    vertical-align: middle;
    display: inline-block;
  }
  .Navigation-security img {
    vertical-align: middle;
    display: inline-block;
    margin-right: 1rem;
    margin-top: -5px;
  }
</style>
