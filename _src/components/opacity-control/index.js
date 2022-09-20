import DaiMapOpacity from "./opacity.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiMapOpacity.name,DaiMapOpacity)
}

export default plugin;


export { 
    plugin as install,
    DaiMapOpacity
}