<template>
    <div class="another-map">

            <DaiMapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <DaiCapaXyz />
                <!--Un tooltip con contenido estatico-->
                <DaiCapaGeojson 
                id="estados_poligonos"
                :url="$withBase('/sample-edos.geojson')"
                @hover_feature="hover1"
                @click_feature="click1"
                :reglas-estilo-capa="{
                    clasificacion:'cuantiles',
                    columna:'pob18ymas',
                    colores:'Reds'
                }"
                />
                
            </DaiMapa>
            <p :style="{color:tooltip_fuera_color}">{{tooltip_fuera_contenido}}</p>
            <hr>
            <p :style="{color:tooltip_fuera_color2}">{{tooltip_fuera_contenido2}}</p>

    </div>
</template>

<script>
export default {
    methods:{
        hover1:function(e){
            // e = {feature: featureProperties, style: olStyle}
            // featureProperties => propiedades de la geometria, atributos asociados
            // olStyle => https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html
            this.tooltip_fuera_contenido = "ocurrio un hover en "+e.feature.nom_edo
            this.tooltip_fuera_color = e.style.getFill().getColor()
        },
        click1:function(e){
            //e = [olFeature, olLayer]
            //olFeature => https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html
            //olLayer  => https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html
            this.tooltip_fuera_contenido2 = "ocurrio un click en "+e[0].getProperties().nom_edo
            
        }
    },
    data:function(){
        return{
            tooltip_fuera_contenido:"Pasa el mouse sobre algun estado, y pon atencion al color de este texto",
            tooltip_fuera_color:"black",
            tooltip_fuera_contenido2:"Da click sobre algun estado",
            tooltip_fuera_color2:"black"

        }
    }
}
</script>