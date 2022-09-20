import DaiWmsLayer from "./wms.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiWmsLayer.name,DaiWmsLayer)
}

export default plugin;


export { 
    plugin as install,
    DaiWmsLayer
}