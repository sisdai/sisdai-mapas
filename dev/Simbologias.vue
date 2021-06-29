<template>
    <div>
        <div class="another-map">
            <dai-tarjeta-contenedor-mapa :collapsed="false">
                <template v-slot:header>
                    <p>Agregando estilo simple a las capas</p>
                </template>
                <dai-mapa  
                    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                 
                    <dai-geojson-layer :source="datos_cultivos"  id="cultivos"
                        :map-style-rule="[
                        {columna:'cultivo',colores:'Category10'},
                        {columna:'cultivo_tot',clasificacion:'cuantiles',clases:4,proporciones:[4,6,12,16],propiedadObjetivo:'proporcion',tituloVariable:'Cantidad de cultivos'}
                        ]"
                    />
                    <dai-geojson-layer :source="datos_cultivos"  id="cultivos2"
                        :map-style-rule="[
                        {columna:'cultivo_tot',clasificacion:'cuantiles',clases:3,proporciones:[1,2,3],propiedadObjetivo:'proporcion',tituloVariable:'Cantidad de cultivos leyenda 2'}
                        ]"
                        :map-style="{style:{circle:{'fill':{color:'red'},stroke:{color:'black',width:1}}}}"
                    />
                </dai-mapa>
                <template v-slot:footer>
                    <dai-leyenda-mapa :para="['cultivos','cultivos2']" titulo="Capas de este mapa" :mostrar-boton-alterna-todos="true"></dai-leyenda-mapa>
                </template>
            </dai-tarjeta-contenedor-mapa>
        </div>

        <div class="another-map">
            <dai-tarjeta-contenedor-mapa :collapsed="false">
                <template v-slot:header>
                    <p>Agregando estilo simple a las capas</p>
                </template>
                <dai-mapa  
                    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                 
                    <dai-geojson-layer :source="datos_cultivos"  id="cultivos3"
                        :map-style-rule="[
                        {columna:'cultivo_tot',colores:'Blues',clasificacion:'cuantiles',clases:6},
                        {columna:'cultivo_tot',clasificacion:'cuantiles',clases:4,proporciones:[4,6,12,20],propiedadObjetivo:'proporcion',tituloVariable:'Cantidad de cultivos'}
                        ]"
                    />
                    
                </dai-mapa>
                <template v-slot:footer>
                    <dai-leyenda-mapa :para="['cultivos3']" titulo="Capas de este mapa 2" :mostrar-boton-alterna-todos="true"></dai-leyenda-mapa>
                </template>
            </dai-tarjeta-contenedor-mapa>
        </div>
    </div>
</template>

<script>
import "./styles.css"



import datos from "./data/circulos-sample.json"

export default {
    name:"App",
    components:{
        
    },
    data:function(){
        return {
            datos_cultivos:datos
        }
    },
    directives:{
        
    }
}
</script>

<style>

</style>