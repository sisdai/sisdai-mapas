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
<template>
    <div class="another-map">
        <dai-mapa 
        :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
        :color-controles-invertidos="true"
        >
            <dai-capa-xyz-osm/>
        </dai-mapa>
    </div>
    
</template>

```

<uso-basico-4-controles-invertidos/>


