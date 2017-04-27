export const state = {
  order: {
    name: null,
    email: null,
    phone: null,
    invoice: {
      name: null,
      street: null,
      number: null,
      extra: null,
      zip: null,
      city: null,
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
      card: null,
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
    valid: false,
  }, {
    title: 'Fakturering',
    path: '/fakturering/',
    valid: false,
  }, {
    title: 'Levering',
    path: '/levering/',
    valid: false,
  }, {
    title: 'Betaling',
    path: '/betaling/',
    valid: true,
  }, {
    title: 'Bekræft',
    path: '/bekraeft/',
    valid: false,
  }],
};

export const mutations = {
  checkValidation(s) {
    s.steps[0].valid = (
      !!s.order.name && // should be set
      !!s.order.email // should be set (validate for email)
    );
    s.steps[1].valid = (
      !!s.order.invoice.name && // should be set
      !!s.order.invoice.street && // should be set
      !!s.order.invoice.zip && // should be set
      !!s.order.invoice.city // should be set
    );
    s.steps[2].valid = (
      !!s.order.delivery.name && // should be set
      !!s.order.delivery.street && // should be set
      !!s.order.delivery.zip && // should be set
      !!s.order.delivery.city && // should be set
      !!s.order.delivery.date // should be set
    );
    s.steps[4].valid = (
      !!s.steps[0].valid && // should be set
      !!s.steps[1].valid && // should be set
      !!s.steps[2].valid && // should be set
      !!s.steps[3].valid // should be set
    );
  },
  updateName(s, val) {
    if (s.order.name === s.order.invoice.name) {
      s.order.invoice.name = val;
    }
    s.order.name = val;
  },
  updateEmail(s, val) { s.order.email = val; },
  updatePhone(s, val) { s.order.phone = val; },
  updateInvoiceName(s, val) { s.order.invoice.name = val; },
  updateInvoiceStreet(s, val) { s.order.invoice.street = val; },
  updateInvoiceNumber(s, val) { s.order.invoice.number = val; },
  updateInvoiceExtra(s, val) { s.order.invoice.extra = val; },
  updateInvoiceZip(s, val) { s.order.invoice.zip = val; },
  updateInvoiceCity(s, val) { s.order.invoice.city = val; },
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
  updateProduct(s, size) {
    s.order.products = s.order.products.map(product => ({
      ...product,
      selected: (product.size === size),
    }));
  },
};

export const actions = {
  updateOrder({ commit }, { name, phone, email }) {
    if (name !== undefined) { commit('updateName', name); }
    if (email !== undefined) { commit('updateEmail', email); }
    if (phone !== undefined) { commit('updatePhone', phone); }
    commit('checkValidation');
  },
  updateInvoice({ commit }, { name, street, number, extra, zip, city }) {
    if (name !== undefined) { commit('updateInvoiceName', name); }
    if (street !== undefined) { commit('updateInvoiceStreet', street); }
    if (number !== undefined) { commit('updateInvoiceNumber', number); }
    if (extra !== undefined) { commit('updateInvoiceExtra', extra); }
    if (zip !== undefined) { commit('updateInvoiceZip', zip); }
    if (city !== undefined) { commit('updateInvoiceCity', city); }
    commit('checkValidation');
  },
  updateDelivery({ commit }, { name, street, number, extra, zip, city, date, time, card }) {
    if (name !== undefined) { commit('updateDeliveryName', name); }
    if (street !== undefined) { commit('updateDeliveryStreet', street); }
    if (number !== undefined) { commit('updateDeliveryNumber', number); }
    if (extra !== undefined) { commit('updateDeliveryExtra', extra); }
    if (zip !== undefined) { commit('updateDeliveryZip', zip); }
    if (city !== undefined) { commit('updateDeliveryCity', city); }
    if (date !== undefined) { commit('updateDeliveryDate', date); }
    if (time !== undefined) { commit('updateDeliveryTime', time); }
    if (card !== undefined) { commit('updateDeliveryCard', card); }
    commit('checkValidation');
  },
  updateProduct({ commit }, { size }) {
    commit('updateProduct', size);
  },
};
