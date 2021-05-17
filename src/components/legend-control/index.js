import DaiLegend from "./legend.vue"
function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiLegend.name,DaiLegend)
}

export default plugin;


export {
    plugin as install,
    DaiLegend
}