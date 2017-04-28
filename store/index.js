export const state = {
  order: {
    invoice: {
      name: null,
      street: null,
      number: null,
      extra: null,
      zip: null,
      city: null,
      email: null,
    },
    payment: {
      type: 'card',
      details: {
        number: '',
        month: '',
        year: '',
        cvc: '',
      },
    },
    delivery: {
      name: null,
      street: null,
      number: null,
      extra: null,
      zip: null,
      city: null,
      date: null,
      times: [{
        value: '08:00 - 21:00',
        selected: true,
      }, {
        value: '08:00 - 16:00',
        selected: false,
      }],
      phone: null,
    },
    products: [{
      image: 'https://flowr.dk/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/b/o/boeket_sk1_300.png',
      size: 'Stor i slaget',
      price: 300,
      selected: false,
    }, {
      image: 'https://flowr.dk/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/b/o/boeket_sk2_400.png',
      size: 'Flottenhejmer',
      price: 400,
      selected: true,
    }, {
      image: 'https://flowr.dk/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/b/o/boeket_sk3_500.png',
      size: 'Blærerøv',
      price: 500,
      selected: false,
    }],
  },
  steps: [{
    title: 'Bruger',
    path: '/bruger/',
    valid: true,
  }, {
  //   title: 'Fakturering',
  //   path: '/fakturering/',
  //   valid: false,
  // }, {
    title: 'Levering',
    path: '/levering/',
    valid: false,
  }, {
    title: 'Betaling',
    path: '/betaling/',
    valid: false,
  }, {
    title: 'Bekræft',
    path: '/bekraeft/',
    valid: false,
  }],
};

export const mutations = {
  checkValidation(s) {
    s.steps[1].valid = (
      !!s.order.delivery.name && // should be set
      !!s.order.delivery.street && // should be set
      !!s.order.delivery.number && // should be set
      !!s.order.delivery.zip && // should be set
      !!s.order.delivery.city && // should be set
      !!s.order.delivery.date // should be set
    );
    s.steps[2].valid = (
      !!s.order.invoice.email && // should be set
      !!s.order.invoice.name && // should be set
      !!s.order.invoice.street && // should be set
      !!s.order.invoice.zip && // should be set
      !!s.order.invoice.city // should be set
    );
    s.steps[3].valid = (
      !!s.steps[1].valid && // should be set
      !!s.steps[2].valid // should be set
    );
  },
  updateName(s, val) {
    if (s.order.name === s.order.invoice.name) {
      s.order.invoice.name = val;
    }
    s.order.name = val;
  },
  updateInvoiceEmail(s, val) { s.order.invoice.email = val; },
  updateInvoiceName(s, val) { s.order.invoice.name = val; },
  updateInvoiceStreet(s, val) { s.order.invoice.street = val; },
  updateInvoiceNumber(s, val) { s.order.invoice.number = val; },
  updateInvoiceExtra(s, val) { s.order.invoice.extra = val; },
  updateInvoiceZip(s, val) { s.order.invoice.zip = val; },
  updateInvoiceCity(s, val) { s.order.invoice.city = val; },
  updatePaymentNumber(s, val) { s.order.payment.details.number = val; },
  updateDeliveryName(s, val) { s.order.delivery.name = val; },
  updateDeliveryStreet(s, val) { s.order.delivery.street = val; },
  updateDeliveryNumber(s, val) { s.order.delivery.number = val; },
  updateDeliveryExtra(s, val) { s.order.delivery.extra = val; },
  updateDeliveryZip(s, val) { s.order.delivery.zip = val; },
  updateDeliveryCity(s, val) { s.order.delivery.city = val; },
  updateDeliveryDate(s, val) { s.order.delivery.date = val; },
  updateDeliveryCard(s, val) { s.order.delivery.card = val; },
  updateDeliveryTime(s, val) {
    s.order.delivery.times = s.order.delivery.times.map(time => ({
      ...time,
      selected: (time.value === val),
    }));
  },
  updateDeliveryPhone(s, val) { s.order.delivery.phone = val; },
  updateProduct(s, size) {
    s.order.products = s.order.products.map(product => ({
      ...product,
      selected: (product.size === size),
    }));
  },
};

export const actions = {
  updateInvoice({ commit }, { name, street, number, extra, zip, city, email }) {
    if (name !== undefined) { commit('updateInvoiceName', name); }
    if (street !== undefined) { commit('updateInvoiceStreet', street); }
    if (number !== undefined) { commit('updateInvoiceNumber', number); }
    if (extra !== undefined) { commit('updateInvoiceExtra', extra); }
    if (zip !== undefined) { commit('updateInvoiceZip', zip); }
    if (city !== undefined) { commit('updateInvoiceCity', city); }
    if (email !== undefined) { commit('updateInvoiceEmail', email); }
    commit('checkValidation');
  },
  updatePayment({ commit }, { number }) {
    if (number !== undefined) { commit('updatePaymentNumber', number); }
    commit('checkValidation');
  },
  updateDelivery({ commit }, { name, street, number, extra, zip, city, date, time, card, phone }) {
    if (name !== undefined) { commit('updateDeliveryName', name); }
    if (street !== undefined) { commit('updateDeliveryStreet', street); }
    if (number !== undefined) { commit('updateDeliveryNumber', number); }
    if (extra !== undefined) { commit('updateDeliveryExtra', extra); }
    if (zip !== undefined) { commit('updateDeliveryZip', zip); }
    if (city !== undefined) { commit('updateDeliveryCity', city); }
    if (date !== undefined) { commit('updateDeliveryDate', date); }
    if (time !== undefined) { commit('updateDeliveryTime', time); }
    if (card !== undefined) { commit('updateDeliveryCard', card); }
    if (phone !== undefined) { commit('updateDeliveryPhone', phone); }
    commit('checkValidation');
  },
  updateProduct({ commit }, { size }) {
    commit('updateProduct', size);
  },
};
