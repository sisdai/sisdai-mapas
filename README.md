# dai-maps

Componentes reutilizables de mapas para la DAI.

Si contribuyes al codigo de este componente ve a  [esta sección](#contribuir)

## Como empezar

### Instalar y crear el primer mapa

1.- *En un futuro* (hasta que se publique en npm)
```bash
npm install dai-maps
```

1.- *Por el momento*
```bash
git clone https://github.com/conacyt-dai/dai-maps
cd dai-maps
npm install
npm run build
cd ..
# ... crear el nuevo proyecto desde el vue-cli...
# una vez creado, instalar con la ruta al repositorio dai-maps en local
npm install ..path/to/dai-maps
```

2.- 

En el archivo `src/main.js`, importar y registrar el uso de los componentes de esta libreria
```javascript
import Vue from 'vue'
import App from './App.vue'
//agregar la libreria, su css y registrarla en Vue
import DaiMaps from "dai-maps"
import "dai-maps/dist/dai-maps.css"
Vue.use(DaiMaps)


new Vue({ ... el codigo de siempre
```

Tambien seria posible instalar subcomponentes especificos [TERMINAR DE REDACTAR ESTA SECCION]

3.-
Dentro del componente en el que se desee crear mapas con el diseño Dai mandar a llamar al componente `dai-map`, dentro de el agregar los layers necesarios
```html
<template>
    <!--el center como coordenadas (x,y) en EPSG:4326-->
    <dai-map :zoom="2" :center="0,0">
        <dai-xyz-layer-osm/>
    </dai-map>
</template>

```

Si se ocupa crear un mapa con header y/o footer. Dentro del header y footer se puede agregar otros controles del mapa o simple html.

Para usarlos se implementa el componente `dai-card-map-container` y dentro de el necesariamente habria que generar  el mapa con `dai-map` y opcionalmente un template con el atributo `v-slot:header` y otro con el atributo `v-slot:footer`. 

```html
<template>
    <dai-card-map-container>
        <template v-slot:header>
            <p>Lorem ipsum, dolor..</p>
        </template>
        <dai-map :zoom="2" :center="0,0">
            <dai-xyz-layer-osm/>
        </dai-map>
        <template v-slot:footer>        
            <button @click="hago_algo"> soy un boton</button>            
        </template>
    </dai-card-map-container>
</template>
```


### Cambiar algunas carcateristicas del mapa

#### el tamaño del mapa 

```html
<template>
    <dai-map :zoom="2" class="custom-size">
        <dai-xyz-layer-osm/>
    </dai-map>
</template>
<style>
.custom-size{
    height:400px
    width:600px
}
</style>
```

#### el tamaño minimo de la card-container


## Contribuir