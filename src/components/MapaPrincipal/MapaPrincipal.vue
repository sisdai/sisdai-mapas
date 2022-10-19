<template>
  <div class="dai-contenedor-mapa">
    <div
      ref="refMapa"
      class="dai-mapa"
    >
      <slot /><!-- Slot que permite ingresar capas dentro de etiqueta dai-mapa -->
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch } from 'vue'

import Map from 'ol/Map'
import View from 'ol/View'
import AttributionControl from 'ol/control/Attribution'
import 'ol/ol.css'

import ControlZoomPersonalizado from '../../controls/ZoomPersonalizado'
import ControlVistaInicial from './../../controls/VistaInicial'

import props from './props'
import usarMapa from '../../composables/usarMapa'

/**
 * Relleno (en píxeles) que se agregará a la extensión de la vista. Los valores en la matriz son
 * relleno: [superior, derecho, inferior, izquierdo] y solo es aplicable cuando la extensión es
 * definida.
 */
const rellenoAlBordeDeLaExtension = [10, 10, 10, 10]

export default {
  name: 'DaiMapa',
  props,
  setup(props) {
    /**
     * Referencia al elemento contenedor del mapa
     */
    const refMapa = ref(null)

    const { centro, extension, zoom } = toRefs(props) // Props reactivos
    const { proyeccion } = props // Props no reactivos

    /**
     * Funciones y atributos heredados del composable usarMapa
     */
    const { salvarInstanciaDelMapa, cambiarZoom, cambiarCentro } = usarMapa()

    /**
     * Objeto control que desencadena la vista inicial
     */
    const controlVistaInicial = new ControlVistaInicial({
      centro,
      extension,
      rellenoAlBordeDeLaExtension,
      zoom,
    })

    /**
     * Creación del elemento mapa con atributos definidos
     * @param {HTMLDivElement|String} target elemento html que contendrá el mapa o id de mismo
     */
    function crearMapa(target) {
      // Instanciamiento del maapa como onjeto de la calse ol/Map
      const mapa = new Map({
        target,
        layers: [],
        view: new View({
          center: centro.value,
          zoom: zoom.value,
          projection: proyeccion,
        }),
        controls: [
          new ControlZoomPersonalizado(),
          controlVistaInicial,
          new AttributionControl({
            collapsible: false,
          }),
        ],
      })

      salvarInstanciaDelMapa(mapa)
    }

    /**
     * Cambiar el centro en cuanto la propiedad cambie de valor
     */
    watch(centro, cambiarCentro)

    /**
     * Cambiar la extension en cuanto la propiedad cambie de valor, esto proboca que el mapa
     * ajuste la vista con la extención actual en caso de ser valida.
     */
    watch(extension, nuevoValor => {
      controlVistaInicial.extension = nuevoValor
      controlVistaInicial.reiniciarVista()
    })

    /**
     * Cambiar el zoom en cuanto la propiedad cambie de valor
     */
    watch(zoom, cambiarZoom)

    /**
     * Ejecutar la creación del mapa en cuanto se inicialice el elemento html
     */
    watch(refMapa, crearMapa)

    return { refMapa }
  },
}
</script>

<style lang="scss">
.dai-contenedor-mapa {
  min-height: 200px;
  min-width: 200px;
  height: 40vh;
  position: relative;

  .dai-mapa {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #e9e9e9;
  }
}
</style>
