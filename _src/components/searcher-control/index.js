import DaiMapSearcher from "./searcher.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiMapSearcher.name,DaiMapSearcher)
}

export default plugin;


export { 
    plugin as install,
    DaiMapSearcher
}