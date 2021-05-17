import DaiXyzLayerOsm from "./osm.vue";

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiXyzLayerOsm.name,DaiXyzLayerOsm)
}

export default plugin;


export { 
    plugin as install,
    DaiXyzLayerOsm
}