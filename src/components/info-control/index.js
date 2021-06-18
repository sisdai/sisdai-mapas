import DaiMapInfo from "./info.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiMapInfo.name,DaiMapInfo)
}

export default plugin;


export { 
    plugin as install,
    DaiMapInfo
}