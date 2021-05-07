<template>
    <div>

        <div class="another-map">
            <p><strong>Mapa4</strong> Empezando a probar los controles </p>
            
            <dai-card-map-container :collapsed="false">
                <template v-slot:header>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus eveniet quod dolorum sint error deserunt voluptates aliquid cupiditate numquam, pariatur rerum placeat omnis corrupti? Aut delectus velit labore hic cum.</p>
                </template>
                <dai-map :zoom="3" ref="mapa4">
                    <dai-xyz-layer-osm id="osm_mapa4" />
                </dai-map>
                <template v-slot:footer>
                    <dai-legend for="estados_mapa4"/>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus eveniet quod dolorum sint error deserunt voluptates aliquid cupiditate numquam, pariatur rerum placeat omnis corrupti? Aut delectus velit labore hic cum.</p>
                    
                </template>
            </dai-card-map-container>

        </div>


        <div class="another-map">
            <p><strong>Mapa3</strong> Mapa simple con contenedor card con footer, y comprobando reactividad en los layers </p>
            
            <dai-card-map-container :collapsed="false">
                <template v-slot:header>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus eveniet quod dolorum sint error deserunt voluptates aliquid cupiditate numquam, pariatur rerum placeat omnis corrupti? Aut delectus velit labore hic cum.</p>
                </template>
                <dai-map :zoom="2" ref="mapa3">
                    <dai-xyz-layer-osm id="osm_mapa3" :visible.sync="visible_mapa3_1"/>
                </dai-map>
                <template v-slot:footer>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus eveniet quod dolorum sint error deserunt voluptates aliquid cupiditate numquam, pariatur rerum placeat omnis corrupti? Aut delectus velit labore hic cum.</p>
                    <div>
                        <button @click="visible_mapa3_1=!visible_mapa3_1"> opuesto a visible:{{visible_mapa3_1}}</button>
                        <button @click="cambiar_algo_mapa3_1"> cambiar estado de layer osm</button>

                    </div>
                </template>
            </dai-card-map-container>

        </div>

        

        <div class="another-map">
            <p><strong>Mapa2</strong> Mapa simple con contenedor card </p>
            <dai-card-map-container>
                <template v-slot:header>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus eveniet quod dolorum sint error deserunt voluptates aliquid cupiditate numquam, pariatur rerum placeat omnis corrupti? Aut delectus velit labore hic cum.</p>
                </template>
                <dai-map :zoom="2">
                    <dai-xyz-layer-osm/>
                </dai-map>
            </dai-card-map-container>
            
        </div>


        <div class="another-map">
            <p><strong>Mapa1</strong> Mapa simple sin contenedor card </p>
            <dai-map :zoom="2">
                <dai-xyz-layer-osm/>
            </dai-map>
        </div>

        

    </div>

    
    

    

</template>

<script>
import {DaiMap} from "../src/components/map"
import {DaiXyzLayerOsm} from "../src/components/xyz-layer-osm"
import {DaiCardMapContainer} from "../src/components/card-container"
import {DaiLegend} from "../src/components"
export default {
    name:"App",
    components:{
        DaiMap,DaiXyzLayerOsm,DaiCardMapContainer,
        DaiLegend
    },
    data:function(){
        return{
            visible_mapa3_1 :false
        }
    },
    methods:{
        cambiar_algo_mapa3_1:function(){
            let mapa = this.$refs.mapa3
            let layer = mapa.cmpLayers["osm_mapa3"]
            layer.olLayer.setVisible(!layer.olLayer.getVisible())
        }
    }

}
</script>

<style>
.another-map{
    padding: 1rem;
    
    max-width: 900px;
    background-color: lightgray;
    margin-right: auto;
    margin-left: auto;
    margin-top: 1rem;
}
html,body{
    margin: 0;
}
</style>