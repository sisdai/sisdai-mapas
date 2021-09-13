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

## Agregar tooltips y Popups

