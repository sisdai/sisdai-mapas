import DaiOpacityControl from "./opacity.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiOpacityControl.name,DaiOpacityControl)
}

export default plugin;


export { 
    plugin as install,
    DaiOpacityControl
}