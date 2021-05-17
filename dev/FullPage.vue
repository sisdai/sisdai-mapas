<template>

        <div class="full-map-page">
            <dai-card-map-container :allow-collapsing="false" class="card-container-full" :map-fill-available-space="true">
                <template v-slot:header>
                    <div>
                        <h1>Hola</h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab obcaecati, ut minus eaque fugiat voluptate ratione vel dicta est cupiditate aliquam. Fugit placeat facilis vero repellat quis laboriosam aperiam inventore?</p>
                    </div>
                </template>
                <dai-map  
                    :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                    <dai-xyz-layer-osm/>
                    
                </dai-map>
                <template v-slot:footer>
                    <p>Notas debajo del mapa</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae non quasi consequuntur reprehenderit. Sit maxime est suscipit. Cum sunt vitae reiciendis possimus facere tempora, fugiat quia sed illum nostrum. Culpa!</p>
                </template>
            </dai-card-map-container>
            
        </div>
        

</template>

<script>
//import "./styles.css"

import {DaiMap} from "../src/components/map"
import {DaiCardMapContainer} from "../src/components/card-container"
//import {DaiGeojsonLayer} from "../src/components/geojson-layer"
//import {DaiWmsLayer} from "../src/components/wms-layer"
import {DaiXyzLayerOsm} from "../src/components/xyz-layer-osm"
import {WidthControl} from "@/directives"

export default {
    name:"App",
    components:{
        DaiMap,DaiCardMapContainer,
        DaiXyzLayerOsm
        //DaiGeojsonLayer,
        //DaiWmsLayer,
        //DaiLegend,DaiMapSelector
    },
    directives:{
        "width-control":WidthControl
    }
}
</script>

<style lang="scss">
html,body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.full-map-page{
    height: calc(100% - 1.6rem);
    padding: .8rem;
}
.card-container-full{
    height: calc(100% - .8rem);
}
</style>