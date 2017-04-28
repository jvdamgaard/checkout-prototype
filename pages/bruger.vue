<template>
  <div>
    <h1>Bruger</h1>
    <row>
      <column width="2" />
      <column width="4">
        <box>
          <h2>Jeg er allerede bruger på flowr.dk</h2>
          <cta-button type="facebook" to="#">
            Log på med Facebook
          </cta-button>
          <div class="Bruger-or"><span>eller</span></div>
          <label for="user-email">E-mail</label>
          <input type="email" id="user-email" ref="user-email" placeholder="din@mail.dk" v-model="userEmail" />
          <label for="user-password">Kodeord</label>
          <input type="password" id="user-password" ref="user-password" placeholder="******" v-model="userPassword" />
          <p>
            <cta-button type="primary" to="#" :inactive="(!userEmail || !userPassword)">
              Log på
            </cta-button>
          </p>
        </box>
      </column>
      <column width="4">
        <box class="Bruger-center">
          <cta-button type="primary" :to="nextStep.path">
            Jeg er ny bruger
          </cta-button>
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
      userEmail: '',
      userPassword: '',
    };
  },
  computed: {
    ...mapState({
      order: state => state.order,
      step: state => state.steps[0],
      nextStep: state => state.steps.find((step, i) => ((i !== 0 && !step.valid) || i === 3)),
    }),
  },
};
</script>

<style>
  .Bruger-center {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
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
