import { ref, readonly } from 'vue'

const mapaPrincipal = ref(undefined)

export function useMapa() {
  /**
   *
   * @param {*} mapaInstanciado
   */
  function salvarInstanciaDelMapa(mapaInstanciado) {
    // console.log('hola desde el composable del mapa', mapaInstanciado)
    mapaPrincipal.value = mapaInstanciado
  }

  /**
   *
   * @param {*} zoom
   */
  function cambiarZoom(zoom) {
    if (mapaPrincipal.value) {
      mapaPrincipal.value.getView().setZoom(zoom)
    }
  }

  /**
   *
   * @param {*} centro
   */
  function cambiarCentro(centro) {
    if (mapaPrincipal.value) {
      mapaPrincipal.value.getView().setCenter(centro)
    }
  }

  /**
   *
   * @param {*} olCapa
   */
  function agregarCapa(olCapa) {
    if (mapaPrincipal.value) {
      mapaPrincipal.value.addLayer(olCapa)
    }
  }

  return {
    mapaPrincipal: readonly(mapaPrincipal),
    salvarInstanciaDelMapa,
    cambiarZoom,
    cambiarCentro,
    agregarCapa,
  }
}
