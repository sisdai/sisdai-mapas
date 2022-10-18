import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'

/**
 *
 */
export const crearGeojsonSourceDesdeObjetos = objetos => {
  if (typeof objetos !== 'object') {
    return new VectorSource({})
  }

  return new VectorSource({
    features: new GeoJSON().readFeatures({ ...objetos }),
  })
}

export const crearGeojsonSourceDesdeUrl = url => {
  return new VectorSource({
    url: url,
    format: new GeoJSON(),
  })
}
