<template>
    <div>

        <div class="another-map">
            <p><strong>Mapa4</strong> Empezando a probar los controles </p>
            
            <dai-card-map-container :collapsed="false" >
                <template v-slot:header>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus eveniet quod dolorum sint error deserunt voluptates aliquid cupiditate numquam, pariatur rerum placeat omnis corrupti? Aut delectus velit labore hic cum.</p>
                    <dai-map-selector  v-model="model_selector1_mapa4" @change:#layer[osm_mapa4]="escuchando_evento_mapa4_1" @change="escuchando_evento_mapa4">
                        <option value="a">opcion a</option>
                        <option value="b">opcion b</option>
                        <option value="c">opcion c</option>
                        <option value="d">opcion d</option>
                    </dai-map-selector>
                    <dai-map-selector v-width-control="'200px'"  class="control-large" >
                        <option value="a">opcion a</option>
                        <option value="b" selected>opcion b</option>
                    </dai-map-selector>
                    <dai-map-selector v-width-control="{mobile:'100%',desktop:'10%'}" class="control-small">
                        <option value="a">opcion a</option>
                        <option value="b">opcion b</option>
                    </dai-map-selector>
                </template>
                <dai-map :zoom="3" ref="mapa4" class="custom-size2">
                    <dai-xyz-layer-osm id="osm_mapa4" />
                </dai-map>
                <template v-slot:footer>
                    <dai-legend for="estados_mapa4"/>
                    <dai-map-selector class="dark-control" >
                        <option value="a">opcion a</option>
                        <option value="b">opcion b</option>
                    </dai-map-selector>
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
            <dai-map :zoom="2" class="custom-size">
                <dai-xyz-layer-osm/>
            </dai-map>
        </div>

        

    </div>

    
    

    

</template>

<script>
import "./styles.css"
import {DaiMap} from "../src/components/map"
import {DaiXyzLayerOsm} from "../src/components/xyz-layer-osm"
import {DaiCardMapContainer} from "../src/components/card-container"
import {DaiMapSelector} from "../src/components/selector-control"
import {DaiLegend} from "../src/components/legend-control"
import {WidthControl} from "@/directives"
export default {
    name:"App",
    components:{
        DaiMap,DaiXyzLayerOsm,DaiCardMapContainer,
        DaiLegend,DaiMapSelector
    },
    data:function(){
        return{
            visible_mapa3_1 :false,
            model_selector1_mapa4:"b"
        }
    },
    methods:{
        cambiar_algo_mapa3_1:function(){
            let mapa = this.$refs.mapa3
            let layer = mapa.cmpLayers["osm_mapa3"]
            layer.olLayer.setVisible(!layer.olLayer.getVisible())
        },
        escuchando_evento_mapa4:function(valor){
            console.log(valor,"ffff")
        },
        escuchando_evento_mapa4_1:function(valor){
            console.log(valor,"el valor desde otro")
        }
    },
    directives:{
        "width-control":WidthControl
    }

}
</script>

<style>
.custom-size{
    height: 200px;
}

.custom-size2{
    height: 70vh;
}
</style>