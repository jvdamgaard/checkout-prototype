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

<style>
:root {
  --color-primary: #5F306A;
  --color-secondary: #F8F4EB;
  --color-black: #18011D;
  --color-grey: #6A656B;
  --color-grey-light: #EAE9EB;
  --color-white: #FEFDFB;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
/*  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
  color: var(--color-black);
  background-color: var(--color-secondary);
}

html, body {
  padding: 0;
  margin: 0;
}

*, *:before, *:after {
  box-sizing: border-box;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  margin: 1rem 0 2rem;
}
a { color: var(--color-primary); }
a:hover { color: var(--color-black); }

</style>
