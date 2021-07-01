<template>
    <div class="map-legends">
        <div class="map-legend-item" v-for="(corte,i) in cortesToRender" :key="corte.c" @click="_filterLayer(i)">
            <shape 
            shapeType="rounded-square"
            :size="[40,40]"
            :backgroundColor="corte.activo ? corte.v: 'white'"
            :strokeColor=" corte.activo ?  (params.content.cortes.args.persistentStroke.color || 'white') : 'black '"
            :strokeWidth="params.content.cortes.args.persistentStroke.width || 1"
            class="map-legends-item-color"
            />
            
            <div class="map-legends-item-text">{{corte.d}}</div>
        </div>
    </div>
</template>

<script>
//import checkbox from "../utils/checkbox"
import Shape from "../utils/shape.vue"
import legend_item_child  from "../../mixins/legend-item-child"
import Vue from 'vue'
export default {
    mixins:[legend_item_child],
    components:{
        //checkbox
        Shape
    },
    data:function(){
        return{
            colorsCortes:[],
            list_filter:[]
        }
    },
    created:function(){
        this.colorsCortes = this.params.content.cortes.cortes;
        this.$on("update:legend_info_ready",function(){
            console.log("la leyenda esta lista")
        })
        this.list_filter = this.params.content.cortes.cortes.map(()=>true)
        this.hasSubfilters = true;
        this.visibleStatusFilters = [...this.list_filter];

        this.$on("toogle_allsubfilters",(apagar_todos)=>{
            this.list_filter = this.list_filter.map(()=>!apagar_todos)
            this._filterLayer()
        })
    },
    methods:{
        _filterLayer:function(idxCorte=-1){
            //console.log("se le dio click",idxCorte)
            //this.list_filter[idxCorte] = ! this.list_filter[idxCorte]
            if(idxCorte> -1){
                Vue.set(this.list_filter,idxCorte,! this.list_filter[idxCorte])
            }
            

            let fnCompare = (feature)=>{
                if(this.list_filter.every(item=>item)){
                    return true
                }
                let valores = this.params.content.cortes.cortes.map((corte)=>corte["val"]).filter((valor,i)=>valor && this.list_filter[i])
                
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
        cortesToRender:function(){
            

            return this.colorsCortes.map( (corte,i)=>{
                //console.log(this.list_filter[i],i)
                let corte2 = {...corte}
                //corte2["v"] = this.list_filter[i] ? corte2["v"] : "transparent"
                corte2["activo"] = this.list_filter[i]

                return corte2
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>
.map-legends{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .map-legend-item{
        flex: 1 0 10%;
        margin: 10px 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .map-legends-item-color{
                
                //margin: auto;
                transition: border-width .27s ease-in-out;
        }

        .map-legends-item-text{
                font-size: 10px;
                line-height: 1em;
                color: var(--main-text-color);
                margin: 5px auto 0;
                text-align: center;
        }
    }
}
</style>