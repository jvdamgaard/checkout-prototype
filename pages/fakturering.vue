<template>
  <div>
    <h1>Fakturering</h1>
    <row>
      <column width="2" />
      <column width="4">
        <box>
          <h2>Angiv adresse til fakturering <a href="#">kopier leveringsadresse</a></h2>
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
        </box>
      </column>
      <column width="4">
        <box fit="true">
          <h2>Betalingsmetode</h2>
          <div class="Betaling-payment-option">
            <input
              type="radio"
              name="payment-method"
              id="payment-method_card"
              value="card"
              :checked="true"
            />
            <label for="payment-method_card" >Betalingskort <img src="/images/dankort.png"><img src="/images/visa.png"><img src="/images/mastercard.png"></label>
            <div class="Betaling-payment-option-price">0,-</div>
            <div class="Betaling-payment-option-description description">Vi accepterer Dankort, Visa/Dankort, Visa, Visa Electron og MasterCard.</div>
          </div>
          <div class="Betaling-card" :class="{
              'Betaling-card--nordea': order.payment.details.number.length > 5
            }">
            <h2>Nordea <img :src="`/images/visa${(order.payment.details.number.length === 4 || order.payment.details.number.length === 5) ? '' : '-negative'}.svg`" /></h2>
            <label for="card">Kortnummer *</label>
            <input type="text" id="card" ref="card" placeholder="xxxx xxxx xxxx xxxx" minLength="16" maxLength="16" required :value="order.payment.details.number" @input="updateCardNumber" />
            <row :style="{ padding: 0, margin: '-0.5rem' }">
              <column width="8">
                <p>
                  Udløbsdato *<br>
                  <input type="text" id="month" ref="month" placeholder="mm" class="inline" minLength="2" maxLength="2" required size="2" :value="order.payment.details.month" @input="updateCardMonth" />
                  /
                  <input type="text" id="year" ref="year" placeholder="åå" class="inline" minLength="2" maxLength="2" required size="2" :value="order.payment.details.year" @input="updateCardYear" />
                </p>
              </column>
              <column width="4" style="text-align: right">
                <p>
                  CVC *<br />
                  <input type="text" id="cvc" ref="cvc" placeholder="xxx" class="inline" minLength="3" maxLength="3" required size="3" :value="order.payment.details.cvc" @input="updateCardCvc" />
                </p>
              </column>
            </row>
          </div>
          <div class="Betaling-payment-option">
            <input
              type="radio"
              name="payment-method"
              id="payment-method_mobilepay"
              value="mobilepay"
              :checked="false"
            />
            <label for="payment-method_card" >MobilePay <img src="/images/mobilepay.png"></label>
            <div class="Betaling-payment-option-price">0,-</div>
            <div class="Betaling-payment-option-description description">Du videreføres til side fra MobilePay efter du har bekræftiget købet.<br />
            OBS: Luk ikke denne side! Lukkes siden før tid, kan der opstå fejl. Vent og du føres automatisk videre til din kvittering.</div>
          </div>
        </box>
        <box fit="true">
          <h2>Rabatkode eller gavekort</h2>
          <row :style="{ padding: 0, margin: '-0.5rem' }">
            <column width="6">
              <input type="text" id="voucher" ref="voucher" :value="order.delivery.voucher" />
            </column>
            <column width="6">
              <cta-button to="#" :style="{
                'margin-top': '0.25rem',
                'line-height': '1.6rem',
                'padding-top': '0.75rem',
                'padding-bottom': '0.75rem',
              }">
                Indløs
              </cta-button>
            </column>
          </row>
        </box>
        <box fit="true" style="background-color: var(--color-grey-light); padding: 2rem">
          <row style="padding: 0; margin: -0.5rem">
            <column width="6">
              Pris i alt
            </column>
            <column width="6" style="text-align:right">
              {{selectedProduct.price}},-
            </column>
            <column width="6">
              Levering
            </column>
            <column width="6" style="text-align:right">
              0,-
            </column>
            <column width="6">
              Kortgebyr
            </column>
            <column width="6" style="text-align:right">
              0,-
            </column>
            <column width="6">
              <h2>Total</h2>
            </column>
            <column width="6" style="text-align:right">
              <h2>{{selectedProduct.price}},-</h2>
            </column>
          </row>
        </box>
      </column>
      <column width="2" />
    </row>
    <row>
      <column width="4" />
      <column width="4">
        <div class="Betaling-padding">
          <cta-button type="primary" :to="nextStep.path" :inactive="!step.valid">
            Videre til {{nextStep.title}}
          </cta-button>
        </div>
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
    selectedProduct() {
      return this.order.products.find(product => product.selected);
    },
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
    updateCardNumber(e) {
      this.$store.dispatch('updatePayment', { number: e.target.value });
    },
    updateCardMonth(e) {
      this.$store.dispatch('updatePayment', { month: e.target.value });
    },
    updateCardYear(e) {
      this.$store.dispatch('updatePayment', { year: e.target.value });
    },
    updateCardCvc(e) {
      this.$store.dispatch('updatePayment', { cvc: e.target.value });
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
  .Betaling-payment-option {
    margin: 0 -2rem;
    padding: 0.5rem 2rem;
    cursor: pointer;
  }
  .Betaling-payment-option * {
    cursor: pointer;
  }
  .Betaling-payment-option label {
    font-weight: 700;
    margin-bottom: 0 !important;
  }
  .Betaling-payment-option label img {
    vertical-align: middle;
    height: 1rem;
    margin-left: 0.5rem;
  }
  .Betaling-payment-option-price {
    float: right;
  }
  .Betaling-payment-option-description {
    padding: 0 2rem;
  }
  .Betaling-card {
    border: 1px solid var(--color-grey-light);
    padding: 2rem;
    border-radius: 1rem;
    margin: 1rem 0 2rem;
    transition: all 0.25s cubic-bezier(.5,0,.1,1);
  }
  .Betaling-card h2 {
    color: var(--color-white);
    margin-top: 0 !important;
  }
  .Betaling-card h2 img {
    float: right;
  }
  .Betaling-card--nordea {
    background-color: #0d6599;
    border-color: #0d6599;
    color: var(--color-white);
  }
  .Betaling-padding {
    padding: 2rem;
  }
</style>
