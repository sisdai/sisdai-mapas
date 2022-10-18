import { toRefs, watch } from 'vue'

import usarMapa from './usarMapa'

export const props = {
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
  zIndex: {
    type: Number,
    default: undefined,
  },
}

export default function usarCapa(propsRefs) {
  let olCapa = undefined
  const { zIndex } = toRefs(propsRefs)
  const { mapaPrincipal, agregarCapa } = usarMapa()

  /**
   *
   */
  watch(zIndex, nuevoValor => {
    if (olCapa && olCapa.getZIndex() !== nuevoValor) {
      // console.log('el zIndex ha cambiado', nuevoValor)
      olCapa.setZIndex(nuevoValor)
    }
  })

  /**
   *
   */
  const id =
    propsRefs.id !== '_default_'
      ? propsRefs.id
      : Math.random().toString(36).substring(7)

  /**
   *
   */
  watch(mapaPrincipal, () => {
    // console.log('watcher mapaPrincipal')
    asignarPorps()
    agregarCapa(olCapa)
  })

  /**
   *
   * @param {*} capaObjeto
   */
  function salvarCapaComoObjeto(capaObjeto) {
    olCapa = capaObjeto
  }

  /**
   *
   */
  function asignarPorps() {
    olCapa.set('id', id)
    olCapa.setZIndex(zIndex.value)
    // console.log('asignarProps', zIndex)
  }

  return {
    salvarCapaComoObjeto,
  }
}
