<template>
    <div>
        <div class="another-map">
            <dai-card-map-container>
                <template v-slot:header>
                    <p>Agregando estilo simple a las capas</p>
                </template>
                <dai-map  
                    :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                 
                    <dai-geojson-layer url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                </dai-map>
            </dai-card-map-container>
        </div>

    </div>
</template>

<script>
import "./styles.css"

import {DaiMap} from "../src/components/map"
import {DaiCardMapContainer} from "../src/components/card-container"
import {DaiGeojsonLayer} from "../src/components"
import {WidthControl} from "@/directives"
export default {
    name:"App",
    components:{
        DaiMap,DaiCardMapContainer,
        DaiGeojsonLayer
        //DaiLegend,DaiMapSelector
    },
    directives:{
        "width-control":WidthControl
    }
}
</script>

<style>

</style>