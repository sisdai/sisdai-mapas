# Directivas y clases CSS para los controles en general

## Directiva  v-width-control

Directiva que se puede aplicar a cualquier elemento, que sea hijo directo del slot footer o del slot header. Indica que tan ancho queda el elemento y dentro del espacio disponible. Dependiendo del ancho que se especifique, y si aun caben mas elementos en la misma linea, los siguientes elementos se distribuiran automaticamente.

### Uso

```html{3,4,8}
...
<template v-slot:header>
    <dai-opacidad-mapa v-width-control="`'100px'" />
    <p v-width-control="`'200px'" >
        Un parrafo que si aun cabe, se mantiene en la misma linea que el control anterior
    </p>

    <p v-width-control="`'100%'" >
        Un parrafo que sin duda se acomoda en la siguiente linea porque ocupa el 100% de su contenedor.
    </p>
</template>
...

```

### Valor aceptado

- Type: `String` | `Object`
- Default: `undefined`

Cuando se define un String se espera una propiedad css que defina el valor de la anchura del elemento.

Cuando se define un objeto, tratando de cumplir la responsividad de los elementos se definen tamaños para pantallas *mobile* y *desktop*. Las keys esperadas son: 

```json
{
    "mobile": [anchura css],
    "desktop": [anchura css],

}
```

## Clases CSS para definir tamaño

Clases para definir el peso y tamaño del control. los valores disponibles son

- `control-small`
- `control-normal`
- `control-medium`
- `control-large`

Si no se define ninguna de las clases anteriores, el tamaño por default es equivalente a la clase `control-normal`

### Uso

```html
...
<dai-selector-mapa class="control-small">
 ...
</dai-selector-mapa>
...
```

```html
...
<dai-buscador-mapa class="control-large">
 ...
</dai-buscador-mapa>
...
```

## Clase CSS para invertir los colores del control

### Nombre de la clase

 `inverted`

Por default los colores de los controles dependeran de la paleta de colores que se haya definido para todo el mapa . Cuando esta clase es definida los colores se invierten