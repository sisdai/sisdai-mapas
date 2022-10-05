export default {
  /**
   *
   */
  centro: {
    type: Array,
    default: () => [0, 0],
  },

  /**
   *
   */
  proyeccion: {
    type: String,
    default: 'EPSG:4326',
  },

  /**
   *
   */
  zoom: {
    type: Number,
    default: 1,
  },
}
