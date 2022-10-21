export default {
  /**
   * Coordenadas [x, y] del centro inicial de la vista.
   *
   * Estas coordenadas deben coincidir con la proyección definida
   */
  centro: {
    type: Array,
    default: () => [0, 0],
  },

  /**
   * Coordenadas extremas [x1, y1, x2, y2] de la caja envolvente de la vista.
   *
   * Estas coordenadas deben coincidir con la proyección definida
   */
  extension: {
    type: Array,
    default: () => [0, 0, 0, 0],
  },

  /**
   * Ver el icono de Conacyt debajo del mapa
   */
  iconoConacytVisible: {
    type: Boolean,
    default: true,
  },

  /**
   * Código de identificación SRS que define la proyección de la vista.
   *
   * El valor predeterminado es Universal Transversal de Mercator.
   */
  proyeccion: {
    type: String,
    default: 'EPSG:4326',
  },

  /**
   * Tema de la disposición de elemntos de apoyo del mapa (contenedor del header, pie y columnas
   * laterales)
   */
  tema: {
    type: String,
    default: '',
  },

  /**
   * Nivel de zoom utilizado para calcular la resolución inicial de la vista.
   */
  zoom: {
    type: Number,
    default: 1,
  },
}
