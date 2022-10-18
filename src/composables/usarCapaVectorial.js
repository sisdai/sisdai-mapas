// import {  } from 'vue'

import usarCapa from './usarCapa'

export const props = {
  /**
   * Fuente de datos de una capa GeoJSON
   */
  url: {
    type: String,
    default: '',
  },

  /**
   * Objetos que se convertiran en feature, dependera del tipo de capa la estructura que estos
   * deben tener (si esta definido, url se ignora )
   */
  datos: {
    type: [Array, Object],
    default: undefined,
  },
}

export default function usarCapaVectorial() {
  return {
    ...usarCapa(),
  }
}
