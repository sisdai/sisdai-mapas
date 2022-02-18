
<script>
import LegendWms from "./_legend_wms.vue"
import LegendLoading from "./_legend_loading.vue"
import LegendCoropleta from "./_legend_coropleta.vue"
import LegendNormalVector  from "./_legend_normal_vector.vue"
import LegendListChecksColors from "./_legend_list_checks_colors.vue"
import LegendShapesSizesValues from "./_legend_shapes_sizes_values.vue";
import LegendListChecksColorsShapesSizesValues from "./_legend_list_checks_colors_shapes_sizes_values.vue";

//leyendas de datos vacios
import LegendListChecksValues from "./_legend-list-checks-values.vue"
import LegendListChecksColorsListChecksValues from "./_legend_list_checks_colors_list_checks_values.vue"

export default {
    props:["layerId", "index"],
    created:function(){
        //console.log("creando el leyenda de",this.layerId)
        let id = this.layerId
        let vm = this;
        this.$parent.cmpMap.cmpLayers[id].$on("legend_info_ready",function(evento){
            //console.log("esuchando que cambio el estado de la leyenda",evento)
            vm.VM_params = evento
        })
        //console.log(this.$parent.cmpMap.cmpLayers[id].VM_legend_info)
        if(this.$parent.cmpMap.cmpLayers[id].VM_legend_info!= undefined){
            this.VM_params =  this.$parent.cmpMap.cmpLayers[id].VM_legend_info;
        }

        
    },
    components:{
        LegendWms,LegendLoading,LegendCoropleta,LegendNormalVector,
        LegendListChecksColors,
        LegendShapesSizesValues,
        LegendListChecksColorsShapesSizesValues,
        LegendListChecksValues,
        LegendListChecksColorsListChecksValues
    },
    data:function(){
        return {
            VM_params: {
                type : "legend-loading",
                content: undefined
            }
        }
    },
    destroyed:function (){

    },
    render:function(createElement){
        //las coropletas tienen dos leyendas posibles, verificar si es coropleta y si se indico otro metodo
        let  tipo = this.VM_params.type
        if(tipo === 'legend-coropleta'  ){
            tipo = this.$parent.coropletasConCheckbox ? 'legend-list-checks-colors' :tipo
        }
        
        return createElement(tipo,{
            props:{
                params: this.VM_params,
                
            },
            attrs:{
                "data-layer": this.layerId
            },
        });
    }


}
</script>