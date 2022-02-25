# Controles

## Opacidad

<controles-1-opacidad/>

```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>  
        <h3>Control de opacidad</h3> 
        
    </template>
    <dai-mapa :zoom="3">
        <dai-capa-xyz-osm id="capa_base" :opacidad=".5"/>
    </dai-mapa>

    <template v-slot:footer>  
        <dai-opacidad-mapa :value=".5" capaId="capa_base"/>
        
    </template>
</dai-tarjeta-contenedor-mapa>
```


## Selector

<controles-2-selector/>

```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>  
        <h3>Control de seleccion</h3> 
        <dai-selector-mapa 
        v-model="capa_prendida"
        v-width-control="'100%'" 
        class="control-large" 
        @change="cambioSelector"
        >
            <option value="dark">Capa base oscura</option>
            <option value="light">Capa base clara</option>
        </dai-selector-mapa>
    </template>
    <dai-mapa :zoom="3">
        <dai-capa-xyz 

        :visible="capa_prendida==='dark'"
        url="https://{a-c}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
        />
        <dai-capa-xyz 
        :visible="capa_prendida==='light'"
        url="https://{a-c}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
        />
    </dai-mapa>

    <template v-slot:footer>  


    </template>
</dai-tarjeta-contenedor-mapa>
```

```javascript
export default {
    data:function(){
        return {
            capa_prendida:'dark'
        }
    },
    methods:{
        cambioSelector:function(e){
            console.log("Este es el nuevo valor",e);
        }
    }
}   
```

## Interruptor

<controles-3-interruptor />

```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>  
        <h3 v-width-control="'100%'" >Control de interruptor</h3> 
        <dai-interruptor-mapa
        v-model="capa_prendida"
        :opciones="['dark','light']"
        /> 

        <dai-interruptor-mapa
        v-model="capa_prendida"
        :opciones="['dark','light']"
        :opciones-etiquetas="['Oscuro','Claro']"
        /> 
    </template>
    <dai-mapa :zoom="3">
        <dai-capa-xyz 

        :visible="capa_prendida==='dark'"
        url="https://{a-c}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
        />
        <dai-capa-xyz 
        :visible="capa_prendida==='light'"
        url="https://{a-c}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
        />
    </dai-mapa>

            
</dai-tarjeta-contenedor-mapa>
```

```javascript
export default {
    data:function(){
        return {
            capa_prendida:'dark'
        }
    }
    
}
```

## Buscador

<controles-4-buscador />

```html

<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>  
        <h3 v-width-control="'100%'" >Control de busqueda</h3> 
        <dai-buscador-mapa 
        para="estados"
        :acceso-opciones="(f)=>f.nom_edo"
        placeholder="Buscar estado"
        />
    </template>
    <dai-mapa 
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-geojson 
        id="estados" 
        url="/sample-edos.geojson"
        />
    </dai-mapa>

            
</dai-tarjeta-contenedor-mapa>
    
```

## Leyenda
<controles-5-leyenda/>

```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>  
        <h3 v-width-control="'100%'" >Control de leyenda</h3> 
        <dai-leyenda-mapa
        titulo="Este es el titulo de la leyenda"
        :para="['estados','estados2','estados3','corredores']"
        :mostrar-boton-alterna-todos="true"
        :tamanosDeMapa="true"
        />
    </template>
    <dai-mapa 
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-geojson 
        id="estados" 
        url="/sample-edos.geojson"
        />
        <dai-capa-geojson 
        id="estados2" 
        titulo="Estados con titulo"
        url="/centroides-estados.geojson"
        />
        <dai-capa-geojson 
        id="estados3" 
        url="/centroides-estados.geojson"
        :estilo-capa="{circle:{fill:{color:'purple'},radius:3}}"
        />
        <dai-capa-geojson 
        id="corredores" 
        url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion%3Acorredores&bbox=-117.1227035522461%2C14.684399604797363%2C-86.80320739746094%2C32.595672607421875&width=768&height=453&srs=EPSG%3A4326&styles=&format=geojson"
        :visible="false"
        :estilo-capa="{
            stroke:{color:'red',width:2}
        }"
        tipoGeometria="LineString"
        />
    </dai-mapa>        
</dai-tarjeta-contenedor-mapa>
```

## Info

<controles-6-info/>

```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>
        <p>Da click en el mapa y en algun estado</p>
    </template>
    <dai-mapa 
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    @click="coordinate = $event.coordinate.toString()+' coordenada clickeada en el mapa'"
    @reset_view="vista_reseteada"
    >
        <dai-capa-geojson 
        id="estados" 
        url="/sample-edos.geojson"
        @click_feature="click_estados"
        />

        <dai-info-mapa
        :colapsado="false"
        >
            <p>{{coordinate}}</p>
            <p>Estado seleccionado <strong>{{estado}}</strong></p>
        </dai-info-mapa>

    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```

```javascript
export default {
    data:function(){
        return {
            coordinate: "click para capturar la coordenada",
            estado:  "da click en uno"
        }
    },
    methods:{
        click_estados:function(evento){
            //console.log("se dio click en los estados", evento)
            let feature = evento[0];
            this.estado = `${feature.getProperties()["nom_edo"]}`;
        },
        vista_reseteada:function(){
            this.estado = "da click en uno"
        }
    }
}
```

## Controles nativos, solo de estilo
Hay elementos dentro del mapa que no necesariamente son componentes como titulos, notas y botones normales. Para ellos solo es necesario poner las clases css necesarias para llegar al estilo deseado, aqui la referencia de las clases de algunos elementos nativos que se pueden agregar.

<controles-7-controles-estilo />

```html
<dai-tarjeta-contenedor-mapa :colapsada="false" altura-colapsada="70vh">
    <template v-slot:header>
        <dai-selector-mapa class="control-large" v-width-control="'100%'">
            <option value="o">Titulo de visualizacion dropdown</option>
        </dai-selector-mapa>
        <p v-width-control="'100%'">Lorem ipsum dolor, sit amet consectetur adipisicing elit. A sapiente repellat ea iusto ab, esse autem placeat mollitia sint natus labore cupiditate ipsum perspiciatis, reiciendis ad, aspernatur omnis facere aliquam!</p>

        <dai-selector-mapa  v-width-control="'60%'">
            <option value="o">Selector</option>
        </dai-selector-mapa>

        <dai-interruptor-mapa :opciones="['Switch 1','Switch2']" v-width-control="'40%'" />
    </template>
    <dai-mapa 
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-geojson 
        id="estados" 
        url="/sample-edos.geojson"
        :reglas-estilo-capa="{
            clasificacion:'cuantiles',
            columna:'pob18ymas',
            colores:'GnBu',
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
                colores:'Reds'
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
        <dai-capa-geojson 
        id="puntos_simple"
        titulo="Titulo para puntos simples 1"
        url="/centroides-estados.geojson"
        :estilo-capa="{circle:{fill:{color:'orange'},radius:4}}"
        />
        <dai-capa-geojson 
        id="puntos_simple2"
        titulo="Titulo para puntos simples 2"
        url="/centroides-estados.geojson"
        :estilo-capa="{circle:{fill:{color:'black'},radius:2}}"
        />

        <dai-info-mapa>
            <p><strong>Valores totales seleccionados</strong></p>
            <p>Variable 1: 100,000,000,000<br>Variable 2: 100,000,000,000</p>
        </dai-info-mapa>
    </dai-mapa>
    <template v-slot:footer>
        <dai-leyenda-mapa  
        titulo="Titulo de la leyenda 1" 
        para="estados" 
        :mostrar-boton-alterna-todos="true" 
        v-width-control="'100%'" />
        <!--Para poner dentro del titulo del control de opacidad el porcentaje-->
        <dai-opacidad-mapa 
        capa-id="estados" 
        v-width-control="'100%'" 
        :value.sync="opacidad_capa" 
        :titulo="`Opacidad ${(opacidad_capa*100).toLocaleString('en-US')}%`"/>
        <hr class="dai-map-separator ">
            
        <dai-leyenda-mapa  
        titulo="Titulo de la leyenda 2" 
        para="estados_centroides" 
        :mostrar-boton-alterna-todos="true" 
        v-width-control="'100%'" />
        <hr class="dai-map-separator ">
        <dai-leyenda-mapa 
        :para="['puntos_simple','puntos_simple2']" 
        titulo="Titulo de la leyenda 3" 
        :mostrar-boton-alterna-todos="true"
        />
        <hr class="dai-map-separator thick">
        <div class="dai-map-notes">
            <h4>Notas</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, voluptates non esse accusamus eius unde obcaecati explicabo tenetur</p>
            <hr class="dai-map-separator thin">
            <p>
                <strong>Fuente</strong> ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ex unde asperiores ab, esse quas nihil, 
            </p>
            <p>
                <strong>Marco Geoestadistico</strong> ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ex unde asperiores ab, esse quas nihil, 
            </p>
        </div>
        <hr class="dai-map-separator thick">
            
        <button class="dai-map-button download">Descargar datos </button>
    </template>
</dai-tarjeta-contenedor-mapa>
```

```javascript
<script>
export default {
    data: function(){
        return {
            opacidad_capa:1
        }
    }
}
</script>
```

## Leyenda antes de cargar los datos

<controles-8-leyenda-simple-antes-cargar />


```html
<dai-tarjeta-contenedor-mapa>
    <template #header>
        <dai-leyenda-mapa para="centroides_1234" :tamanosDeMapa="true" />
    </template>
    <dai-mapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-xyz/>
        <dai-capa-geojson 
        id="centroides_1234"
        :url="$withBase('/centroides-estados.geojson')"
        :visible="false"
        :estilo-capa="{
            circle:{
                fill:{color:'red'},
                stroke:{color:'green',width:2},
                radius:5
            }
        }"
        tipoGeometria="Point"
        />
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```
## Leyenda con un checkbox para alternar todos

<controles-9-leyenda-checkbox-alternar-todos />

```html
<dai-leyenda-mapa
titulo="Este es el titulo de la leyenda"
:para="['estados','estados2','estados3','corredores']"
:mostrar-boton-alterna-todos="true"
estilo-boton-alterna-todos="checkbox"
:tamanosDeMapa="true"
:colapsable="true"
:infos="{
    estados: '<p>Del griego <em>phaios</em>, oscuro, y del ruso<em>phaios</em> <em>zemlja</em>, tierra.</p><p>Suelos con capas orgánicas de espesor mayor a 10 cm y presentan una concentración mayor al 18% de carbono orgánico. Son suelos de alto valor ecológico debido a sus propiedades de absorción de humedad.</p><p>El encalado y el drenaje combinados son prácticas que aumentan la disponibilidad de nutrientes y carbono orgánico, así como disminuyen la toxicidad por aluminio en el suelo. Los Gleysoles son aprovechados en México como pastizales cultivados y por su extensión constituyen una fuente importante de carbono especialmente en la vegetación de tular, manglar y popal.</p>',
    estados3:'<p>tooltip Estados con título</p>',
    corredores:'<strong>tooltip estados3</strong>',
    ':header:':'Este es el titulo de la leyenda'
}"
/>

```

## Leyendas con infos del lado opuesto y wms




<controles-10-leyenda-mas-opciones />


```html
<dai-tarjeta-contenedor-mapa :permitir-colapso="false">
    <template v-slot:header>
        <dai-leyenda-mapa
        :para="['poligonosx','wmsx']"
        titulo="Mas opciones para una leyenda"
        :infos="{
            poligonosx: 'Hola soy una capa con relleno de textura',
            wmsx: {
                contenido:'<b>Soy una capa desde servidor wms</b> geoserver',
                lado:'izquierdo'
            },
            ':header:': {
                contenido:'Un info del titulo',
                lado: 'izquierdo'
            }
        }"
        />
    </template>
    <dai-mapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-geojson 
        id="poligonosx"
        :url="$withBase('/sample-edos.geojson')"
        titulo="Capa con relleno textura"
        :usar-texturas-en-relleno="true"
        />        
        <dai-capa-wms 
        id="wmsx"
        titulo="Capa wms"
        url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms"
        :parametros="{'LAYERS':'estados_210521'}"
        />
    </dai-mapa>
    
</dai-tarjeta-contenedor-mapa>
```