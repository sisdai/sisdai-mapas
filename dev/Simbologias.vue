<template>
    <div>
        <div class="another-map">
            <dai-card-map-container>
                <template v-slot:header>
                    <p>Agregando estilo simple a las capas</p>
                </template>
                <dai-map :zoom="2" >

                </dai-map>
            </dai-card-map-container>
        </div>

    </div>
</template>

<script>
import "./styles.css"

import {DaiMap} from "../src/components/map"
import {DaiCardMapContainer} from "../src/components/card-container"
//import {DaiLegend,DaiMapSelector} from "../src/components"
import {WidthControl} from "@/directives"
export default {
    name:"App",
    components:{
        DaiMap,DaiCardMapContainer,
        //DaiXyzLayerOsm,
        //DaiLegend,DaiMapSelector
    },
    directives:{
        "width-control":WidthControl
    }
}
</script>

<style>

</style>