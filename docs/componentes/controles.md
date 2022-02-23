# Controles

## dai-opacidad-mapa

Control de opacidad para capas dentro del mapa
### Uso

```html{6}
<dai-tarjeta-contenedor-mapa>
    <dai-mapa>
        <dai-capa-xyz id="capa1" .../>
    </dai-mapa>
    <template v-slot:footer>
        <dai-opacidad-mapa capa-id="capa1"/>
    </template>
</dai-tarjeta-contenedor-mapa>

```

### propiedades 
#### value
- Type: `Number`
- Default: `1`
- v-model

#### capa-id
- Type: `String`
- Default: `''`
- Required

#### titulo

- Type: `String`
- Default: `'Opacidad'`

## dai-selector-mapa

### propiedades

#### value
- Type: `String`
- Default: `undefined`
- v-model

## dai-intrerruptor-mapa

### propiedades

#### opciones

- Type: `Array`
- Default: `['on','off']`


#### opciones-etiquetas

- Type: `Array`
- Default: `undefined`

#### value 

- Type: `String`
- Default: `undefined`
- v-model

## dai-buscador-mapa

### propiedades

#### para

- Type: `Array`, `String`
- Default: `undefined`
- Required

lista de nombres o nombre de las capas a las que se les aplicara el buscador

#### acceso-opciones 

- Type: `Function`
- Default: `undefined`
- Required

Las opciones a llenar en el datalist, asegurarse de que son unicas, es una funcion de tipo `(f)=>f['nombre_columna']`, donde, `f` es la fila del dataset 

#### value
- Type: `String`
- Default: `undefined`
- v-model

## dai-leyenda-mapa

### propiedades

#### titulo

- Type: `String`
- Default: `''`

Titulo de la leyenda, el texto que se posiciona en la parte superior de la leyenda

#### para

- Type: `String`, `Array`
- Default: `undefined`
- Required

La capa o las capas (en caso de introducir un array) a las que se les aplicara la leyenda.

Para capas en las que las reglas de estilo sean complejas, por ejemplo en una capa que se representara por coropletas es recomendable definir solo una capa por leyenda, tanto por estilo, para que se vean mas separadas esas capas, y tanto para que el boton *apagar/prender todo* solo aplique a los  filtros de la esa capa

#### mostrar-boton-alterna-todo

- Type: `Boolean`
- Default: `false`

Indica si se desea poner el boton superior de *apagar/prender todo*. 

Cuando hay varias capas en la leyenda el boton apaga-prende todas las capas a la vez.

Cuando hay solo una capa en la leyenda y esa capa contiene reglas de estilo que clasifican los datos, por ejemplo una coropleta, el boton apaga-prende todos los filtros de esa capa.


#### tamanos-de-mapa

- Type: `Boolean`
- Default: `false`

Para leyendas simples, sin clasificacion por colores ni tamaños. Indica si las capas de tipo punto reflejaran exactamente el mismo tamaño que muestra en el mapa. 

Por default es `false`, es decir,  todas las capas de tipo punto reflejan en leyenda una figura de 25px de ancho por 25px de  alto.

#### mostrar-boton-info


- Type: `Boolean`
- Default: `false`

indica si se mostrara a el boton de info a los elementos de esta leyenda  (tener en cuenta que solo sirve para representaciones simples y wms)

#### contenido-info

- Type: `String []`
- Default: `undefined`

Los contenidos a mostrar en el boton info, los strings pueden ser cadenas en formato html. Solo se toma en cuenta si `:mostrar-boton-info="true"`.

#### lado-contenido-info
- type `String`
- default `derecho`
- valores posibles `derecho` | `izquierdo`

El lado en el que se desplegara la informacion definida en `contenido-info` . Solo se toma en cuenta si `:mostrar-boton-info="true"`.

#### coropletas-con-checkbox
- Type: `Boolean`
- Default: `false`


Indica si las leyendas de tipo coropleta se dibujaran con un checkbox. Por default es falso y las las coropletas son una serie de cuadrados con color sin el checkbox.

## dai-info-mapa

### propiedades
#### colapsado

- Type: `Boolean`
- Default: `true`

Estado inicial del componente, si se colapsa o no.