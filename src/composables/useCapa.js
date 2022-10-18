//import { reactive } from 'vue'
import { watch } from 'vue'

import { useMapa } from './useMapa'

let olCapa = undefined

export default function useCapa() {
  const { mapaPrincipal, agregarCapa } = useMapa()
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
