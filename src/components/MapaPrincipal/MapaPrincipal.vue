<template>
  <div class="dai-mapa-contenedor borde borde-redondeado-8">
    <div
      ref="refMapa"
      class="dai-mapa borde-redondeado-8"
      :class="{ 'icono-conacyt-visible': iconoConacytVisible }"
    />
    <!-- Permite ingresar capas dentro de etiqueta dai-mapa -->
    <slot />

    <BotonConacyt />
  </div>
</template>

<script>
import { ref, toRefs, watch } from 'vue'

import Map from 'ol/Map'
import View from 'ol/View'
import AttributionControl from 'ol/control/Attribution'
import 'ol/ol.css'

import BotonConacyt from './../TarjetaContenedora/BotonConacyt'

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
  components: { BotonConacyt },
  setup(props) {
    const { salvarInstancia, cambiarZoom, cambiarCentro, extraerControl } =
      usarMapa()

    /**
     * Referencia al elemento html contenedor del mapa
     */
    const refMapa = ref(null)
    watch(refMapa, crearMapa)

    const { proyeccion } = props // Props no reactivos
    const { centro, iconoConacytVisible, extension, zoom } = toRefs(props) // Props reactivos
    watch(centro, cambiarCentro)
    watch(iconoConacytVisible, () => {})
    watch(extension, cambiarExtension)
    watch(zoom, cambiarZoom)

    /**
     * Creación del elemento mapa con atributos definidos
     * @param {HTMLDivElement|String} target elemento html que contendrá el mapa o id de mismo
     */
    function crearMapa(target) {
      salvarInstancia(
        // Instanciamiento del maapa como onjeto de la calse ol/Map
        new Map({
          target,
          layers: [],
          view: new View({
            center: centro.value,
            zoom: zoom.value,
            projection: proyeccion,
          }),
          controls: [
            new ControlZoomPersonalizado(),
            new ControlVistaInicial({
              centro,
              extension,
              rellenoAlBordeDeLaExtension,
              zoom,
            }),
            new AttributionControl({
              collapsible: false,
            }),
          ],
        })
      )
    }

    /**
     * Cambiar la extension, esto proboca que el mapa ajuste la vista con la extención actual
     * en caso de ser valida.
     * @param {Array<Number>} extension
     */
    function cambiarExtension(nuevaExtension) {
      const controlVistaInicial = extraerControl(ControlVistaInicial.nombre)
      controlVistaInicial.extension = nuevaExtension
      controlVistaInicial.reiniciarVista()
    }

    return { refMapa }
  },
}
</script>

<style lang="scss">
$altura-boton-conacyt: 40px;

.dai-mapa-contenedor {
  min-height: 200px;
  min-width: 200px;
  height: calc(40vh + $altura-boton-conacyt);
  position: relative;

  .dai-mapa {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #e9e9e9;
    padding-bottom: $altura-boton-conacyt;

    .ol-viewport {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
}
</style>
