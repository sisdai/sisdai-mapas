
/**
 * Invocar el mostrar/ocultar los tooltips dentro del mapa
 * @param {Map} map objeto mapa de Open Layers
 * @param {*} e evento
 * @param {}
 */
export const invoke_tooltips = (map, e, component) => {

    const hightlight_on_hover = (the_map, feature) => {
        if (feature !== the_map.get("hover_feature")) {
            if (the_map.get("hover_feature")) {
                the_map.get("hover_feature").set("_hightlight", false);
            }
            if (feature) {
                feature.set("_hightlight", true);
            }
            the_map.set("hover_feature", feature);
        }
    }

    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);

    let capas_con_tooltip = map.getLayers().getArray().filter(item => item.get("_tooltip") != undefined).map(item2 => item2.get("id"))

    let tooltip_overlay_nomov = map.getOverlayById("tooltip");
    let tooltip_overlay_mov = map.getOverlayById("tooltipmov");

    let salioTooltipVectorial = false;

    if (hit) {

        var f_l = map.forEachFeatureAtPixel(pixel, function (feature, layer) {

            if (layer.get("_tooltip") !== undefined || layer.get("VM_has_event_hover")) {
                return [feature, layer]
            }


        });
        var f_l_pRealce = map.forEachFeatureAtPixel(pixel, function (feature2, layer2) {

            if (layer2.get("_realce_hover")) {
                return [feature2, layer2]
            }
        });
        map.getTargetElement().style.cursor = 'pointer';
        if (f_l_pRealce) {
            var feature_pRealce = f_l_pRealce[0];
            feature_pRealce.set("_hightlight", true)
            hightlight_on_hover(map, feature_pRealce)
        }
        if (f_l) {
            var layer = f_l[1];
            var feature = f_l[0];


            if (layer.get("VM_has_event_hover")) {

                layer.set("VM_hovered_feature_style", layer.getStyle()(feature))
                layer.set("VM_hovered_feature_props", feature.getProperties())
                layer.dispatchEvent("hover_feature")
            }


            if (map.get("hover_feature") == feature && !layer.get("_tooltip_mov")) {
                return
            }

            if (capas_con_tooltip.includes(layer.get("id")) && layer.get("_tooltip") != undefined) {

                const contenido = layer.get("_tooltip")
                const tooltipMovible = layer.get("_tooltip_mov")
                const tooltipTop = layer.get("_tooltip_top")
                const geomType = feature.getGeometry().getType();
                const coordinates = feature.getGeometry().getCoordinates()
                renderTooltipElement(
                    e,
                    contenido,
                    feature.getProperties(),
                    tooltipMovible,
                    tooltipTop,
                    tooltip_overlay_mov, tooltip_overlay_nomov,
                    map.getView().calculateExtent(map.getSize()),
                    geomType,
                    coordinates
                )
                salioTooltipVectorial = true;
            } else {
                tooltip_overlay_nomov.setPosition(undefined)
                tooltip_overlay_mov.setPosition(undefined)

            }

        } else {



            tooltip_overlay_nomov.setPosition(undefined)
            tooltip_overlay_mov.setPosition(undefined)

        }
    } else {
        map.getTargetElement().style.cursor = '';
        tooltip_overlay_nomov.setPosition(undefined)
        tooltip_overlay_mov.setPosition(undefined)

        let feature_ya_guardada = map.get("hover_feature")
        if (feature_ya_guardada) {
            feature_ya_guardada.set("_hightlight", false)
        }

    }

    if(!salioTooltipVectorial){
        //verificar si debera salir un tooltip de un grid
        const allGridsParams = Object.entries( component.VM_grids)
            .filter(function([key,value]){
                return value.$props.contenidoTooltip !== "none"
            })
            .map(function([key,value]){
                return {id : key,zIndex: value.$props.zIndex, grid: value.VM_grid}
            })
            .sort(function(a,b){
                return b.zIndex - a.zIndex;
            })

        //revisar entre un grid, si no hay nada en el que sigue, y asi hasta agotar los grids
        //console.log(allGridsParams)

        const positions = [parseInt(e.pixel[0] / 4), parseInt(e.pixel[1] / 4)]

        const gridParam = allGridsParams.find(function(gridParam){
            const currentGrid = gridParam.grid
            let code = currentGrid.grid[positions[1]].charCodeAt(positions[0])
            code = obtenerCodigoCaracterParaUtfGrid(code)
            return code > 0
        })
        
        if (gridParam){
            const currentGrid = gridParam.grid
            let code = currentGrid.grid[positions[1]].charCodeAt(positions[0])
            code = obtenerCodigoCaracterParaUtfGrid(code)

            let data = undefined;
            if (code in currentGrid.keys) {
                const id = currentGrid.keys[code];
                if (currentGrid.data && id in currentGrid.data) {
                  data = currentGrid.data[id];
                } else {
                  data = id;
                }
            }
            if(typeof data === "object"){
                //console.log(gridParam.id,data)
                const contenido = component.VM_grids[gridParam.id].$props.contenidoTooltip
                const tooltipMovible = true
                const tooltipTop = "0"
                const geomType = "";
                const coordinates = []
                renderTooltipElement(
                    e,
                    contenido,
                    data,
                    tooltipMovible,
                    tooltipTop,
                    tooltip_overlay_mov, tooltip_overlay_nomov,
                    map.getView().calculateExtent(map.getSize()),
                    geomType,
                    coordinates,
                    
                )
                map.getTargetElement().style.cursor = 'pointer';

            }
            
        }

    }

}

const obtenerCodigoCaracterParaUtfGrid=function(code){
    //hay caracteres que hay que escapar y aparte debemos empezar en 32
    let code2 = code
    if (code2 >= 93) {
      code2--;
    }
    if (code2 >= 35) {
      code2--;
    }
    code2 -= 32;
  
    return code2
  }


//hacer aparte la funcion que pone "el div de tooltip en el mapa", pa reusarla

/**
 * Renderiza el elemento html que hace de tooltip
 * @param {*} e 
 * @param {*} contenidoTooltip 
 * @param {*} featureProperties 
 * @param {*} tooltipMovible 
 * @param {*} tooltip_overlay_mov 
 * @param {*} tooltip_overlay_nomov 
 * @param {*} extent 
 * @param {*} geomType 
 * @param {*} coordinates 
 */
const renderTooltipElement = function (
    e,
    contenidoTooltip, featureProperties, tooltipMovible, tooltipTop,
    tooltip_overlay_mov, tooltip_overlay_nomov,
    extent,
    geomType, coordinates
) {
    let contenido = contenidoTooltip
    if (typeof contenido == "function") {
        contenido = contenido(featureProperties)
    }
    let tooltip_overlay = tooltipMovible ? tooltip_overlay_mov : tooltip_overlay_nomov
    if (tooltipMovible) {
        tooltip_overlay_nomov.setPosition(undefined)
    } else {
        tooltip_overlay_mov.setPosition(undefined)
        tooltip_overlay_nomov.getElement().style.top = `${tooltipTop}px`
    }



    let ext = extent;
    let x3 = (ext[0] + ext[2]) / 2;
    let y3 = (ext[1] + ext[3]) / 2;
    if (geomType === "Point" && coordinates !== undefined) {
        tooltip_overlay.setPosition(coordinates)
    } else {
        tooltip_overlay.setPosition([e.coordinate[0], e.coordinate[1]])
    }

    if (tooltipMovible) {
        if (e.coordinate[0] > x3) {
            tooltip_overlay.getElement().classList.remove("ol-tooltipmov-right");
            tooltip_overlay.getElement().classList.add("ol-tooltipmov-left");
        } else {
            tooltip_overlay.getElement().classList.remove("ol-tooltipmov-left");
            tooltip_overlay.getElement().classList.add("ol-tooltipmov-right");
        }
        if (e.coordinate[1] > y3) {
            tooltip_overlay.getElement().classList.remove("ol-tooltipmov-top");
            tooltip_overlay.getElement().classList.add("ol-tooltipmov-bottom");
        } else {
            tooltip_overlay.getElement().classList.remove("ol-tooltipmov-bottom");
            tooltip_overlay.getElement().classList.add("ol-tooltipmov-top");
        }
    } else {
        if (e.coordinate[0] > x3) {
            tooltip_overlay.getElement().classList.remove("ol-tooltip-right");
            tooltip_overlay.getElement().classList.add("ol-tooltip-left");
        } else {
            tooltip_overlay.getElement().classList.remove("ol-tooltip-left");
            tooltip_overlay.getElement().classList.add("ol-tooltip-right");
        }
    }


    tooltip_overlay.getElement().querySelector(".content").innerHTML = contenido
}