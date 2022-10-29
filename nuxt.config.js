import { languages } from './i18n'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  server: {
    port: process.env.PORT || 8000
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Airbank',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/static/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/vuex-persist.js', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
    '@nuxtjs/fontawesome'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/apollo'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'br', name: 'Brazilian Portuguese' },
      { code: 'de', name: 'German' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    vueI18n: {
      fallbackLocale: 'en',
      messages: languages,
      dateTimeFormats: {
        en: {
          short: {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          },
        },
        br: {
          short: {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          },
        },
        de: {
          short: {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          },
        }
      },
    }
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `${process.env.API_BASE_URL}/${process.env.GRAPH_API}`,
      },
    },
  },
  fontawesome: {
    component: 'fa',
    icons: {
      solid: true
    }
  },
  watchers: {
    chokidar: { ignored: /cypress/ },
    webpack: { ignored: /cypress/ }
  },
}
