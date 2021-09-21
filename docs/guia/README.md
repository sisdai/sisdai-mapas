---
sidebar: auto
---

# Guía de inicio

## Como empezar

### Instalación

1.- *En un futuro* (hasta que se publique en npm)

`npm install dai-maps`


1.- *Por el momento* v{{ $themeConfig.version }}


`npm install git+https://devtemp-invitado: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@github.com/conacyt-dai/dai-maps.git#v{{$themeConfig.version}}`


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

## Niveles de mapa

Los niveles en el mapa tienen como objetivo avisar a todos los compoenentes que dependan del nivel del mapa que se ha cambiado de nivel, piense en un mapa que muestra informacion diferente segun el municipio, estado o metropoli en el que se encuentran. 

La manera en que funciona es la siguiente:

Se le asigna los niveles disponibles al mapa (el nivel que se lleve al resetear el mapa siempre sera el primero)
```html{2}
<dai-mapa 
:niveles="['nacional','estatal','municipal']"
></dai-mapa>
```

Se define el nivel que queremos actualmente (si no se define por default sera el primero de la lista)
```html{3}
<dai-mapa 
:niveles="['nacional','estatal','municipal']"
:nivelActual.sync="nivel"
></dai-mapa>
```
```javascript
data(){
    return {
        nivel: 'estatal'
    }
}
```

Se define que hacer cuando cambie el nivel
```html{4}
<dai-mapa 
:niveles="['nacional','estatal','municipal']"
nivelActual="estatal"
@cambioNivel="algunaAccion"
></dai-mapa>
```
```javascript
methods:{
    algunaAccion(nivel){
        //definiendo acciones al cambiar nivel
    }
}
```

¿Como se cambia de nivel?
El nivel en el mapa cambia en los siguientes casos:

1. Cuando el usuario da click en el boton de retroceso <span class="dai-icon-regresar"></span>
2. Cuando el usuario da click en el boton de reset <span class="dai-icon-centrar"></span> (en tal caso se regresa al primer nivel)
3. Cuando la propiedad `nivelActual` es un valor que cambia, en uno o dos sentidos, al cambiar se emite este evento. Recomendable que sea en ambos sentidos añadiendo .sync a la propiedad.
4. Cuando se invoca el metodo `setNivel(nuevonivel)`
5. Cuando se invoca el metodo `setNivelRetroceso()` equivalente al caso 1.
6. Cuando se invoca el metodo `resetMap()` equivalente al caso 2


Consulte la documentacion y ejemplos de esta funcionalidad en [dai-mapa](/componentes/README.md)