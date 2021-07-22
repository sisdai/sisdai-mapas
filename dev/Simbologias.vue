<template>
    <div>
        <div class="another-map">
            <dai-tarjeta-contenedor-mapa :colapsada="false">
                <template v-slot:header>
                    <p>Agregando estilo simple a las capas</p>
                </template>
                <dai-mapa  
                    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                 
                    <dai-capa-geojson :datos="datos_cultivos"  id="cultivos"
                        :reglas-estilo-capa="[
                        {columna:'cultivo',colores:'Category10'},
                        {columna:'cultivo_tot',clasificacion:'cortes-naturales',clases:4,proporciones:[4,6,12,16],propiedadObjetivo:'proporcion',tituloVariable:'Cantidad de cultivos'}
                        ]"
                    />
                    <dai-capa-geojson :datos="datos_cultivos"  id="cultivos2"
                        :reglas-estilo-capa="[
                        {columna:'cultivo_tot',clasificacion:'cuantiles',clases:3,proporciones:[1,2,3],propiedadObjetivo:'proporcion',tituloVariable:'Cantidad de cultivos leyenda 2'}
                        ]"
                        :estilo-capa="{style:{circle:{'fill':{color:'red'},stroke:{color:'black',width:1}}}}"
                    />
                </dai-mapa>
                <template v-slot:footer>
                    <dai-leyenda-mapa :para="['cultivos','cultivos2']" titulo="Capas de este mapa" :mostrar-boton-alterna-todos="true"></dai-leyenda-mapa>
                </template>
            </dai-tarjeta-contenedor-mapa>
        </div>

        <div class="another-map">
            <dai-tarjeta-contenedor-mapa :colapsada="false">
                <template v-slot:header>
                    <p>Agregando estilo simple a las capas</p>
                </template>
                <dai-mapa  
                    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                 
                    <dai-capa-geojson :datos="datos_cultivos"  id="cultivos3"
                        :reglas-estilo-capa="[
                        {columna:'cultivo_tot',colores:'Blues',clasificacion:'cuantiles',clases:6},
                        {columna:'cultivo_tot',clasificacion:'cuantiles',clases:4,proporciones:[4,6,12,20],propiedadObjetivo:'proporcion',tituloVariable:'Cantidad de cultivos'}
                        ]"
                    />

                    <dai-capa-geojson :datos="datos_cultivos"  id="cultivos4"
                    />
                    <dai-capa-geojson :datos="datos_cultivos"  id="cultivos5"
                    />

                    
                </dai-mapa>
                <template v-slot:footer>
                    <dai-leyenda-mapa :para="['cultivos3']" titulo="Capas de este mapa 2" :mostrar-boton-alterna-todos="true"></dai-leyenda-mapa>
                    <dai-leyenda-mapa :para="['cultivos4','cultivos5']" titulo="segunda leyenda"/>
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