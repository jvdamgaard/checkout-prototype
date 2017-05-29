<template>
  <div class="Prototype" v-if="!prototypeAccepted">
    <div class="Prototype-center">
      <div class="Prototype-content">
        <h1>Prototype</h1>
        <p>This is a prototype of a checkout flow. It's solely ment for user tests.</p>
        <p>No integration with external system, and your data will not be saved.</p>
        <p>A lot of things have been faked and some functionality is missing.</p>
        <h2>Only build for</h2>
        <p>
          <a href="https://www.google.com/chrome/browser/desktop/">Google Chrome browser</a><br>
          a desktop screen above 1200px in width
        </p>
        <p @click.stop="ok"><cta-button to="#" type="primary">OK</cta-button></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CtaButton from '../components/CtaButton.vue';

export default {
  components: {
    CtaButton,
  },
  computed: {
    ...mapState({
      prototypeAccepted: state => state.prototypeAccepted,
    }),
  },
  methods: {
    ok() {
      this.$store.dispatch('acceptPrototype');
    },
  },
};
</script>

<style>
  .Prototype {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.75);
    z-index: 1000;
    display: flex;
    flex-wrap: wrap;
  }
  .Prototype-center {
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 40rem;
    margin: 0 auto;
  }
  .Prototype-content {
    background: var(--color-white);
    padding: 2rem;
  }
</style>
