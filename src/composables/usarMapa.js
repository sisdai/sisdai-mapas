/**
 * @module composables/usarMapa
 */

import { ref, readonly } from 'vue'

/**
 * Objeto que contendrá la instancia del mapa, declararlo fuera de la función composable hace que
 * no se genere una nueva variable del mapa cada que se utilice el composable
 */
const mapaPrincipal = ref(undefined)

/**
 * Uso del mapa, la finalidad de este composable es acceder al mapa desde diferentes componentes
 * o composables
 * @returns {Function} composable
 */
export default function usarMapa() {
  /**
   * Guarda el objeto del mapa en una variable reactiva.
   * @param {import("ol/Map.js").default} mapaInstanciado
   */
  function salvarInstancia(mapaInstanciado) {
    // console.log('hola desde el composable del mapa', mapaInstanciado)
    mapaPrincipal.value = mapaInstanciado
  }

  /**
   * Actualiza la coordenada centrica del mapa
   * @param {Number} centro nueva coordenada centrica
   */
  function cambiarCentro(centro) {
    if (mapaPrincipal.value) {
      mapaPrincipal.value.getView().setCenter(centro)
    }
  }

  /**
   * Actualiza el nivel de zoom en el mapa.
   * @param {Number} zoom nuevo bnivel de zoom
   */
  function cambiarZoom(zoom) {
    if (mapaPrincipal.value) {
      mapaPrincipal.value.getView().setZoom(zoom)
    }
  }

  /**
   * Agrega una capa a la vista del mapa
   * @param {import("ol/layer/Layer.js").default} olCapa capa de OpenLayers
   */
  function agregarCapa(olCapa) {
    if (mapaPrincipal.value) {
      mapaPrincipal.value.addLayer(olCapa)
    }
  }

  /**
   * Devuelve un control por su nombre registrado
   * @param {String} nombreDelControl
   * @returns {import("ol/control/Control.js").default|undefined} Control
   */
  function extraerControl(nombreDelControl) {
    if (mapaPrincipal.value) {
      return mapaPrincipal.value
        .getControls()
        .getArray()
        .find(control => control.nombre === nombreDelControl)
    }
  }

  return {
    mapaPrincipal: readonly(mapaPrincipal),
    salvarInstancia,
    cambiarZoom,
    cambiarCentro,
    agregarCapa,
    extraerControl,
  }
}
