export default {
  name: 'MixinCapa',
  inject: ['alInicializarElMapa'],
  props: {
    /**
     *
     */
    id: {
      type: String,
      default: '_default_',
    },

    /**
     *
     */
    visible: {
      type: Boolean,
      default: true,
    },

    /**
     * anteriormente zIndex
     */
    zIndice: {
      type: Number,
      default: undefined,
    },

    /**
     *
     */
    opacidad: {
      type: Number,
      default: 1,
    },

    /**
     *
     */
    titulo: {
      type: String,
      default: '',
    },

    /**
     * anteriormente useLoader
     */
    cargador: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    olCapa: undefined,
  }),
  render: () => null,
  created() {
    const _this = this
    // console.log(_this.mapaEstaIstanciado)
    this.alInicializarElMapa().then(olMapa => {
      _this.olMapa = olMapa

      _this.crearCapaComoObjeto()
      _this.agregarCapaAlMapa()
      // console.log(olMapa)
    })
    /**
     * Revisar si está instancciado el mapa
     */
  },
  methods: {
    /**
     * Aquí se crea el objeto de la capa
     */
    crearCapaComoObjeto() {
      // eslint-disable-next-line
      console.warn('No implementado aún')
    },

    /**
     * Se agrega la capa al entorno de la capa
     */
    agregarCapaAlMapa() {
      this.olMapa.addLayer(this.olCapa)
    },
  },
  watch: {},
  destroyed() {
    //eliminar del mapa el layer
    if (this.olMapa && this.olCapa) {
      this.olMapa.removeLayer(this.olCapa)
    }
  },
}
