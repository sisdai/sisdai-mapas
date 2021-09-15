---
sidebar: auto
---

# Guía de inicio

## Como empezar

### Instalación

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

### Registro en la app de vue
2.- En el archivo `src/main.js`, importar y registrar el uso de los componentes de esta libreria
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

### Primer mapa basico
3.- Dentro del componente en el que se desee crear mapas con el diseño Dai mandar a llamar al componente `dai-map`, dentro de el agregar los layers necesarios
```html
<template>
    <!--el centro como coordenadas (x,y) en EPSG:4326 (longitud,latitud) -->
    <dai-map :zoom="2" :centro="0,0">
        <dai-capa-xyz-osm/>
    </dai-map>
</template>

```

## Mapa basico vs TarjetaContenedor

El mapa basico se logra solo con el componente `<dai-mapa>` y solo permite agregar capas , pero el componente `<dai-tarjeta-contenedor-mapa>` permite agregar encabezados y pie de mapa, y en ellos agregar disversos controles como leyendas,controles y titulos. Usted evaluara, dependiendo de la distribucion y elementos que necesita su mapa , si usa solo una o las dos.