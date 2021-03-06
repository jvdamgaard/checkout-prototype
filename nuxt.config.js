module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Checkout prototype',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Checkout prototype' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#5F306A' },
  css: ['~assets/css/main.css'],
  vendor: ['axios'],
  manifest: {
    name: 'Checkout prototype',
    description: 'Checkout prototype',
    theme_color: '#5F306A',
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/optimize',
  ],
  router: {
    base: (process.env.NODE_ENV === 'generate') ? '/checkout-prototype/' : '/',
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
