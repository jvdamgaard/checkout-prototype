<template>
  <div>
    <h1>Kvittering</h1>
    <row>
      <column width="2" />
      <column width="4">
        <box>
          <h2>Tak</h2>
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
    }),
    selectedProduct() {
      return this.order.products.find(product => product.selected);
    },
  },
};
</script>

<style>
</style>
