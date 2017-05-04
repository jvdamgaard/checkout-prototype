<template>
  <div>
    <row>
      <column width="2" />
      <column width="8">
        <h1 :style="{ 'text-align': 'left' }">Kvittering</h1>
      </column>
      <column width="2" />
    </row>
    <row>
      <column width="2" />
      <column width="4">
        <box fit="true">
          <h2>Din bestilling</h2>
          <div class="Kvittering-product-image" :style="{
            'background-image': `url(${selectedProduct.image})`
          }" />
          <p>Kalanchoe buket: {{selectedProduct.size}}</p>
        </box>
        <box fit="true">
          <h2>Levering</h2>
          <p>
            {{order.delivery.name}}<br />
            {{order.delivery.street}} {{order.delivery.number}}<br />
            <template v-if="order.delivery.extra">
              {{order.delivery.extra}}<br />
            </template>
            {{order.delivery.zip}} {{order.delivery.city}}<br />
            <em>{{order.delivery.date}} kl. {{deliveryTime}}</em>
          </p>
          <h3>Kort</h3>
          <p class="description">
            {{order.delivery.card}}
          </p>
          <h2>Betaling</h2>
          <p>
            {{user.name}}<br />
            {{order.invoice.street}} {{order.invoice.number}}<br />
            <template v-if="order.invoice.extra">
              {{order.invoice.extra}}<br />
            </template>
            {{order.invoice.zip}} {{order.invoice.city}}<br />
            <em>{{user.email}}</em>
          </p>
          <h3>Betalingsmetode</h3>
          <p>
            <img src="https://jvdamgaard.github.io/checkout-prototype/images/visa.png">
            {{order.payment.details.number.substring(0,4)}}
            {{order.payment.details.number.substring(4,6)}}**
            ****
            {{order.payment.details.number.substring(12,16)}}
          </p>
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
        </box>
      </column>
      <column width="4">
        <box fit="true" class="Kvittering-highlight">
          <h2>Få 10% rabat på dit næste køb</h2>
          <p>Opret dig som bruger og:</p>
          <ul>
            <li>Få 10% rabat på næste køb</li>
            <li>Få muligheden for at blive påmindet særlige begivenheder</li>
            <li>Gør næste købe endnu nemmere</li>
            <li>Se og rediger dine tidligere bestillinger</li>
          </ul>
        </box>
        <box fit="true" class="Kvittering-sign-up">
          <cta-button type="facebook" to="#">
            Opret med Facebook
          </cta-button>
          <div class="Kvittering-or"><span>eller</span></div>
          <label for="user-email">E-mail</label>
          <input type="email" id="user-email" ref="user-email" v-model="userEmail" />
          <label for="user-password">Kodeord</label>
          <input type="password" id="user-password" ref="user-password" placeholder="******" v-model="userPassword" />
          <input type="checkbox" name="remember" :checked="true" />
          <label for="remember">Husk mig</label>
          <p>
            <cta-button type="primary" to="#" :inactive="(!userEmail || !userPassword)">
              Opret bruger
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
  layout: 'blank',
  components: {
    Row,
    Column,
    Box,
    CtaButton,
  },
  data() {
    return {
      userPassword: '',
    };
  },
  computed: {
    ...mapState({
      order: state => state.order,
      user: state => state.user,
    }),
    deliveryTime() {
      return this.order.delivery.times.find(time => time.selected).value;
    },
    selectedProduct() {
      return this.order.products.find(product => product.selected);
    },
    userEmail() {
      return this.user.email;
    },
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
  .Kvittering-product-price {
    float: right;
    line-height: 1;
    font-weight: 700;
    line-height: 4rem;
  }
  .Kvittering-highlight {
    background-color: var(--color-primary) !important;
    color: var(--color-white);
    margin-bottom: 0 !important;
    position: relative;
  }
  .Kvittering-highlight:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    margin-left: -1.5rem;
    width: 0;
    height: 0;
    border-left: 1.5rem solid transparent;
    border-right: 1.5rem solid transparent;
    border-top: 1rem solid var(--color-primary);
  }
  .Kvittering-highlight h2 {
    font-size: 2rem !important;
    line-height: 1.2;
  }
  .Kvittering-highlight p, .Kvittering-highlight li {
    font-size: 1.2rem;
  }
  .Kvittering-sign-up {
    padding-top: 2rem !important;
  }
  .Kvittering-or {
    position: relative;
    text-align: center;
    margin: 4rem -2rem;
    z-index: 1;
  }
  .Kvittering-or:after {
    content: '';
    position: absolute;
    border-top: 1px solid var(--color-grey-light);
    width: 100%;
    left: 0;
    top: 50%;
    z-index: -1;
  }
  .Kvittering-or span {
    display: inline-block;
    background-color: var(--color-white);
    padding: 0 2rem;
    z-index: 2;
  }
</style>
