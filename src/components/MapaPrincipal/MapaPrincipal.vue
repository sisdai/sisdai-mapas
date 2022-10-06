<template>
  <div class="dai-contenedor-mapa">
    <div
      class="dai-mapa"
      ref="mapa"
    />
  </div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'

import props from './props'
import _mapadereferencia from './_mapadereferencia'

export default {
  name: 'dai-mapa',
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
        layers: [_mapadereferencia],
        view: new View({
          center: this.centro,
          zoom: this.zoom,
          projection: this.proyeccion,
        }),
      })
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
