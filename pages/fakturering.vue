<template>
  <div>
    <h1>Fakturering</h1>
    <row>
      <column width="4" />
      <column width="4">
        <box :focus="true">
          <h2>Angiv adresse til fakturering</h2>
          <label for="name">Navn *</label>
          <input type="text" id="name" ref="name" placeholder="Fulde Navn" :value="order.invoice.name" @input="updateName" />
          <row :style="{ padding: 0, margin: '-0.5rem' }">
            <column width="9">
              <label for="street">Vej *</label>
              <input type="text" id="street" ref="street" placeholder="Dinvej" :value="order.invoice.street" @input="updateStreet" />
            </column>
            <column width="3">
              <label for="number">Nummer *</label>
              <input type="text" id="number" ref="number" placeholder="20" :value="order.invoice.number" @input="updateNumber" />
            </column>
          </row>
          <label for="extra">Ekstra information til adresse</label>
          <input type="text" id="extra" ref="extra" placeholder="Min Arbejdsplads" :value="order.invoice.extra" @input="updateExtra" />
          <p class="description">Eksempelvis firmanavn.</p>
          <row :style="{ padding: 0, margin: '-0.5rem' }">
            <column width="3">
              <label for="zip">Postnummer *</label>
              <input type="text" id="zip" ref="zip" placeholder="8000" :value="order.invoice.zip" @input="updateZip" />
            </column>
            <column width="9">
              <label for="city">By *</label>
              <input type="text" id="city" ref="city" placeholder="Aarhus" :value="order.invoice.city" @input="updateCity" />
            </column>
          </row>
          <p :style="{ 'margin-top': '2rem' }">
            <cta-button type="primary" :to="nextStep.path" :inactive="!step.valid">
              Videre til {{nextStep.title}}
            </cta-button>
          </p>
        </box>
      </column>
      <column width="4" />
    </row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Row from '../components/Row.vue';
import Column from '../components/Column.vue';
import Box from '../components/Box.vue';
import CtaButton from '../components/CtaButton.vue';

function convertPlaceResponse(ctx) {
  const highlight = ctx.highlight ? ctx.highlight.name : undefined;
  const zip = ctx.hit.postcode[ctx.hit.postcode.length - 1];
  let city = ctx.hit.city ? ctx.hit.city[ctx.hit.city.length - 1] : undefined;
  if (ctx.hit.suburb) {
    city = ctx.hit.suburb[ctx.hit.suburb.length - 1];
  }
  return {
    highlight,
    street: ctx.name,
    zip,
    city,
  };
}

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
    };
  },
  computed: {
    ...mapState({
      order: state => state.order,
      step: state => state.steps[1],
      nextStep: state => state.steps.find((step, i) => ((i !== 1 && !step.valid) || i === 4)),
    }),
  },
  methods: {
    setFocusOn(number) {
      this.boxFocus = number;
    },
    updateName(e) {
      this.$store.dispatch('updateInvoice', { name: e.target.value });
    },
    updateStreet(e) {
      this.$store.dispatch('updateInvoice', { street: e.target.value });
    },
    updateNumber(e) {
      this.$store.dispatch('updateInvoice', { number: e.target.value });
    },
    updateExtra(e) {
      this.$store.dispatch('updateInvoice', { extra: e.target.value });
    },
    updateZip(e) {
      this.$store.dispatch('updateInvoice', { zip: e.target.value });
    },
    updateCity(e) {
      this.$store.dispatch('updateInvoice', { city: e.target.value });
    },
    focusOnInvalidField() {
      const refs = [
        this.$refs.name,
        this.$refs.street,
        this.$refs.number,
        this.$refs.zip,
        this.$refs.city,
      ];
      const nextInput = refs.find(ref => ref.value === '');
      if (nextInput) {
        nextInput.focus();
      }
    },
  },
  mounted() {
    const places = require('places.js'); // eslint-disable-line
    const placesAutocomplete = places({
      container: this.$refs.street,
      type: 'address',
      language: 'dk',
      countries: 'dk',
      style: false,
      templates: {
        suggestion(ctx) {
          const result = convertPlaceResponse(ctx);
          return `
            ${result.highlight}
            <small>
              ${result.zip ? `${result.zip}, ` : ''}
              ${result.city}
            </small>`;
        },
        value(ctx) {
          return ctx.name;
        },
      },
    });
    placesAutocomplete.on('change', (e) => {
      const result = convertPlaceResponse(e.suggestion);
      this.$store.dispatch('updateInvoice', result);
      this.focusOnInvalidField();
    });
    placesAutocomplete.on('clear', () => {
      this.$store.dispatch('updateInvoice', { street: '' });
    });

    this.focusOnInvalidField();
  },
};
</script>

<style>
</style>
