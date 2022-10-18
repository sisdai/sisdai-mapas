<template>
  <DaiMapa
    :zoom="4.6"
    :centro="[-102, 24]"
  >
    <DaiCapaGeojson
      :datos="datos"
      :zIndex="1"
    />
    <DaiCapaXyzOsm :zIndex="0" />
  </DaiMapa>
</template>

<script>
import edos from './../public/capas/sample-edos.json'

export default {
  data: () => ({
    datos: edos,
  }),
}
</script>
