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
npm install git+https://usuario:clave_privada@github.com/conacyt-dai/dai-maps.git#version-a-instalar
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
    <dai-mapa :zoom="2" :centro="0,0">
        <dai-capa-xyz-osm/>
    </dai-map>
</template>

```



### Revisar la documentacion en local

```bash
npm install
npm run docs:serve

```

abrir localhost:8080