<template>
  <div class="dai-contenedor-mapa">
    <div
      class="dai-mapa"
      ref="mapa"
    >
      <slot /><!-- Slot que permite ingresar capas dentro de etiqueta dai-mapa -->
    </div>
  </div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'

import props from './props'

export default {
  name: 'DaiMapa',
  props,
  data: () => ({
    mapa: undefined,
  }),
  created() {},
  mounted() {
    this.crearMapa()
  },
  methods: {
    /**
     *
     */
    crearMapa() {
      this.mapa = new Map({
        target: this.$refs.mapa,
        layers: [],
        view: new View({
          center: this.centro,
          zoom: this.zoom,
          projection: this.proyeccion,
        }),
      })
    },

    /**
     * @param {Function}
     */
    getMapa(encontrar) {
      // console.log('getMapa')
      const vm = this
      function revisarParaMapa() {
        if (vm.mapa) {
          encontrar(vm.mapa)
        } else {
          setTimeout(revisarParaMapa, 50)
        }
      }

      revisarParaMapa()
    },
  },
  watch: {
    /**
     *
     */
    centro(nuevoValor) {
      this.mapa.getView().setCenter(nuevoValor)
    },

    /**
     *
     */
    zoom(nuevoValor) {
      this.mapa.getView().setZoom(nuevoValor)
    },
  },
  provide() {
    return {
      getMapa: this.getMapa,
    }
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
