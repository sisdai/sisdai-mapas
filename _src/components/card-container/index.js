import DaiCardMapContainer from "./card.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiCardMapContainer.name,DaiCardMapContainer)
}

export default plugin;


export {
    plugin as install,
    DaiCardMapContainer
}