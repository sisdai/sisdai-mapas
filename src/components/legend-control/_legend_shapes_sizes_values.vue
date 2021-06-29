<template>
    <div>
        <div class="shapes">
            <div class="shape-item" v-for=" corte_s in params.content.cortes.cortes" :key="corte_s.v">
                <shape class="shape-this-legend" 
                    shape-type="circle" 
                    :backgroundColor="params.content.cortes.args.persistentFill.color || 'gray'" 
                    :strokeColor="params.content.cortes.args.persistentStroke.color || 'black'"
                    :strokeWidth="params.content.cortes.args.persistentStroke.width || 1"
                    :size="[corte_s.v*2,corte_s.v*2]" />
                <div>{{corte_s.d}}</div>
            </div>
            
        </div>
        <div class="title-shapes">{{params.content.cortes.args.variableTitle}}</div>
    </div>
</template>

<script>
import Shape from "../utils/shape.vue";
import legend_item_child  from "../../mixins/legend-item-child";
export default {
    mixins:[legend_item_child],
    components:{
        Shape
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
        }
        
    }
    .title-shapes{
        text-align: center;
        font-weight: 600;
        margin-top: .5em;
    }
</style>