# Puntos desplazados

## Básico

<puntos-desplazados-1-basico />

```html
<DaiMapa>
    <DaiCapaXyz />
    <DaiCapaGeojson
        id="sin-cluster"
        titulo="Capa sin cluster"
        :url="$withBase('/centroides-estados.geojson')"
        :estilo-capa="{
          circle: {
            fill: { color: 'white' },
            stroke: { color: 'black', width: 1 },
            radius: 4,
          },
        }"
    />
    <DaiCapaGeojsonPuntosDesplazados
        id="desplazamiento-basico"
        titulo="Desplazamiento básico"
        :url="$withBase('/centroides-estados.geojson')"
        :distancia="80"
        :radioPuntoCentro="4"
        :radioPuntosDesplazados="4"
        :estilo-capa="{
          circle: {
            fill: { color: 'red' },
            stroke: { color: 'black', width: 1 },
            radius: 4,
          },
        }"
        tipoGeometria="Point"
    />
</DaiMapa>
```

## Metodos de desplazamiento

<puntos-desplazados-2-metodos />

```html
<template>
    <DaiTarjetaContenedorMapa :colapsada="false">
        <template #header>
            <p>Metodo de desplazamiento</p>
            <dai-selector-mapa v-model="metodoSeleccionado">
                <option
                    v-for="metodo in metodosDesplazamiento"
                    :value="metodo"
                    :key="metodo"
                >
                    {{ metodo }}
                </option>
            </dai-selector-mapa>
        </template>
        <DaiMapa>
            <DaiCapaXyz />

            <DaiCapaGeojsonPuntosDesplazados
                id="desplazamiento-basico"
                titulo="Desplazamiento básico"
                :url="$withBase('/centroides-estados.geojson')"
                :distancia="80"
                :metodoDesplazamiento="metodoSeleccionado"
                :radioPuntoCentro="4"
                :radioPuntosDesplazados="4"
                tipoGeometria="Point"
            />
        </DaiMapa>
    </DaiTarjetaContenedorMapa>
</template>
```

## Estilos
