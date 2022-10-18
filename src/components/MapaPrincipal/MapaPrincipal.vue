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
import Map from 'ol/Map'
import View from 'ol/View'

import props from './props'

import { ref, toRefs, watch } from 'vue'

import usarMapa from '../../composables/usarMapa'

export default {
  name: 'DaiMapa',
  props,
  setup(props) {
    // console.log('hola mapaPrincipal')
    const { salvarInstanciaDelMapa, cambiarZoom, cambiarCentro } = usarMapa()

    /**
     *
     */
    const { zoom } = toRefs(props)
    watch(zoom, cambiarZoom)

    /**
     *
     */
    const { centro } = toRefs(props)
    watch(centro, cambiarCentro)

    /**
     *
     */
    const { proyeccion } = props

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

<style lang="css">
.dai-contenedor-mapa {
  min-height: 200px;
  min-width: 200px;
  height: 40vh;
  position: relative;
}
.dai-mapa {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #e9e9e9;
}
</style>
