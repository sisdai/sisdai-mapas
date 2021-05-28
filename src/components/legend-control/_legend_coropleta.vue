<template>
    <div class="map-legends">
        <div class="map-legend-item" v-for="corte in params.content.cortes" :key="corte.c">
            <div class="map-legends-item-color" 
            :style="{'background-color': corte.c}">
            </div>
            <div class="map-legends-item-text">{{corte.d}}</div>
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
            console.log("la leyenda esta lista")
        })
    }
}
</script>

<style lang="scss" scoped>
.map-legends{
    display: flex;
    justify-content: space-between;
    .map-legend-item{
        flex: 1 0 20%;
        margin: 10px auto;
        .map-legends-item-color{
                border: 1px solid var(--accent-color);
                border-radius: 5px;
                height: 2.5rem;
                width: 2.5rem;
                margin: auto;
                transition: border-width .27s ease-in-out;
        }

        .map-legends-item-text{
                font-size: 12px;
                line-height: 1em;
                color: var(--accent-color);
                margin: 5px auto 0;
                text-align: center;
        }
    }
}
</style>