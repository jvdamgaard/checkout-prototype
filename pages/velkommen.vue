<template>
  <div>
    <h1>Velkommen</h1>
    <row>
      <column width="2" />
      <column width="4">
        <box>
          <h2>Jeg er allerede bruger på flowr.dk</h2>
          <div @click="login">
            <cta-button type="facebook" :to="nextStep.path" @click="login">
              Log på med Facebook
            </cta-button>
          </div>
          <div class="Bruger-or"><span>eller</span></div>
          <label for="user-email">E-mail</label>
          <input type="email" id="user-email" ref="user-email" placeholder="din@mail.dk" v-model="userEmail" />
          <label for="user-password">Kodeord</label>
          <input type="password" id="user-password" ref="user-password" placeholder="******" v-model="userPassword" />
          <input type="checkbox" name="remember" :checked="true" />
          <label for="remember">Husk mig</label>
          <p>
            <div @click="login">
              <cta-button type="primary" :to="nextStep.path" :inactive="(!userEmail || !userPassword) ">Log på</cta-button>
            </div>
          </p>
        </box>
      </column>
      <column width="4">
        <box>
          <h2>Jeg er ny bruger</h2>
          <label for="name">Navn *</label>
          <input type="text" id="name" ref="name" placeholder="Dit Fulde Navn" :value="user.name" @input="updateName" />
          <label for="email">E-mail *</label>
          <input type="text" id="email" ref="email" placeholder="din@mail.dk" :value="user.email" @input="updateEmail" />
          <p class="description">Bruges til at sende ordrebekræftigelse. Du bliver ikke automatisk tilmeldt nogen form for nyhedsbrev.</p>
          <label for="phone">Mobilnummer</label>
          <input type="text" id="phone" ref="phone" placeholder="12 34 56 78" :value="user.phone" @blur="updatePhone" />
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
      userEmail: '',
      userPassword: '',
    };
  },
  computed: {
    ...mapState({
      order: state => state.order,
      user: state => state.user,
      step: state => state.steps[0],
      nextStep: state => state.steps.find((step, i) => ((i !== 0 && !step.valid) || i === 3)),
    }),
  },
  methods: {
    setFocusOn(number) {
      this.boxFocus = number;
    },
    updateName(e) {
      this.$store.dispatch('updateUser', { name: e.target.value });
    },
    updateEmail(e) {
      this.$store.dispatch('updateUser', { email: e.target.value });
    },
    updatePhone(e) {
      this.$store.dispatch('updateUser', { phone: e.target.value });
    },
    login() {
      this.$store.commit('updateUserName', 'Jakob Viskum Damgaard');
      this.$store.commit('updateUserPhone', '31905030');
      this.$store.commit('updateUserEmail', 'jakob.viskum.damgaard@gmail.com');
      this.$store.commit('addUserDeliveryAddresses', {
        selected: true,
        name: 'Birgitte Viskum',
        city: 'Risskov',
        zip: '8240',
        street: 'Agerbæksvej',
        number: '8N',
      });
      this.$store.commit('addUserDeliveryAddresses', {
        selected: false,
        name: 'Lene Nannerup',
        city: 'Åbyhøj',
        zip: '8230',
        street: 'Jønhøjvej',
        number: '20',
      });
      this.$store.commit('addUserInvoiceAddresses', {
        selected: true,
        city: 'Åbyhøj',
        zip: '8230',
        street: 'Jønhøjvej',
        number: '20',
      });
      this.$store.commit('addUserInvoiceAddresses', {
        selected: false,
        city: 'Aarhus C',
        zip: '8000',
        street: 'Volden',
        number: '12, 2.',
      });
      this.$store.commit('addUserPaymentCards', {
        selected: true,
        number: '457122******1234',
        month: '09',
        year: '19',
      });
      this.$store.commit('addUserPaymentCards', {
        selected: false,
        number: '457122******5678',
        month: '03',
        year: '22',
      });
      this.$store.commit('checkValidation');
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
  .Kvittering-product-image {
    padding-bottom: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .Bruger-center {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .Bruger-or {
    position: relative;
    text-align: center;
    margin: 2rem -2rem;
    z-index: 1;
  }
  .Bruger-or:after {
    content: '';
    position: absolute;
    border-top: 1px solid var(--color-grey-light);
    width: 100%;
    left: 0;
    top: 50%;
    z-index: -1;
  }
  .Bruger-or span {
    display: inline-block;
    background-color: var(--color-white);
    padding: 0 2rem;
    z-index: 2;
  }
</style>
