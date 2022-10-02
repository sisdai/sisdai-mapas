import DaiMapSelector from "./selector.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiMapSelector.name,DaiMapSelector)
}

export default plugin;


export { 
    plugin as install,
    DaiMapSelector
}