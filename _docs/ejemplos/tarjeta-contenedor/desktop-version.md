---
sidebar: false
---
#  Tarjeta contenedor

## Redistribucion del diseño en Desktop

La tarjeta contenedor cuenta con una propiedad para definir si el mapa se distribuira de manera diferente en las pantallas mas anchas: `es-version-escritorio-en-pantalla-larga`, con esta propiedad definida en `true` automaticamente el header y el footer se acomodas del lado lateral del mapa.

```html{3}
<dai-tarjeta-contenedor-mapa
:colapsada="false" 
:es-version-escritorio-en-pantalla-larga="true"
>
    <template v-slot:header>  
        ...
    </template>
    <dai-mapa>
        ...
    </dai-mapa>
    <template v-slot:footer>  
        ...
    </template>
</dai-tarjeta-contenedor-mapa>
```

<tarjeta-contenedor-6-desktop-version />