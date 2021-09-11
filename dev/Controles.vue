<template>
    <div>
        <!--MAPA 1-->
        <div class="another-map">
            <dai-tarjeta-contenedor-mapa :allow-collapsing="false">
                <template v-slot:header>
                    <p v-width-control="'100%'">Estilos y tamaños</p>
                    
                    <DaiSelectorMapa v-width-control="{mobile:'100%',desktop:'33%'}" class="control-small inverted">
                        <option value="una opcion">small control</option>
                    </DaiSelectorMapa>

                    <DaiInterruptorMapa :opciones="['t','p']" :opcionesEtiquetas="['small','control']" v-width-control="{mobile:'100%',desktop:'33%'}" class="control-small"></DaiInterruptorMapa>
                    
                    <p v-width-control="{mobile:'100%',desktop:'33%'}" class="control-small">with class control-small</p>

                    <DaiSelectorMapa v-width-control="{mobile:'100%',desktop:'33%'}" class="control-normal">
                        <option value="una opcion">normal control</option>
                    </DaiSelectorMapa>

                    <DaiInterruptorMapa :opciones="['t','p']" :opcionesEtiquetas="['normal','control']" v-width-control="{mobile:'100%',desktop:'33%'}" class="control-normal"></DaiInterruptorMapa>
                    
                    <p v-width-control="{mobile:'100%',desktop:'33%'}" class="control-normal">with class control-normal</p>

                    <DaiSelectorMapa v-width-control="{mobile:'100%',desktop:'33%'}" class="control-medium">
                        <option value="una opcion">medium control</option>
                    </DaiSelectorMapa>

                    <DaiInterruptorMapa :opciones="['t','p']" :opcionesEtiquetas="['medium','control']" v-width-control="{mobile:'100%',desktop:'33%'}" class="control-medium"></DaiInterruptorMapa>
                    
                    <p v-width-control="{mobile:'100%',desktop:'33%'}" class="control-medium">with class control-medium</p>

                    <DaiSelectorMapa v-width-control="{mobile:'100%',desktop:'33%'}" class="control-large">
                        <option value="una opcion">large control</option>
                    </DaiSelectorMapa>

                    <DaiInterruptorMapa :opciones="['t','p']" :opcionesEtiquetas="['large','control']" v-width-control="{mobile:'100%',desktop:'33%'}" class="control-large inverted"></DaiInterruptorMapa>
                    
                    <p v-width-control="{mobile:'100%',desktop:'33%'}" class="control-large">with class control-large</p>
                    
                    <DaiBuscadorMapa placeholder="sfdsdfg" v-width-control="'100%'" class="control-large" />

                    <DaiBuscadorMapa v-width-control="{mobile:'50%',desktop:'33%'}" placeholder="Buscador de estados" 
                    for="estados"
                    :accesorOptions="(f)=>f.nom_edo"
                    />

                    <DaiBuscadorMapa v-width-control="{mobile:'50%',desktop:'33%'}" placeholder="sfdsdfg" class="control-small inverted"/>
                    <DaiBuscadorMapa v-width-control="{mobile:'50%',desktop:'33%'}" placeholder="sfdsdfg" class="control-medium"/>

                </template>
                <DaiMapa  
                    :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                    <dai-capa-xyz/>
                    <DaiCapaGeojson id="estados" url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                </DaiMapa>
                <template v-slot:footer>
                    <DaiOpacidadMapa layerId="estados" />
                    <DaiSelectorMapa>
                        <option value="una opcion">otra opcion</option>
                    </DaiSelectorMapa>
                    <DaiOpacidadMapa title="Opacidad de otra capa"   v-width-control="{mobile:'50%',desktop:'100%'}"/>
                </template>
            </dai-tarjeta-contenedor-mapa>
        </div>

        <!--MAPA 1-->
        <div class="another-map">
            <dai-tarjeta-contenedor-mapa :allow-collapsing="false">
                <template v-slot:header>
                    <p>Agregando una capa geoson con un control de transparencia</p>
                    <DaiSelectorMapa>
                        <option value="una opcion">una opcion</option>
                    </DaiSelectorMapa>
                </template>
                <DaiMapa  
                    :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                    <dai-capa-xyz/>
                    <dai-capa-geojson id="estados" url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                </DaiMapa>
                <template v-slot:footer>
                    <DaiOpacidadMapa layerId="estados" />
                    <DaiSelectorMapa>
                        <option value="una opcion">otra opcion</option>
                    </DaiSelectorMapa>
                    <DaiOpacidadMapa title="Opacidad de otra capa"   v-width-control="{mobile:'50%',desktop:'100%'}"/>
                </template>
            </dai-tarjeta-contenedor-mapa>
            
        </div>

        <!--MAPA 2-->
        <div class="another-map">
            <dai-tarjeta-contenedor-mapa :collapsed="false" >
                <template v-slot:header>
                    <p>Agregando una capa geoson con un control de transparencia</p>
                    <DaiSelectorMapa>
                        <option value="una opcion">una opcion</option>
                    </DaiSelectorMapa>

                    <DaiInterruptorMapa :opciones="['t','p','o']" :opcionesEtiquetas="['Total','porcentaje','otr']" ></DaiInterruptorMapa>

                    <DaiInterruptorMapa :opciones="['t','p']" :opcionesEtiquetas="['Total','porcentaje']" ></DaiInterruptorMapa>
                </template>
                <DaiMapa  
                    :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                    <dai-capa-xyz-osm/>
                    <dai-capa-geojson 
                    id="estados" 

                    :contenidoTooltip="(f)=>f['abre']+' <br> Poblacion '+f['pob18ymas']"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                </DaiMapa>
                <template v-slot:footer>
                    <dai-leyenda-mapa  title="Titulo de la coropleta" for="estados" v-width-control="'100%'"></dai-leyenda-mapa>
                </template>
            </dai-tarjeta-contenedor-mapa>
            
        </div>

        

    </div>
</template>

<script>
import "./styles.css"



export default {
    name:"App",
    components:{
    },
    
    data:function(){
        return{
            
        }
    },
    methods:{
        
    }
}
</script>