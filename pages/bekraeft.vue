<template>
  <div>
    <row>
      <column width="2" />
      <column width="5">
        <h1 :style="{ 'text-align': 'left' }">Bekræft</h1>
      </column>
      <column width="3">
        <cta-button type="primary" :to="nextStep.path" :inactive="!step.valid" :style="{
          'line-height': '3rem',
          'margin-top': '1rem'
        }">
          Afsend bestilling og betal
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
          <h2>Fakturering <nuxt-link to="/fakturering/">rediger</nuxt-link></h2>
          <p>
            {{order.invoice.name}}<br />
            {{order.invoice.street}} {{order.invoice.number}}<br />
            <template v-if="order.invoice.extra">
              {{order.invoice.extra}}<br />
            </template>
            {{order.invoice.zip}} {{order.invoice.city}}
          </p>
          <p>
            {{order.email}}
          </p>
          <h2>Levering <nuxt-link to="/levering/">rediger</nuxt-link></h2>
          <p>
            {{order.delivery.date}} kl. {{deliveryTime}}
          </p>
          <p>
            {{order.delivery.name}}<br />
            {{order.delivery.street}} {{order.delivery.number}}<br />
            <template v-if="order.delivery.extra">
              {{order.delivery.extra}}<br />
            </template>
            {{order.delivery.zip}} {{order.delivery.city}}
          </p>
          <h3>Betaling</h3>
          <p class="description">
            {{order.delivery.card}}
          </p>
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
          <cta-button type="primary" style="margin-top: 1rem" :to="nextStep.path" :inactive="!step.valid">
            Afsend bestilling og betal
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
  computed: {
    ...mapState({
      order: state => state.order,
      step: state => state.steps[0],
      nextStep: state => state.steps.find((step, i) => ((i !== 3 && !step.valid) || i === 3)),
    }),
    deliveryTime() {
      return this.order.delivery.times.find(time => time.selected).value;
    },
    selectedProduct() {
      return this.order.products.find(product => product.selected);
    },
  },
  methods: {
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
