<template>
  <div>
    <row>
      <column width="2" />
      <column width="5">
        <h1 :style="{ 'text-align': 'left' }">Bekræft</h1>
      </column>
      <column width="3">
        <cta-button v-if="step.valid" type="primary" to="/kvittering/" :style="{
          'line-height': '3rem',
          'margin-top': '1rem'
        }">
          Afsend bestilling og betal
        </cta-button>
        <cta-button v-if="!step.valid" type="primary" :to="nextStep.path" :style="{
          'line-height': '3rem',
          'margin-top': '1rem'
        }">
          Udfyld {{nextStep.title}}
        </cta-button>
      </column>
      <column width="2" />
    </row>
    <row>
      <column width="2" />
      <column width="4">
        <box>
          <h2>Kalanchoe buket <nuxt-link to="/">vælg en anden buket</nuxt-link></h2>
          <div class="Bekraeft-product-image" :style="{
            'background-image': `url(${selectedProduct.image})`
          }" />
          <h3>Størrelse</h3>
          <div v-for="product in order.products" class="Bekraeft-product-selection" :class="{
            'Bekraeft-product-selection--selected': product.selected,
          }" @click="updateProduct(product)">
            <input
              type="radio"
              name="product"
              :id="`product_${product.size}`"
              :value="product.size"
              :checked="product.selected"
            />
            <label :for="`product_${product.size}`" ><img :src="product.image" /> <span>{{product.size}}</span></label>
            <div class="Bekraeft-product-price">{{product.price}},-</div>
          </div>
        </box>
      </column>
      <column width="4">
        <box fit="true">
          <h2>Levering <nuxt-link to="/levering/">rediger</nuxt-link></h2>
          <p v-if="!steps[1].valid" class="error">Mangler at blive udfyldt. <nuxt-link to="/levering/">Rediger levering</nuxt-link> før du kan købe.</p>
          <p>
            {{selectedDeliveryAddress.name}}<br />
            {{selectedDeliveryAddress.street}} {{selectedDeliveryAddress.number}}<br />
            <template v-if="selectedDeliveryAddress.extra">
              {{selectedDeliveryAddress.extra}}<br />
            </template>
            {{selectedDeliveryAddress.zip}} {{selectedDeliveryAddress.city}}<br />
            <em>{{order.delivery.date}} kl. {{deliveryTime}}</em>
          </p>
          <h3>Kort</h3>
          <p class="description">
            {{order.delivery.card}}
          </p>
          <h2>Betaling <nuxt-link to="/betaling/">rediger</nuxt-link></h2>
          <p v-if="!steps[2].valid" class="error">Mangler at blive udfyldt. <nuxt-link to="/betaling/">Rediger betaling</nuxt-link> før du kan købe.</p>
          <p>
            {{selectedInvoiceAddress.name}}<br />
            {{selectedInvoiceAddress.street}} {{selectedInvoiceAddress.number}}<br />
            <template v-if="selectedInvoiceAddress.extra">
              {{selectedInvoiceAddress.extra}}<br />
            </template>
            {{selectedInvoiceAddress.zip}} {{selectedInvoiceAddress.city}}<br />
            <em>{{user.email}}</em>
          </p>
          <h3>Betalingsmetode</h3>
          <p>
            <img src="https://jvdamgaard.github.io/checkout-prototype/images/visa.png">
            {{selectedPaymentCard.number.substring(0,4)}}
            {{selectedPaymentCard.number.substring(4,6)}}**
            ****
            {{selectedPaymentCard.number.substring(12,16)}}
            <span class="description">{{selectedPaymentCard.month}}/{{selectedPaymentCard.year}}</span>
          </p>
        </box>
        <box fit="true">
          <h2>Rabatkode eller gavekort</h2>
          <row :style="{ padding: 0, margin: '-0.5rem' }">
            <column width="8">
              <input type="text" id="voucher" ref="voucher" v-model="voucher" @keyup.enter="addVoucher" />
            </column>
            <column width="4">
              <div @click.stop="addVoucher">
                <cta-button to="#" :style="{
                  'margin-top': '0.25rem',
                  'line-height': '1.6rem',
                  'padding-top': '0.75rem',
                  'padding-bottom': '0.75rem',
                }">
                  Indløs
                </cta-button>
              </div>
            </column>
          </row>
        </box>
        <box fit="true" style="background-color: var(--color-grey-light); padding: 2rem">
          <row style="padding: 0; margin: -0.5rem">
            <column width="6">
              Buket
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
              Betalingsgebyr
            </column>
            <column width="6" style="text-align:right">
              0,-
            </column>
            <column v-if="order.payment.voucher.savings > 0" width="6" style="color: red">
              Rabat ({{order.payment.voucher.title}} - {{order.payment.voucher.savings * 100}}%)
            </column>
            <column v-if="order.payment.voucher.savings > 0" width="6" style="text-align:right; color: red">
              - {{order.payment.voucher.savings * selectedProduct.price}},-
            </column>
            <column width="6">
              <h2>Total</h2>
            </column>
            <column width="6" style="text-align:right">
              <h2>{{selectedProduct.price - (order.payment.voucher.savings * selectedProduct.price)}},-</h2>
            </column>
          </row>
          <cta-button v-if="step.valid" type="primary" style="margin-top: 1rem" to="/kvittering/">
            Afsend bestilling og betal
          </cta-button>
          <cta-button v-if="!step.valid" type="primary" style="margin-top: 1rem" :to="nextStep.path">
            Udfyld {{nextStep.title}}
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
      voucher: '',
    };
  },
  computed: {
    ...mapState({
      order: state => state.order,
      user: state => state.user,
      step: state => state.steps[3],
      steps: state => state.steps,
      nextStep: state => state.steps.find((step, i) => ((i !== 3 && !step.valid) || i === 3)),
    }),
    deliveryTime() {
      return this.order.delivery.times.find(time => time.selected).value;
    },
    selectedProduct() {
      return this.order.products.find(product => product.selected);
    },
    selectedInvoiceAddress() {
      let selectedInvoiceAddress = this.user.invoiceAddresses.find(address => address.selected);
      if (!selectedInvoiceAddress) {
        selectedInvoiceAddress = this.order.invoice;
      }
      return selectedInvoiceAddress;
    },
    selectedDeliveryAddress() {
      let selectedDeliveryAddress = this.user.deliveryAddresses.find(address => address.selected);
      if (!selectedDeliveryAddress) {
        selectedDeliveryAddress = this.order.delivery;
      }
      return selectedDeliveryAddress;
    },
    selectedPaymentCard() {
      let selectedPaymentCard = this.user.paymentCards.find(card => card.selected);
      if (!selectedPaymentCard) {
        selectedPaymentCard = this.order.payment.details;
      }
      return selectedPaymentCard;
    },
  },
  methods: {
    addVoucher() {
      this.$store.dispatch('addVoucher', { title: this.voucher });
    },
    updateProduct(product) {
      this.$store.dispatch('updateProduct', product);
    },
    updateVoucher(product) {
      this.$store.dispatch('updateProduct', product);
    },
  },
};
</script>

<style>
  .Bekraeft-product-image {
    padding-bottom: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .Bekraeft-product-selection {
    margin: 0 -2rem;
    padding: 0.5rem 2rem;
    cursor: pointer;
    transition: background-color 0.25s cubic-bezier(.5,0,.1,1);
  }
  .Bekraeft-product-selection * {
    cursor: pointer;
  }
  .Bekraeft-product-selection--selected {
    background-color: var(--color-grey-light);
  }
  .Bekraeft-product-selection img {
    height: 4rem;
    margin-right: 1rem;
    vertical-align: middle;
  }
  .Bekraeft-product-selection label {
    margin-bottom: 0 !important;
  }
  .Bekraeft-product-price {
    float: right;
    line-height: 1;
    font-weight: 700;
    line-height: 4rem;
  }
</style>
