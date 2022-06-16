# Capas

## Opciones basicas de cualquier capa
En el ejemplo se muestra como la capas se pueden posicionar en su z-index, prenderse/apagarse y cambiar su opacidad dinamicamente

Para cualquier capa las propiedades que le permiten acomodarse en el mapa son `visible`,`opacidad` y `z-index` revisa la documentacion para mas informacion.

<capas-1-opciones/>

```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>
        <p>Hay 3 capas, alterna sus propiedades: </p>
        <p>
            <strong>Capa base estilo dark </strong>
            <button @click="capa_dark_visible = !capa_dark_visible" 
            class="dai-map-button">
                prender / apagar
            </button>
            visible= {{capa_dark_visible}}
            <button class="dai-map-button"
            @click="capa_dark_opacidad = capa_dark_opacidad==1?0:capa_dark_opacidad +.2">
                opacidad +20%
            </button>
            opacidad= {{capa_dark_opacidad}},
            z-index= 3
        </p>

        <p>
            <strong>Capa estados</strong>
            <button class="dai-map-button"
            @click="capa_estados_zindex = 4">
                enviar al frente
            </button>
            <button class="dai-map-button"
            @click="capa_estados_zindex = 1">
                enviar hasta atras
            </button>
            z-index= {{capa_estados_zindex}}
        </p>

        <p>
            <strong>Capa OSM</strong>
            <button class="dai-map-button"
            @click="capa_osm_visible=!capa_osm_visible">
                prender / apagar
            </button>
            visible= {{capa_osm_visible}},
            z-index= 2
        </p>
                
    </template>
    <dai-mapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-xyz 
        id="capa_dark"
        :visible="capa_dark_visible"
        :opacidad="capa_dark_opacidad"
        :z-index="3" 
        url="https://{a-c}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png" 
        />
            
        <dai-capa-geojson 
        id="capa_estados"
        :z-index="capa_estados_zindex"
        url="/sample-edos.geojson"
        />

        <dai-capa-xyz-osm 
        id="capa_osm" 
        :visible="capa_osm_visible"
        :z-index="2"
        />
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```

## Conectar datos
El siguiente ejemplo muestra como agregar la capa de estados de la Republica Mexicana de 3 maneras:

- **estados_poligonos** desde el url del archivo geojson
- **estados_centroides** desde un objeto javascript que ya esta cargado en el componente, usando la propiedad `datos`
- **estados_geoserver** desde el url del servicio de geoserver en formato wms. (si se toma un servicio en formato wfs se usara de la misma forma que *estados_poligonos*)

<capas-2-datos-en-capas/>

```html
<dai-tarjeta-contenedor-mapa :permitir-colapso="false">
    <dai-mapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >

        <dai-capa-geojson 
        id="estados_poligonos"
        url="/sample-edos.geojson"
        />
        <dai-capa-geojson 
        id="estados_centroides"
        :datos="centroides" 
        :estilo-capa="{circle:{fill:{color:'red'},radius:5}}"
        />
        <dai-capa-wms 
        id="estados_geoserver"
        url="https://geo.crip.conacyt.mx/geoserver/estados_inegi_2019/wms"
        :parametros="{'LAYERS':'estados_inegi_2019'}"
        />
    </dai-mapa>
    <template v-slot:header>
        <dai-leyenda-mapa
        :para="['estados_poligonos','estados_centroides','estados_geoserver']"
        />
    </template>
</dai-tarjeta-contenedor-mapa>
```

```javascript
import centroides from "./centroides-estados.json"
export default {
    data:function(){
        return {
            centroides : centroides
        }
    }
}
```

## Agregar estilo simple 
El estilo simple es aquel que es constante para la capa, por ejemplo, independientemente de los datos que tenga un poligono o punto en el sigueinte mapa siempre tendra el mismo color y contorno de su simbologia.

Utiliza la propiedad `estilo-capa` para definir el estilo simple.

<capas-3-estilo-simple/>

```html
<dai-tarjeta-contenedor-mapa :permitir-colapso="false">
<dai-mapa
:extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
>
    
    <dai-capa-geojson 
    id="estados_poligonos"
    titulo="Estados, poligonos"
    url="/sample-edos.geojson"
    :estilo-capa="{
        fill:{color:'#a0a0f7'},
        stroke:{ color: 'black'}
    }"
    />
    <dai-capa-geojson 
    id="estados_centroides"
    titulo="Estados, centroides"
    url="/centroides-estados.geojson"
    :estilo-capa="{
        circle:{
            fill:{color:'red'},
            stroke:{color:'green',width:3},
            radius:7}
        }"
    />

    </dai-mapa>
    <template v-slot:header>
        <dai-leyenda-mapa
        titulo="Capas con estilo simple"
        :para="['estados_poligonos','estados_centroides']"
        />
    </template>
</dai-tarjeta-contenedor-mapa>
```
## Agregar estilo basado en datos 

<capas-4-estilo-basado-datos />

```html
<dai-tarjeta-contenedor-mapa :permitir-colapso="false">
    <dai-mapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        
        <dai-capa-geojson 
        id="estados_poligonos"
        url="/sample-edos.geojson"
        :reglas-estilo-capa="{
            clasificacion:'cuantiles',
            columna:'pob18ymas',
            colores:'Reds',
            clases:4
        }"
        />
        <dai-capa-geojson 
        id="estados_centroides"
        url="/centroides-estados.geojson"
        :reglas-estilo-capa="[
            {
                clasificacion:'categorias',
                columna : 'estados_grado_marg',
                acomodoCategorias:['Muy bajo','Bajo','Medio','Alto','Muy alto'],
                propiedadObjetivo: 'relleno',
                colores:'GnBu'
            },
            {
                clasificacion:'cuantiles',
                columna:'estados_pob18ymas_rural',
                propiedadObjetivo:'proporcion',
                proporciones:[5,8,12,15,20],
                clases:5,
                tituloVariable:'Cantidad de problación'
            }
        ]"
        />
                
    </dai-mapa>
    <template v-slot:header>
        <dai-leyenda-mapa
        titulo="Poblacion mayor de 18 años"
        :para="['estados_poligonos']"
        />
        <dai-leyenda-mapa
        titulo="Grado de marginación, poblacion  rural"
        para="estados_centroides"
        :mostrar-boton-alterna-todos="true"
        />
    </template>
</dai-tarjeta-contenedor-mapa>
```

## Agregar tooltips 

Los tooltips son los cuadros de información que aparecen cuando el usuario pasa el mouse sobre algun elemento de la capa.

<capas-5-tooltips />

```html
<DaiMapa
:extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
>
    <DaiCapaXyz />
    <!--Un tooltip con contenido estatico-->
    <DaiCapaGeojson 
    contenidoTooltip="hola soy un tooltip"
    id="estados_poligonos"
    :url="$withBase('/sample-edos.geojson')"
    />
    <!--Un tooltip con contenido dinamico-->
    <DaiCapaGeojson
    :contenidoTooltip="(centroide)=>`Grado de marginación <br><b>${centroide.estados_grado_marg}</b>`"
    id="estados_centroides"
    :url="$withBase('/centroides-estados.geojson')"
    :estilo-capa="{circle:{fill:{color:'white'},stroke:{color:'black'},radius:5}}"
    />
</DaiMapa>
```

### Tooltips que se quedan cuando pasa el mouse sobre ellos

<capas-6-tooltip-contenido-para-click />

```html
<DaiMapa
:extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
>
    <DaiCapaXyz />
    <!--Un tooltip con un enlace-->
    <DaiCapaGeojson 
    contenido-tooltip="hola soy un tooltip con un <a href='https://google.com' target='_blank'>enlace</a>"
    :tooltip-estatico="true"
    :tooltip-estatico-margen-superior="2"
    id="estados_poligonos"
    url="/sample-edos.geojson"
    />
    <!--Un tooltip con un elemento abbr que tiene un title-->
    <DaiCapaGeojson
    :contenido-tooltip="(centroide)=>`un elemento abbr:<br>
        <abbr title='Grado de marginación :${centroide.estados_grado_marg}'>${centroide.estados_grado_marg}</abbr>`"
    :tooltip-estatico="true"
    :tooltip-estatico-margen-superior="5"
    id="estados_centroides"
    url="/centroides-estados.geojson"
    :estilo-capa="{circle:{fill:{color:'white'},stroke:{color:'black'},radius:6}}"
    />
</DaiMapa>
```


## Agregar popups

Los popups son los cuadros de información que aparecen cuando se da click a algun poligono/linea/punto. Se mantienen abiertos hasta que el usuario los cierre.
<capas-7-popups />

```html
<DaiTarjetaContenedorMapa>
    <DaiMapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <DaiCapaXyz />
        <!--Un popup-->
        <DaiCapaGeojson 
        contenido-popup="hola soy un popup<br>con algo mas de texto"
        url="/sample-edos.geojson"
        :zoom-al-dar-click="false"
        />

    </DaiMapa>
</DaiTarjetaContenedorMapa>
```

## Eventos de la capa


<capas-8-eventos-capas />

```html
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

```

```javascript
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
```

## Usar loader en las capas

Las capas que tienen una fuente remota, por ejempplo al cargar un geojson desde otra ubicacion o un servicio de geoserver, en algunos casos sera necesario usar un loader para que el usuario conoz ca que se esta esperando la peticion de otro servicio 

<capas-9-loader :loader_on_refresh_wms="true" />

```html
<dai-tarjeta-contenedor-mapa :permitir-colapso="false">
    <dai-mapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        
        <dai-capa-geojson 
        id="estados_poligonos"
        url="/sample-edos.geojson"
        :estilo-capa="{fill:{color:'yellow'},stroke:{color:'black',width:1}}"
        :use-loader="true"
        :visible="false"
        />
        
        <dai-capa-wms 
        id="estados_geoserver"
        url="https://dadsigvisgeo.conacyt.mx/geoserver/pueblosindigenas/wms"
        :parametros="{'LAYERS':'pueblosindigenas:estados_hist_resi'}"
        :use-loader="true"
        :visible="false"
        />
    </dai-mapa>
    <template v-slot:header>
        <dai-leyenda-mapa
        :para="['estados_poligonos','estados_centroides','estados_geoserver']"
        />
    </template>
</dai-tarjeta-contenedor-mapa>
```


El WMS y/o los formatos de mosaicos al ser formatos que en cada interaccion piden una  peticion al servicio remoto, por default al marcar la propiedad  `use-loader=true` desplegaran un loader cada vez que se prenda la capa y que se navegue en ella. Si solo se desea que el loader aparezca la primera vez que se carga la capa (para dar la percepcion que el mapa es mas fluido). Tendra  que agregar `use-loader-only-first-time = true` (Esto no aplica para las capas vectoriales)

<capas-9-loader :loader_on_refresh_wms="false" />

```html{17}
<dai-tarjeta-contenedor-mapa :permitir-colapso="false">
    <dai-mapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >   
        <dai-capa-geojson 
        id="estados_poligonos"
        url="/sample-edos.geojson"
        :estilo-capa="{fill:{color:'yellow'},stroke:{color:'black',width:1}}"
        :use-loader="true"
        :visible="false"
        />   
        <dai-capa-wms 
        id="estados_geoserver"
        url="https://dadsigvisgeo.conacyt.mx/geoserver/pueblosindigenas/wms"
        :parametros="{'LAYERS':'pueblosindigenas:estados_hist_resi'}"
        :use-loader="true"
        :useLoaderOnlyFirstTime="true"
        :visible="false"
        />
    </dai-mapa>
    <template v-slot:header>
        <dai-leyenda-mapa
        :para="['estados_poligonos','estados_centroides','estados_geoserver']"
        />
    </template>
</dai-tarjeta-contenedor-mapa>
```