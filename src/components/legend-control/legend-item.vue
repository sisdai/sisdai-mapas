
<script>
import LegendWms from "./_legend_wms.vue"
import LegendLoading from "./_legend_loading.vue"
import LegendCoropleta from "./_legend_coropleta.vue"
import LegendNormalVector  from "./_legend_normal_vector.vue"
import LegendListChecksColors from "./_legend_list_checks_colors.vue"
export default {
    props:["layerId"],
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
        LegendListChecksColors
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
        return createElement(this.VM_params.type,{
            props:{
                params: this.VM_params
            }
            });
    }


}
</script>