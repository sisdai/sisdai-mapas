# dai-maps

Componentes reutilizables de mapas.

Si quieres contribuyes al código de este componente revisa los [lineamientos de contribución establecidos por salsa](https://salsa.crip.conacyt.mx/guidelines/contribute/)

## Como empezar

### Instalar y crear el primer mapa

1.- _En un futuro_ (hasta que se publique en npm)

```bash
npm install dai-maps
```

1.- _Por el momento_

```bash
npm install github:conacyt-dai/dai-maps#version-a-instalar
```

2.-

En el archivo `src/main.js`, importar y registrar el uso de los componentes de esta libreria

```javascript
// src/mai.js

import Vue from 'vue'
import App from './App.vue'
//agregar la libreria, su css y registrarla en Vue
import DaiMaps from "dai-maps"
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

Abrir [localhost:8080](localhost:8080)
