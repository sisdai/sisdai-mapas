import { ref, readonly } from 'vue'

const mapaPrincipal = ref(undefined)

export default function usarMapa() {
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

  /**
   *
   * @param {*} olControl
   */
  function agregarControl(olControl) {
    mapaPrincipal.value.addControl(olControl)
  }

  return {
    mapaPrincipal: readonly(mapaPrincipal),
    salvarInstanciaDelMapa,
    cambiarZoom,
    cambiarCentro,
    agregarCapa,
    agregarControl,
  }
}
