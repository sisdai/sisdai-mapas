const { description,version ,repository} = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'DAI-MAPS',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  base: "/dai-maps/",

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    version:version,
    repo: repository['url'],
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
    nav: [
      {
        text: 'Guía de inicio',
        link: '/guia/',
      },
      {
        text: 'Componentes',
        link: '/componentes/'
      },
      {
        text: 'Ejemplos',
        link: '/ejemplos/',
      }
    ],
    sidebar: {
      '/componentes/': [
        {
          title: 'Componentes',
          collapsable: false,
          children: [
            '',
            'capas',
            'controles',
            'directivas'
          ]
        }
      ],
      '/ejemplos/': [
        {
          title: 'Ejemplos',
          collapsable: false,
          children: [
            '',
            'tarjeta-contenedor',
            'capas',
            'controles',
            'clasificacion-datos'
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
