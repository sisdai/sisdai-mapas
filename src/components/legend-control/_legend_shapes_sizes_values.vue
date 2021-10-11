<template>
    <div>
        <div class="shapes">
            <div class="shape-item" v-for=" corte_s in params.content.cortes.cortes" :key="corte_s.v">
                <shape class="shape-this-legend" 
                    shape-type="circle" 
                    :backgroundColor=" usarTexturas? 'transparent': params.content.cortes.args.persistentFill.color  "
                    :backgroundImage="backgroundImage" 
                    :strokeColor="params.content.cortes.args.persistentStroke.color || 'white'"
                    :strokeWidth="params.content.cortes.args.persistentStroke.width || 1"
                    :size="[corte_s.v*2,corte_s.v*2]" />
                <div class="shape-text-this-legend">{{corte_s.d}}</div>
            </div>
            
        </div>
        <div class="title-shapes">{{params.content.cortes.args.variableTitle}}</div>
    </div>
</template>

<script>
import Shape from "../utils/shape.vue";
import legend_item_child  from "../../mixins/legend-item-child";
import {convertirNode} from "../../mixins/_json2olstyle"

export default {
    mixins:[legend_item_child],
    components:{
        Shape
    },
    computed:{
        backgroundImage:function(){
            return this.$parent.$parent.cmpMap.cmpLayers[this.layerId].usarTexturasEnRelleno
                ? `url('${convertirNode("fillPattern",{...this.params.content.cortes.args.persistentTexture}).fill.getImage().toDataURL()}'`
                : 'none'
        },
        usarTexturas:function(){
            return this.$parent.$parent.cmpMap.cmpLayers[this.layerId].usarTexturasEnRelleno
        }
    }
}
</script>

<style lang="scss" scoped>

    .shapes{
        display: flex;
        flex-direction: row-reverse;
        margin-top: 1.1em;
        .shape-item{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            font-size: .9em;
            line-height: 1.3;
            text-align: center;
            margin: 0 auto;
            padding: 0 3px;
            .shape-this-legend{
                margin-bottom: 6px;
            }
            .shape-text-this-legend{
                font-size: 12px;
                line-height: 1.16em;
                font-weight: 500;
            }
        }
        
    }
    .title-shapes{
        text-align: center;
        font-weight: 600;
        margin-top: .5em;
    }
</style>