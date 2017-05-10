<template>
  <div>
    <h1>Levering</h1>
    <row>
      <column width="4">
        <box>
          <h2>Leveringsadresse</h2>
          <template v-if="user.deliveryAddresses.length > 0">
            <div v-for="(deliveryAddress, index) in user.deliveryAddresses" class="Levering-address-choice" @click="selectAddress({ index })">
              <input
                type="radio"
                name="deliveryAddress"
                :id="`deliveryAddress-${index}`"
                :value="index"
                :checked="deliveryAddress.selected"
              />
              <label :for="`deliveryAddress-${index}`">
                {{deliveryAddress.name}}<br />
                {{deliveryAddress.street}} {{deliveryAddress.number}}<br />
                <template v-if="deliveryAddress.extra">
                  {{deliveryAddress.extra}}<br />
                </template>
                {{deliveryAddress.zip}} {{deliveryAddress.city}}
                <template v-if="deliveryAddress.description">
                  <br /><span class="description">{{deliveryAddress.description}}</span>
                </template>
              </label>
            </div>
            <div class="Levering-address-choice" @click="unselectAddress">
              <input
                type="radio"
                name="deliveryAddress"
                id="deliveryAddress-none"
                value=""
                :checked="!selectedAddress"
              />
              <label for="deliveryAddress-none">
                Brug en anden adresse
              </label>
            </div>
          </template>
          <div v-show="!selectedAddress">
            <h3>Søg leveringsadresse</h3>
            <label for="deliveryPhone">Telefonnummer på modtageren</label>
            <row :style="{ padding: 0, margin: '0 -0.5rem' }">
              <column width="8">
                <input type="tel" id="deliveryPhone" ref="deliveryPhone" placeholder="12 34 56 78" v-model="deliveryAddressPhone" @keyup.enter="getDeliveryAddressFromPhone"/>
              </column>
              <column width="4">
                <div @click.stop="getDeliveryAddressFromPhone">
                  <cta-button to="#" :style="{
                    'margin-top': '0.25rem',
                    'line-height': '1.6rem',
                    'padding-top': '0.75rem',
                    'padding-bottom': '0.75rem',
                  }">
                    Søg
                  </cta-button>
                </div>
              </column>
            </row>
            <p v-if="deliveryPhoneError" class="error">Vi kunne desværre ikke finde en adresse ud fra det indtastede telefonnummer.</p>
            <p v-if="!deliveryPhoneError" class="description">Vi bruger nummeroplysningen til nemt og hurtigt at finde din leveringsadresse.</p>
            <label for="name">Navn *</label>
            <input type="text" id="name" ref="name" placeholder="Fulde Navn" :value="order.delivery.name" @input="updateName" />
            <row :style="{ padding: 0, margin: '-0.5rem' }">
              <column width="9">
                <label for="street">Vej *</label>
                <input type="text" id="street" ref="street" placeholder="Dinvej" :value="order.delivery.street" @input="updateStreet" />
              </column>
              <column width="3">
                <label for="number">Nummer *</label>
                <input type="text" id="number" ref="number" placeholder="20" :value="order.delivery.number" @input="updateNumber" />
              </column>
            </row>
            <label for="extra">Ekstra information til adresse</label>
            <input type="text" id="extra" ref="extra" placeholder="Afdeling 3083, stue 7" maxlength="40" :value="order.delivery.extra" @input="updateExtra" />
            <p class="description">Eksempelvis afdeling og stue på hospital. {{order.delivery.extra ? order.delivery.extra.length : 0}} af 40 tegn brugt.</p>
            <row :style="{ padding: 0, margin: '-0.5rem' }">
              <column width="4">
                <label for="zip">Postnummer *</label>
                <input type="text" id="zip" ref="zip" placeholder="8000" :value="order.delivery.zip" @input="updateZip" />
              </column>
              <column width="8">
                <label for="city">By *</label>
                <input type="text" id="city" ref="city" placeholder="Aarhus" :value="order.delivery.city" @input="updateCity" />
              </column>
            </row>
          </div>
        </box>
      </column>
      <column width="4">
        <box>
          <h2>Leveringstidspunkt</h2>
          <label for="date">Dato *</label>
          <input type="date" id="date" ref="date" placeholder="ÅÅÅÅ-MM-DD" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" :min="fromDate" :max="toDate" :value="order.delivery.date" @input="updateDate" />
          <h3>Tidspunkt *</h3>
          <div v-for="time in order.delivery.times">
            <input
              type="radio"
              name="time"
              :id="`time_${time.value}`"
              :value="time.value"
              :checked="time.selected"
              @change="updateTime"
            />
            <label :for="`time_${time.value}`">{{time.value}}</label>
          </div>
          <h3>Modtag SMS om levering</h3>
          <label for="phone">Mobilnummer</label>
          <input type="tel" id="phone" ref="phone" placeholder="12 34 56 78" :value="user.phone" @input="updatePhone" />
          <p class="description">Vi sender en sms aftenen inden med et mere præcist leveringsinterval på 4 timer samt en sms når buketten er leveret.</p>
        </box>
      </column>
      <column width="4">
        <box class="Levering-box">
          <h2>Send et gratis kort med buketten</h2>
          <label for="card">Din hilsen</label>
          <textarea
            id="card"
            name="gift-card"
            ref="card"
            placeholder="Kære ..."
            maxlength="300"
            rows="14"
            spellcheck="true"
            @input="updateCard"
          >{{order.delivery.card}}</textarea>
          <p class="description">{{order.delivery.card ? order.delivery.card.length : 0}} af 300 tegn brugt.</p>
        </box>
      </column>
    </row>
    <row>
      <column width="4" />
      <column width="4">
        <div class="Levering-padding">
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
import axios from 'axios';
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

const now = new Date(Date.now());
const fromDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 1)); // 1 days
const toDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 15)); // 15 days

if (now.getHours() >= 13) {
  fromDate.setDate(fromDate.getDate() + 1);
}

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
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
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      deliveryAddressPhone: '',
      deliveryPhoneError: false,
    };
  },
  computed: {
    ...mapState({
      order: state => state.order,
      user: state => state.user,
      step: state => state.steps[1],
      nextStep: state => state.steps.find((step, i) => ((i !== 1 && !step.valid) || i === 3)),
    }),
    selectedAddress() {
      return this.user.deliveryAddresses.find(address => address.selected);
    },
  },
  methods: {
    updateName(e) {
      this.$store.dispatch('updateDelivery', { name: e.target.value });
    },
    updateStreet(e) {
      this.$store.dispatch('updateDelivery', { street: e.target.value });
    },
    updateNumber(e) {
      this.$store.dispatch('updateDelivery', { number: e.target.value });
    },
    updateExtra(e) {
      this.$store.dispatch('updateDelivery', { extra: e.target.value });
    },
    updateZip(e) {
      this.$store.dispatch('updateDelivery', { zip: e.target.value });
    },
    updateCity(e) {
      this.$store.dispatch('updateDelivery', { city: e.target.value });
    },
    updateDate(e) {
      this.$store.dispatch('updateDelivery', { date: e.target.value });
    },
    updateTime(e) {
      this.$store.dispatch('updateDelivery', { time: e.target.value });
    },
    updateCard(e) {
      this.$store.dispatch('updateDelivery', { card: e.target.value });
    },
    updatePhone(e) {
      this.$store.dispatch('updateUser', { phone: e.target.value });
    },
    focusOnInvalidField() {
      const refs = [
        this.$refs.name,
        this.$refs.street,
        this.$refs.number,
        this.$refs.zip,
        this.$refs.city,
        this.$refs.date,
      ];
      const nextInput = refs.find(ref => ref.value === '');
      if (nextInput) {
        nextInput.focus();
      }
    },
    getDeliveryAddressFromPhone() {
      axios
        .get(`https://www.bilka.dk/lookup/addressforphonenumber/${this.deliveryAddressPhone}`)
        .then((response) => {
          if (response.status === 200) {
            this.deliveryPhoneError = false;
            this.$store.dispatch('updateDelivery', {
              city: response.data.town,
              zip: response.data.zipcode,
              street: response.data.address.substring(0, response.data.address.lastIndexOf(' ')),
              number: response.data.address.split(' ').splice(-1)[0],
            });
            this.focusOnInvalidField();
          } else {
            this.deliveryPhoneError = true;
          }
        })
        .catch(() => {
          this.deliveryPhoneError = true;
        });
    },
    unselectAddress() {
      this.$store.dispatch('selectDeliveryAddresses', { index: null });
      this.focusOnInvalidField();
    },
    selectAddress(address) {
      this.$store.dispatch('selectDeliveryAddresses', address);
      this.focusOnInvalidField();
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
      this.$store.dispatch('updateDelivery', result);
      this.focusOnInvalidField();
    });
    placesAutocomplete.on('clear', () => {
      this.$store.dispatch('updateDelivery', { street: '' });
    });

    this.focusOnInvalidField();
  },
};
</script>

<style>
  .Levering-address-choice {
    margin: 0rem -2rem;
    padding: 0.5rem 2rem;
    cursor: pointer;
  }
  .Levering-address-choice * {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }
  .Levering-address-choice label {
    margin-bottom: 0 !important;
  }
  .Levering-right {
    text-align: right;
  }
  .Levering-padding {
    padding: 2rem;
  }
</style>
