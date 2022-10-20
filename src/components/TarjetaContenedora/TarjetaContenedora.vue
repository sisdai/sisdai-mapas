<template>
  <div class="dai-mapa-tarjeta-contenedora borde borde-redondeado-8">
    <div class="dai-mapa-contenedor-encabezado">
      <slot name="encabezadoMapa" />
    </div>

    <span />

    <div class="dai-mapa-contenedor-izquierda">
      <slot name="izquierdaMapa" />
    </div>

    <!-- Permite integrar el mapa dentro de la tarjeta contenedora -->
    <slot />

    <div class="dai-mapa-contenedor-derecha">
      <slot name="derechaMapa" />
    </div>

    <span />

    <div class="dai-mapa-contenedor-pie">
      <slot name="pieMapa" />
    </div>

    <BotonConacyt />
  </div>
</template>

<script>
import BotonConacyt from './BotonConacyt'

export default {
  name: 'DaiTarjetaContenedoraMapa',
  components: { BotonConacyt },
}
</script>

<style lang="scss" scoped>
.dai-mapa-tarjeta-contenedora {
  position: relative;
  padding-bottom: 37px;
}
</style>
