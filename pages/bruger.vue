<template>
  <div>
    <h1>Bruger</h1>
    <row>
      <column width="2" />
      <column width="4">
        <box :focus="boxFocus === 0" @click.native="setFocusOn(0)">
          <h2>Jeg er allerede bruger på flowr.dk</h2>
          <cta-button type="facebook" to="#">
            Log på med Facebook
          </cta-button>
          <div class="Bruger-or"><span>eller</span></div>
          <label for="user-email">E-mail</label>
          <input type="text" id="user-email" ref="user-email" placeholder="din@mail.dk" v-model="userEmail" />
          <label for="user-password">Kodeord</label>
          <input type="text" id="user-password" ref="user-password" placeholder="******" v-model="userPassword" />
          <p>
            <cta-button type="primary" to="#" :inactive="(!userEmail || !userPassword)">
              Log på
            </cta-button>
          </p>
        </box>
      </column>
      <column width="4">
        <box :focus="boxFocus === 1" @click.native="setFocusOn(1)">
          <h2>Jeg er ny bruger</h2>
          <label for="name">Navn *</label>
          <input type="text" id="name" ref="name" placeholder="Dit Fulde Navn" :value="order.name" @input="updateName" />
          <label for="email">E-mail *</label>
          <input type="text" id="email" ref="email" placeholder="din@mail.dk" :value="order.email" @input="updateEmail" />
          <p class="description">Bruges til at sende ordrebekræftigelse. Du bliver ikke automatisk tilmeldt nogen form for nyhedsbrev.</p>
          <label for="phone">Mobilnummer</label>
          <input type="text" id="phone" ref="phone" placeholder="12 34 56 78" :value="order.phone" @input="updatePhone" />
          <p class="description">Bruges til at opdatere dig på leveringen. Vi sender dig ikke reklame eller videregiver dit nummer.</p>
          <p>
            <cta-button type="primary" :to="nextStep.path" :inactive="!step.valid">
              Videre til {{nextStep.title}}
            </cta-button>
          </p>
        </box>
      </column>
      <column width="2" />
    </row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '../components/Row.vue';
import Column from '../components/Column.vue';
import Box from '../components/Box.vue';
import CtaButton from '../components/CtaButton.vue';

export default {
  components: {
    Row,
    Column,
    Box,
    CtaButton,
  },
  data() {
    return {
      boxFocus: 1,
      userEmail: '',
      userPassword: '',
    };
  },
  computed: {
    ...mapState({
      order: state => state.order,
      step: state => state.steps[0],
      nextStep: state => state.steps.find((step, i) => ((i !== 0 && !step.valid) || i === 4)),
    }),
  },
  methods: {
    setFocusOn(number) {
      this.boxFocus = number;
    },
    updateName(e) {
      this.$store.dispatch('updateOrder', { name: e.target.value });
    },
    updateEmail(e) {
      this.$store.dispatch('updateOrder', { email: e.target.value });
    },
    updatePhone(e) {
      this.$store.dispatch('updateOrder', { phone: e.target.value });
    },
  },
  mounted() {
    const refs = [this.$refs.name, this.$refs.email, this.$refs.phone];
    const nextInput = refs.find(ref => ref.value === '');
    if (nextInput) {
      nextInput.focus();
    }
  },
};
</script>

<style>
  .Bruger-or {
    text-align: center;
    border-bottom: 1px solid var(--color-grey-light);
    margin: 4rem -2rem;
    position: relative;
  }
  .Bruger-or span {
    display: block;
    position: absolute;
    margin: -0.75rem 42%;
    background-color: var(--color-white);
    padding: 0 2rem;
  }
</style>
