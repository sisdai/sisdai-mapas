import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

export const createGeojsonSourceFromObjectJs = JsObject => {
    if (typeof JsObject != "object") {
        return new VectorSource({});
    }

    return new VectorSource({
        features: new GeoJSON().readFeatures({ ...JsObject })
    });
};

export const createGeojsonSourceFromUrl = url => {
    return new VectorSource({
        url: url,
        format: new GeoJSON()
    });
};