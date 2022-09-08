# Ejemplo de uso basico

## Mapa simple
Mapa con una capa de OSM usando el componente `<dai-capa-xyz-osm />` 

```html
<!--el centro en coordenadas [x,y] , es decir [longitud,latitud]-->
<dai-mapa :zoom="8" :centro="[-99.1332,19.4326]" >
    <dai-capa-xyz-osm/>
    <!--aqui se pueden agregar mas capas-->
</dai-mapa>
```

<uso-basico-1-mapa />


## Mapa con varias capas
Mapa con dos capas : una de tipo xyz desde carto con el tag `dai-capa-xyz` y otra a partir de un geojson con el tag `dai-capa-geojson`

```html
<dai-mapa :zoom="4" :centro="[-99.1332,19.4326]" >
    <dai-capa-xyz 
     url="https://{a-c}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
    />
    <dai-capa-geojson 
     :opacidad=".5"
     url="path/to/estados.geojson"
    />
</dai-mapa>
```

<uso-basico-2-mapa-capas/>


## Extension en vez de zoom-centro
Para mayor precisión en el acercamiento a una zona en algunos casos convendra usar la propiedad `extension`, cuando se define,  `zoom` y `centro` se ignoran.

```html
<dai-mapa 
:extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
>
    <dai-capa-xyz-osm/>
</dai-mapa>
```

<uso-basico-3-extension/>


## Botones y controles dentro del mapa invertidos

Cuando se requiera que los controles internos del mapa tengan el color invertido, con la propiedad `color-controles-invertidos`

```html

<dai-mapa 
:extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
:color-controles-invertidos="true"
>
    <dai-capa-xyz-osm/>
</dai-mapa>


```

<uso-basico-4-controles-invertidos/>


## Desabilitando el zoom al dar scroll

```html{3}
<button @click="permiteScroll= !permiteScroll">Permitir/desactivar scroll</button> 
{{permiteScroll}}
<dai-mapa :zoom-on-scroll="permiteScroll"
:extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
>
    <dai-capa-xyz/>
</dai-mapa>
```

```javascript
export default {
    data:function(){
        return {
            permiteScroll:true
        }
    }
}
```

<uso-basico-5-desabilita-scroll />

## Restringiendo la extension

```html
    <div class="another-map">
        <dai-mapa 
        
        :noSalirDeExtension="[
          -99.1935832197897156, 19.0239143256855989, -98.3333685283348444,
          20.1881341913398984,
        ]"
        >
            <dai-capa-xyz-osm/>
        </dai-mapa>
    </div>
```

<uso-basico-6-restringe-extension />


## Exportar el mapa a png

<uso-basico-7-exporta-png-mapa />


```html
<div class="another-map">
    <button @click="toPng">exportar</button>
    <a id="image-download" download="map.png"></a>
    <dai-mapa 
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    ref="mapa1"
    >
        <dai-capa-xyz/>
         <dai-capa-geojson 
        :opacidad=".5"
        url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson"/>
    </dai-mapa>
</div>
```


```javascript
export default {
    methods:{
        toPng(){
            let map = this.$refs["mapa1"]
            console.log(map.getPngDataUrl())
            const link = document.getElementById('image-download');
            link.href = map.getPngDataUrl()
            link.click();
        }
    }
}
```

## TopoJSON
Mapa sobre un TopoJSON como base `<dai-capa-topojson />`

<uso-basico-8-topojson />

```html
<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <dai-capa-topojson 
                  id="disponibilidad" 
                  :url="$withBase('/topojson-sample.json')"
                  :reglas-estilo-capa="{
                      columna : 'classification',
                      acomodoCategorias: ['Con disponibilidad', 'Sin disponibilidad'],
                      propiedadObjetivo: 'relleno',
                      clases: 2,
                      colores: ['#00AFB9', '#F07167'],
                  }"
                />
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>
```


## TopoJSON dinamico con zoom

<uso-basico-9-topojson-dinamico />
