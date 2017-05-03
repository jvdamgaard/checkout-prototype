<template>
  <row>
    <column width="7">
      <div class="Product-image" :style="{
        'background-image': `url(${selectedProduct.image})`
      }" />
    </column>
    <column width="5">
      <box>
        <h2>Kalanchoe buket</h2>
        <h3>Størrelse</h3>
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
      </box>
    </column>
  </row>
</template>

<script>
import { mapState } from 'vuex';
import Row from '../components/Row.vue';
import Column from '../components/Column.vue';
import CtaButton from '../components/CtaButton.vue';

export default {
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
  .Product-image {
    padding-bottom: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .Product-selection {
    margin: 0 -2rem;
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

