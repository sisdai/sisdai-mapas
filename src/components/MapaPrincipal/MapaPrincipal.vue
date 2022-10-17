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

import _mapadereferencia from './_mapadereferencia'

import { ref, toRefs, watch } from 'vue'

export default {
  name: 'DaiMapa',
  props,
  setup(props) {
    console.log('hola mapaPrincipal')
    /**
     * objeto que contiene la instancia del mapa
     */
    let mapa = undefined

    /**
     *
     */
    const { zoom } = toRefs(props)
    watch(zoom, nuevoValor => {
      if (mapaEstaIstanciado) {
        mapa.getView().setZoom(nuevoValor)
      }
    })

    /**
     *
     */
    const { centro } = toRefs(props)
    watch(centro, nuevoValor => {
      if (mapaEstaIstanciado) {
        mapa.getView().setCenter(nuevoValor)
      }
    })

    /**
     *
     */
    const { proyeccion } = props

    /**
     * boleano que indica el estatus de instancia del mapa
     */
    let mapaEstaIstanciado = false

    /**
     * Instanciamiewnto del maapa como onjeto de la calse ol/Map
     */
    function crearMapa(target) {
      console.log(target, centro.value)
      mapa = new Map({
        target,
        layers: [_mapadereferencia],
        view: new View({
          center: centro.value,
          zoom: zoom.value,
          projection: proyeccion,
        }),
      })

      mapaEstaIstanciado = true
    }

    /**
     *
     */
    const refMapa = ref(null)
    watch(refMapa, crearMapa)

    return {
      refMapa,
      mapa,
      mapaEstaIstanciado,
    }
  },
  methods: {
    /**
     * Instanciamiewnto del maapa como onjeto de la calse ol/Map
     */
    crearMapa() {
      console.log(this.$refs.refMapa)
      this.mapa = new Map({
        target: this.$refs.refMapa,
        layers: [_mapadereferencia],
        view: new View({
          center: this.centro,
          zoom: this.zoom,
          projection: this.proyeccion,
        }),
      })

      this.mapaEstaIstanciado = true
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

    /**
     *
     */
    alInicializarElMapa() {
      const _this = this
      return new Promise(resolve => {
        function revisarMapa() {
          if (_this.mapaEstaIstanciado) {
            resolve(_this.mapa)
          } else setTimeout(revisarMapa, 50)
        }

        revisarMapa()
      })
    },
  },
  provide() {
    return {
      alInicializarElMapa: this.alInicializarElMapa,
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
