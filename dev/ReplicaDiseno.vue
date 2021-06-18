<template>
    <div>
        

        <!--MAPA 1-->
        <div class="another-map">
        </div>
    </div>
</template>


<script>
import "./styles.css"

import {DaiMap} from "../src/components/map"
import {DaiXyzLayerOsm} from "../src/components/xyz-layer-osm"
import {DaiCardMapContainer} from "../src/components/card-container"
import {DaiGeojsonLayer} from "../src/components/geojson-layer"
//import {DaiWmsLayer} from "../src/components/wms-layer"
import {DaiLegend} from "../src/components/legend-control"
import {DaiOpacityControl} from "../src/components/opacity-control"
import {DaiMapSelector} from "../src/components/selector-control"
import {DaiMapSwitch} from "../src/components/switcher-control"
import {WidthControl} from "@/directives"
export default {
    
}
</script>
