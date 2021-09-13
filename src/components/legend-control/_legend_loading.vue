<template>
    <div class="texto-cargando">
        cargando leyenda para {{layerId}} ...
    </div>
</template>

<script>
import legend_item_child  from "../../mixins/legend-item-child"
export default {
    mixins:[legend_item_child],
    props:["params"]
}
</script>

<style lang="scss" scoped>
    .texto-cargando{
        font-style: italic;
        font-size: 12px;
        line-height: 1.16em;
    }
</style>