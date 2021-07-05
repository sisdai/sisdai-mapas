<template>
    <div>
        <div class="legend-list-checks-colors">
            <div class="list-item-check" v-for="(corte,i) in cortes_colores.cortes" :key="corte.v">
                <checkbox-color v-model="list_filter[i]" :color="corte.v" @change="_filtrarCapa">
                    {{corte.d}}
                </checkbox-color>
                
            </div>
        </div>
        <div class="shapes">
            <div class="shape-item" v-for=" corte_s in cortes_sizes.cortes" :key="corte_s.v">
                <shape class="shape-this-legend" shape-type="circle" backgroundColor="gray" :size="[corte_s.v*2,corte_s.v*2]" />
                <div>{{corte_s.d}}</div>
            </div>
            
        </div>
        <div class="title-shapes">{{cortes_sizes.args.variableTitle}}</div>
    </div>
    
</template>

<script>
//import checkbox from "../utils/checkbox"
import CheckboxColor from "../utils/checkbox-color.vue";
import Shape from "../utils/shape.vue";
import legend_item_child  from "../../mixins/legend-item-child";
export default {
    mixins:[legend_item_child],
    data:function(){
        return{
            cortes_colores:{},
            cortes_sizes:{},
            list_filter:[]
        }
    },
    components:{
        //checkbox
        CheckboxColor,
        Shape
    },
    created:function(){
        this.cortes_colores = this.params.content.cortes[0].type === "list-checks-colors" ? this.params.content.cortes[0] : this.params.content.cortes[1];
        this.cortes_sizes = this.params.content.cortes[0].type === "shapes-sizes-values" ? this.params.content.cortes[0] : this.params.content.cortes[1];
        this.$on("update:legend_info_ready",function(){
            //console.log("esta la leyenda esta lista")
        })
        this.list_filter = this.cortes_colores.cortes.map(()=>true)
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
                //let valores = this.cortes_colores.cortes.map((corte)=>corte["val"]).filter((valor,i)=>valor && this.list_filter[i])
                let valores = this.params.content.cortes.cortes.map((corte,idx)=>{
                        let val= [...corte["val"]]
                        if(Array.isArray(val) && idx===0){
                            val[0] = val[0] - 1
                        }
                        
                        return val
                    })
                    .filter((valor,i)=>valor && this.list_filter[i])
                //console.log(valores)
                //comparar el feature que pueda ser cada uno de estos valores
                if(valores.length >0 && Array.isArray(valores[0])){
                    return valores.some(valor=>{
                        return feature.getProperties()[this.cortes_colores.args.column] > valor[0] && feature.getProperties()[this.cortes_colores.args.column] <= valor[1]
                    })
                }

                return valores.some(valor=>{
                    return valor == feature.getProperties()[this.cortes_colores.args.column]
                })

            }
            this._filter_features(fnCompare)
            this.visibleStatusFilters = [...this.list_filter];
        }
    }
}
</script>

<style lang="scss" scoped>
    .legend-list-checks-colors{
        display: grid;
        grid-template-columns:repeat(auto-fill,minmax(140px,1fr));
        grid-gap: 9px 5px;
    }

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