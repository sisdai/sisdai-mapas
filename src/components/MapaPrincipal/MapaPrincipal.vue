<template>
  <div class="dai-contenedor-mapa">
    <div
      class="dai-mapa"
      ref="refMapa"
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
// import ZoomControl from 'ol/control/Zoom'
// import { defaults as defaultControls } from 'ol/control'
import 'ol/ol.css'

import ControlZoomPersonalizado from './../../controls/Zoom'
import ControlVistaInicial from './../../controls/VistaInicial'

import props from './props'
import usarMapa from '../../composables/usarMapa'

export default {
  name: 'DaiMapa',
  props,
  setup(props) {
    const { proyeccion } = props
    const { centro, zoom } = toRefs(props)
    const { salvarInstanciaDelMapa, cambiarZoom, cambiarCentro } = usarMapa()

    /**
     *
     */
    watch(zoom, cambiarZoom)

    /**
     *
     */
    watch(centro, cambiarCentro)

    /**
     * Instanciamiewnto del maapa como onjeto de la calse ol/Map
     */
    function crearMapa(target) {
      // console.log(target, centro.value)
      salvarInstanciaDelMapa(
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
            new ControlVistaInicial(),
            new AttributionControl({
              collapsible: false,
            }),
          ],
        })
      )
    }

    /**
     *
     */
    const refMapa = ref(null)
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

.mapa-control {
  position: absolute;
  display: flex;
  flex-direction: column;
  margin: 12px;

  &.dai-zoom {
    .dai-zoom-boton {
      margin: 0;
      &:not(:last-child) {
        margin-bottom: 6px;
      }
    }
  }

  &.dai-vista-inicial {
    bottom: 0;
  }
}
</style>
