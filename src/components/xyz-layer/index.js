import DaiXyzLayer from "./xyz.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiXyzLayer.name,DaiXyzLayer)
}

export default plugin;


export { 
    plugin as install,
    DaiXyzLayer
}