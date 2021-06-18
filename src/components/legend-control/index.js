import DaiMapLegend from "./legend.vue"
function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiMapLegend.name,DaiMapLegend)
}

export default plugin;


export {
    plugin as install,
    DaiMapLegend
}