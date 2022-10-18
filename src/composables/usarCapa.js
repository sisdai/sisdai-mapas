//import { reactive } from 'vue'
import { watch } from 'vue'

import usarMapa from './usarMapa'

let olCapa = undefined

export default function usarCapa() {
  const { mapaPrincipal, agregarCapa } = usarMapa()
  watch(mapaPrincipal, () => {
    // console.log('watcher mapaPrincipal')
    agregarCapa(olCapa)
  })

  /**
   *
   * @param {*} capaObjeto
   */
  function salvarCapaComoObjeto(capaObjeto) {
    olCapa = capaObjeto
  }

  return {
    salvarCapaComoObjeto,
  }
}
