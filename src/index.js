import {
    DaiMap,
    DaiCardMapContainer,

    DaiXyzLayer,
    DaiXyzLayerOsm,
    DaiGeojsonLayer,
    DaiWmsLayer,

    DaiLegend,
    DaiMapSelector,
    DaiOpacityControl
} from "./components"

import {
    WidthControl
} from "./directives"

import "./styles/main.scss"
export default function plugin(Vue){
    if (plugin.installed) {
        return
    }
    plugin.installed = true
    Vue.use(DaiMap)
    Vue.use(DaiCardMapContainer)

    Vue.use(DaiXyzLayer)
    Vue.use(DaiXyzLayerOsm)
    Vue.use(DaiGeojsonLayer)
    Vue.use(DaiWmsLayer)

    Vue.use(DaiLegend)
    Vue.use(DaiMapSelector)
    Vue.use(DaiMapOpacity)

    //directivas
    Vue.directive(WidthControl.name,WidthControl);

}

export {
    plugin as install,
    //componentes
    DaiMap,
    DaiCardMapContainer,

    DaiXyzLayer,
    DaiXyzLayerOsm,
    DaiGeojsonLayer,
    DaiWmsLayer,

    DaiLegend,
    DaiMapSelector,
    DaiMapOpacity,

    //directivas
    WidthControl

}