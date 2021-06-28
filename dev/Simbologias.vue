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
                 
                    <dai-geojson-layer :source="datos_cultivos"  id="cultivos"
                        :map-style-rule="{column:'cultivo',colors:'Category10'}"
                    />
                </dai-map>
                <template v-slot:footer>
                    <dai-map-legend :for="'cultivos'" title="Capas de este mapa" :showButtonToggleAll="true"></dai-map-legend>
                </template>
            </dai-card-map-container>
        </div>

    </div>
</template>

<script>
import "./styles.css"

import {DaiMap} from "../src/components/map"
import {DaiCardMapContainer} from "../src/components/card-container"
import {DaiGeojsonLayer} from "../src/components/geojson-layer"
import {WidthControl} from "@/directives"
import {DaiMapLegend} from "../src/components/legend-control"

import datos from "./data/circulos-sample.json"

export default {
    name:"App",
    components:{
        DaiMap,DaiCardMapContainer,
        DaiGeojsonLayer,
        DaiMapLegend
        //DaiLegend,DaiMapSelector
    },
    data:function(){
        return {
            datos_cultivos:datos
        }
    },
    directives:{
        "width-control":WidthControl
    }
}
</script>

<style>

</style>