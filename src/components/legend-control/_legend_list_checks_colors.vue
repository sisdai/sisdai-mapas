<template>
    <div class="legend-list-checks-colors">
        <div v-for="corte in params.content.cortes.cortes" :key="corte.c">
            {{corte.d}}
        </div>
    </div>
</template>

<script>
//import checkbox from "../utils/checkbox"
import legend_item_child  from "../../mixins/legend-item-child"
export default {
    mixins:[legend_item_child],
    components:{
        //checkbox
    },
    created:function(){
        this.$on("update:legend_info_ready",function(){
            console.log("esta la leyenda esta lista")
        })
    }
}
</script>

<style lang="scss">
    .legend-list-checks-colors{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 4px 5px;
    }
</style>