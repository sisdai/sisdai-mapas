<template>
  <div class="dai-mapa-encabezado borde-b">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DaiEncabezado',
}
</script>

<style lang="scss" scoped>
.dai-mapa-encabezado {
  z-index: 99;
}
</style>
