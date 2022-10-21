# Pruebas básicas de sisdai-mapas

<prueba />

```html
<DaiMapa tema="algun-tema" :extension="mapa.extension">
  <EncabezadoMapa>
    Contenido HTML, Titulos, Controles, uso de leyenda, etc
  </EncabezadoMapa>

  <IzquierdaMapa>
    Contenido HTML, Controles, uso de leyenda, scrolables, etc
  </IzquierdaMapa>

  <Capas>
    <DaiCapaGeojson :datos="geojson.edos" :zIndex="geojson.zIndex" />

    <DaiCapaXyzOsm :zIndex="osm.zIndex" />
  </Capas>

  <DerechaMapa>
    Contenido HTML, Controles, uso de leyenda, scrolables, etc
  </DerechaMapa>

  <PieMapa>
    Contenido HTML, Referencias, Controles, uso de leyenda, etc
  </PieMapa>
</DaiMapa>
```

- <small>vuepress, lint config: 32 vulnerabilities (10 moderate, 22 high)</small>
