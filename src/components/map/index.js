import DaiMap from "./map.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiMap.name,DaiMap)
}

export default plugin;


export { 
    plugin as install,
    DaiMap 
}