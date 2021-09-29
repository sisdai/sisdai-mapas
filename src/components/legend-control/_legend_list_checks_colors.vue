<template>
    <div class="legend-list-checks-colors">
        <div class="list-item-check" v-for="(corte,i) in params.content.cortes.cortes" :key="corte.v">
            <checkbox-color 
            v-model="list_filter[i]" 
            :color="usarTexturas?'transparent': corte.v" 
            :backgroundImage="backgroundImage[i]"
            @change="_filtrarCapa">
                {{corte.d}}
            </checkbox-color>
            
        </div>
    </div>
</template>

<script>
//import checkbox from "../utils/checkbox"
import CheckboxColor from "../utils/checkbox-color.vue"
import legend_item_child  from "../../mixins/legend-item-child"
import {convertirNode} from "../../mixins/_json2olstyle"

export default {
    mixins:[legend_item_child],
    data:function(){
        return{
            list_filter:[]
        }
    },
    components:{
        //checkbox
        CheckboxColor
    },
    created:function(){
        this.$on("update:legend_info_ready",function(){
            //console.log("esta la leyenda esta lista")
        })
        this.list_filter = this.params.content.cortes.cortes.map(()=>true)
        this.hasSubfilters = true;
        this.visibleStatusFilters = [...this.list_filter];

        //estar atentos al evento de apagar/prender todos
        this.$on("toogle_allsubfilters",(apagar_todos)=>{
            this.list_filter = this.list_filter.map(()=>!apagar_todos)
            this._filtrarCapa()
        })
    },methods:{
        _filtrarCapa:function(){
            let fnCompare = (feature)=>{
                if(this.list_filter.every(item=>item)){
                    return true
                }
                //let valores = this.params.content.cortes.cortes.map((corte)=>corte["val"]).filter((valor,i)=>valor && this.list_filter[i])
                let valores = this.params.content.cortes.cortes.map((corte,idx)=>{
                        let val= Array.isArray( corte?.val ) ? [...corte["val"]] : corte["val"] ;
                        if(Array.isArray(val) && idx===0){
                            val[0] = val[0] - 1
                        }
                        
                        return val
                    })
                    .filter((valor,i)=>valor && this.list_filter[i])
                //comparar el feature que pueda ser cada uno de estos valores
                //comparar el feature que pueda ser cada uno de estos valores
                if(valores.length >0 && Array.isArray(valores[0])){
                    return valores.some(valor=>{
                        return feature.getProperties()[this.params.content.cortes.args.column] > valor[0] && feature.getProperties()[this.params.content.cortes.args.column] <= valor[1]
                    })
                }
                return valores.some(valor=>{
                    return valor == feature.getProperties()[this.params.content.cortes.args.column]
                })

            }
            this._filter_features(fnCompare)
            this.visibleStatusFilters = [...this.list_filter];
        }
    },
    computed:{
        backgroundImage:function(){
            return this.$parent.$parent.cmpMap.cmpLayers[this.layerId].usarTexturasEnRelleno
                ? this.params.content.cortes.args.textures.map(textura=>{
                    let fillStyle = convertirNode("fillPattern",{...textura})
                    let pattern = fillStyle.fill
                    return `url('${pattern.getImage().toDataURL()}'`
                })
                :this.params.content.cortes.cortes.map(item=>'none')
        },
        usarTexturas:function(){
            return this.$parent.$parent.cmpMap.cmpLayers[this.layerId].usarTexturasEnRelleno
        }
    }
}
</script>

<style lang="scss" scoped>
    .legend-list-checks-colors{
        display: grid;
        grid-template-columns:repeat(auto-fill,minmax(140px,1fr));
        grid-gap: 9px 5px;
        font-weight: 500;
        font-size: 12px;
        line-height: 1.16em;
    }
</style>