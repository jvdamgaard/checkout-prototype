import axios from 'axios';

export const state = {
  prototypeAccepted: false,
  user: {
    name: null,
    email: null,
    invoiceAddresses: [],
    deliveryAddresses: [],
    paymentCards: [],
  },
  order: {
    invoice: {
      name: null,
      street: null,
      number: null,
      extra: null,
      zip: null,
      city: null,
    },
    payment: {
      type: 'card',
      details: {
        number: '',
        month: '',
        year: '',
        cvc: '',
      },
      voucher: {
        title: '',
        savings: 0,
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
      image: '/checkout-prototype/images/small.png',
      size: 'Stor i slaget',
      price: 300,
      selected: false,
    }, {
      image: '/checkout-prototype/images/medium.png',
      size: 'Flottenhejmer',
      price: 400,
      selected: true,
    }, {
      image: '/checkout-prototype/images/large.png',
      size: 'Blærerøv',
      price: 500,
      selected: false,
    }],
  },
  steps: [{
    title: 'Velkommen',
    path: '/velkommen/',
    valid: false,
  }, {
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
    s.steps[0].valid = (
      !!s.user.email && // should be set
      !!s.user.name // should be set
    );
    s.steps[1].valid = (
      (
        !!s.user.deliveryAddresses.find(address => address.selected) ||
        (
          !!s.order.delivery.name && // should be set
          !!s.order.delivery.street && // should be set
          !!s.order.delivery.number && // should be set
          !!s.order.delivery.zip && // should be set
          !!s.order.delivery.city // should be set
        )
      ) &&
      !!s.order.delivery.date // should be set
    );
    s.steps[2].valid = (
      (
        !!s.user.invoiceAddresses.find(address => address.selected) ||
        (
          !!s.order.invoice.name && // should be set
          !!s.order.invoice.street && // should be set
          !!s.order.invoice.number && // should be set
          !!s.order.invoice.zip && // should be set
          !!s.order.invoice.city // should be set
        )
      ) &&
      (
        !!s.user.paymentCards.find(card => card.selected) ||
        (
          !!s.order.payment.details.number && // should be set
          !!s.order.payment.details.month && // should be set
          !!s.order.payment.details.year && // should be set
          !!s.order.payment.details.cvc // should be set
        )
      )
    );
    s.steps[3].valid = (
      !!s.steps[1].valid && // should be set
      !!s.steps[2].valid // should be set
    );
  },
  updateUserName(s, val) {
    if (s.user.name === s.order.invoice.name) {
      s.order.invoice.name = val;
    }
    s.user.name = val;
  },
  updateUserEmail(s, val) { s.user.email = val; },
  updateUserPhone(s, val) { s.user.phone = val; },
  updateUserInvoiceAddresses(s, val) {
    s.user.invoiceAddresses = [{
      ...val,
      name: val.name || s.user.name || 'Lars Flemming :-)',
      selected: val.selected || false,
    }];
  },
  addUserInvoiceAddresses(s, val) {
    s.user.invoiceAddresses.push({
      ...val,
      name: val.name || s.user.name || 'Lars Flemming :-)',
      selected: val.selected || false,
    });
  },
  updateUserInvoiceAddressesSelection(s, val) {
    s.user.invoiceAddresses = s.user.invoiceAddresses.map((address, i) => ({
      ...address,
      selected: i === val,
    }));
  },
  updateUserDeliveryAddressesSelection(s, val) {
    s.user.deliveryAddresses = s.user.deliveryAddresses.map((address, i) => ({
      ...address,
      selected: i === val,
    }));
  },
  updateUserPaymentCardSelection(s, val) {
    s.user.paymentCards = s.user.paymentCards.map((card, i) => ({
      ...card,
      selected: i === val,
    }));
  },
  addUserDeliveryAddresses(s, val) {
    s.user.deliveryAddresses.push({
      ...val,
      name: val.name || s.user.name || 'Lars Flemming :-)',
      selected: val.selected || false,
    });
  },
  addUserPaymentCards(s, val) {
    s.user.paymentCards.push({
      ...val,
      selected: val.selected || false,
    });
  },

  updateInvoiceName(s, val) {
    if (s.user.name === s.order.invoice.name) {
      s.user.name = val;
    }
    s.order.invoice.name = val;
  },
  updateInvoiceStreet(s, val) { s.order.invoice.street = val; },
  updateInvoiceNumber(s, val) { s.order.invoice.number = val; },
  updateInvoiceExtra(s, val) { s.order.invoice.extra = val; },
  updateInvoiceZip(s, val) { s.order.invoice.zip = val; },
  updateInvoiceCity(s, val) { s.order.invoice.city = val; },

  updatePaymentNumber(s, val) { s.order.payment.details.number = val; },
  updatePaymentMonth(s, val) { s.order.payment.details.month = val; },
  updatePaymentYear(s, val) { s.order.payment.details.year = val; },
  updatePaymentCvc(s, val) { s.order.payment.details.cvc = val; },

  updateDeliveryName(s, val) { s.order.delivery.name = val; },
  updateDeliveryStreet(s, val) { s.order.delivery.street = val; },
  updateDeliveryNumber(s, val) { s.order.delivery.number = val; },
  updateDeliveryExtra(s, val) { s.order.delivery.extra = val; },
  updateDeliveryZip(s, val) { s.order.delivery.zip = val; },
  updateDeliveryCity(s, val) { s.order.delivery.city = val; },
  updateDeliveryDate(s, val) { s.order.delivery.date = val; },
  updateDeliveryCard(s, val) { s.order.delivery.card = val; },
  prototypeAccepted(s) { s.prototypeAccepted = true; },
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

  addVoucher(s, title) {
    s.order.payment.voucher.title = title;
    s.order.payment.voucher.savings = 0.1;
  },
};

export const actions = {
  updateUser({ commit }, { name, phone, email }) {
    if (name !== undefined) { commit('updateUserName', name); }
    if (phone !== undefined) {
      commit('updateUserPhone', phone);
      if (phone.length === 8) {
        axios
          .get(`https://www.bilka.dk/lookup/addressforphonenumber/${phone}`)
          .then((response) => {
            if (response.status === 200) {
              commit('updateUserInvoiceAddresses', {
                description: 'Fundet på baggrund af dit telefonnummer.',
                selected: true,
                city: response.data.town,
                zip: response.data.zipcode,
                street: response.data.address.substring(0, response.data.address.lastIndexOf(' ')),
                number: response.data.address.split(' ').splice(-1)[0],
              });
            }
          })
          .catch(() => {});
      }
    }
    if (email !== undefined) { commit('updateUserEmail', email); }
    commit('checkValidation');
  },
  updateInvoice({ commit }, { street, number, extra, zip, city, name }) {
    if (name !== undefined) { commit('updateInvoiceName', name); }
    if (street !== undefined) { commit('updateInvoiceStreet', street); }
    if (number !== undefined) { commit('updateInvoiceNumber', number); }
    if (extra !== undefined) { commit('updateInvoiceExtra', extra); }
    if (zip !== undefined) { commit('updateInvoiceZip', zip); }
    if (city !== undefined) { commit('updateInvoiceCity', city); }
    commit('checkValidation');
  },
  updatePayment({ commit }, { number, month, year, cvc }) {
    if (number !== undefined) { commit('updatePaymentNumber', number); }
    if (month !== undefined) { commit('updatePaymentMonth', month); }
    if (year !== undefined) { commit('updatePaymentYear', year); }
    if (cvc !== undefined) { commit('updatePaymentCvc', cvc); }
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
  addVoucher({ commit }, { title }) {
    commit('addVoucher', title);
  },
  selectInvoiceAddresses({ commit }, { index }) {
    commit('updateUserInvoiceAddressesSelection', index);
    commit('checkValidation');
  },
  selectDeliveryAddresses({ commit }, { index }) {
    commit('updateUserDeliveryAddressesSelection', index);
    commit('checkValidation');
  },
  selectPaymentCard({ commit }, { index }) {
    commit('updateUserPaymentCardSelection', index);
    commit('checkValidation');
  },
  acceptPrototype({ commit }) {
    commit('prototypeAccepted');
  },
};
