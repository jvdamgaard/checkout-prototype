<template>
  <div class="Box" :class="{ 'Box--focus': focus, 'Box--fit': fit }">
    <slot />
  </div>
</template>

<script>
  export default {
    props: ['focus', 'fit'],
  };
</script>

<style>
  .Box {
    background-color: var(--color-white);
    padding: 0.1rem 2rem 2rem;
    height: 100%;
  }
  .Box--focus {
    box-shadow: 0 1rem 2rem -1rem rgba(0, 0, 0, 0.25);
  }
  .Box--fit {
    height: auto;
    margin-bottom: 1rem;
  }
  .Box--fit:last-child {
    margin-bottom: 0rem;
  }
  .Box h2 {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }
  .Box h2 a {
    font-size: 0.8125rem;
    color: var(--color-grey);
    float: right;
    font-weight: 400;
    margin-top: 0.25rem;
  }
  .Box h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .Box p img {
    display: inline-block;
    vertical-align: middle;
    height: 1.6rem;
  }
  .Box p.error {
    font-size: 0.8125rem;
    color: red;
    margin: 0.25rem 0 0;
  }
  .Box label {
    display: block;
    width: 100%;
    margin-top: 1rem;
    font-size: 1rem;
  }
  .Box input, .Box textarea {
    display: block;
    width: 100%;
    background: transparent;
    font-size: 1rem;
    line-height: 1.6rem;
    padding: 0.75rem 1rem;
    margin-top: 0.25rem;
    border: 1px solid var(--color-grey-light);
    background-color: var(--color-white);
  }
  .Box input:focus, .Box textarea:focus {
    outline: 0;
    border-bottom: 2px solid var(--color-primary);
    margin-bottom: -1px;
  }
  .Box input::placeholder, .Box textarea::placeholder {
    color: var(--color-grey-light);
  }
  .Box input[type=radio], .Box input[type=radio] + label {
    display: inline-block;
    width: auto;
    margin: 0 1rem 0.5rem 0;
  }
  .Box input.inline {
    display: inline-block;
    width: auto;
  }
  .Box .description {
    font-size: 0.8125rem;
    color: var(--color-grey);
    margin: 0.25rem 0 0;
  }

  .algolia-places-nostyle {
    width: 100%;
  }
  .ap-nostyle-input-icon, .ap-footer {
    display: none;
  }
  .ap-nostyle-dropdown-menu {
    width: 100%;
    background-color: var(--color-white);
    margin-top: 0.25rem;
    border: 1px solid var(--color-grey-light);
    box-shadow: 0 0.25rem 1rem 0 var(--color-grey-light);
  }
  .ap-nostyle-suggestion {
    line-height: 3rem;
    padding: 0 1rem;
    cursor: pointer;
  }
  .ap-nostyle-suggestion em {
    font-weight: 700;
    font-style: normal;
  }
  .ap-nostyle-suggestion small {
    color: var(--color-grey);
    margin-left: 0.5rem;
  }
  .ap-nostyle-cursor {
    background-color: var(--color-grey-light);
  }
</style>
