<template>
  <row class="Product">
    <column width="6">
      <div class="Product-image" :style="{
        'background-image': `url(${selectedProduct.image})`
      }" />
    </column>
    <column width="1" />
    <column width="5">
      <h1 class="Product-header">Kalanchoe buket</h1>
      <p class="Product-description">Queen® buketten er sammensat af smukke kalanchoe, i et skønt miks af hvide, rosa og pink blomster. Blomstrende sukkulenter, der sammen giver en elegant buket med et naturligt look. Buketterne er nemme at have med at gøre, fordi de kræver minimal pleje og vedligeholdelse, og så vil du opleve, at buketten holder sig frisk i minimum 3 uger. Vandet forbliver klart og lugtfrit og skal ikke skiftes. Buketten kan bruges til alle anledninger og passer perfekt til den kvalitetsbevidste, som sætter pris på smukke blomster, der kan holde sig friske i ekstra lang tid.</p>
      <h3>Vælg størrelse</h3>
      <div v-for="product in order.products" class="Product-selection" :class="{
        'Product-selection--selected': product.selected,
      }" @click="updateProduct(product)">
        <input
          type="radio"
          name="product"
          :id="`product_${product.size}`"
          :value="product.size"
          :checked="product.selected"
        />
        <label :for="`product_${product.size}`" ><img :src="product.image" /> <span>{{product.size}}</span></label>
        <div class="Product-price">{{product.price}},-</div>
      </div>
      <p>
        <cta-button type="primary" to="/bruger/">
          Køb nu
        </cta-button>
      </p>
      <p>
        <strong>GRATIS LEVERING</strong>. Du får både gavekort og æske med i prisen.<br />
        <strong>FÅ DEN LEVERET ALLEREDE I MORGEN</strong>. Bestil inden kl 13.<br />
        <strong>FÅS NU</strong>. Er tilgængelig i perioden 20. december 2016 til 15. april 2017
      </p>
    </column>
  </row>
</template>

<script>
import { mapState } from 'vuex';
import Row from '../components/Row.vue';
import Column from '../components/Column.vue';
import CtaButton from '../components/CtaButton.vue';

export default {
  layout: 'product',
  components: {
    Row,
    Column,
    CtaButton,
  },
  computed: {
    ...mapState({
      order: state => state.order,
    }),
    selectedProduct() {
      return this.order.products.find(product => product.selected);
    },
  },
  methods: {
    updateProduct(product) {
      this.$store.dispatch('updateProduct', product);
    },
  },
};
</script>

<style>
  .Product {
    background-color: var(--color-white);
    padding-top: 10rem !important;
    padding-bottom: 10rem !important;
  }
  .Product-image {
    padding-bottom: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .Product-header {
    font-weight: 300;
    text-align: left;
    text-transform: none;
  }
  .Product-description {
    font-size: 1.2rem;
    font-weight: 300;
  }
  .Product-selection {
    padding: 0.5rem 2rem;
    cursor: pointer;
    transition: background-color 0.25s cubic-bezier(.5,0,.1,1);
  }
  .Product-selection * {
    cursor: pointer;
  }
  .Product-selection--selected {
    background-color: var(--color-grey-light);
  }
  .Product-selection img {
    height: 4rem;
    margin-right: 1rem;
    margin-left: 1rem;
    vertical-align: middle;
  }
  .Product-selection label {
    margin-bottom: 0 !important;
  }
  .Product-price {
    float: right;
    line-height: 1;
    font-weight: 700;
    line-height: 4rem;
  }
</style>

