import * as d3 from "d3"
/**
 *  obtiene los cortes para la leyenda y la funcion de estilo de openlayers
 * @param {*} data 
 * @param {*} classType 
 * @param {*} clases 
 */
const dataClassification = (data,classType,clases,colors,sizes,targetProperty,
    geomType,defaultShapeType="circle",acomodoCategorias=[])=>{
    let valores_clases = []
    //aqui ir agregando las demas clasificaciones
    valores_clases = classType==="categorias" ? qualitativeClassification(data) : valores_clases;
    valores_clases = classType==="cuantiles" ? quantileClassification(data,clases) : valores_clases;
    

    if(classType==="categorias" && acomodoCategorias.length>1){
        valores_clases = [...valores_clases].sort((a,b)=>{
            return acomodoCategorias.indexOf(a) - acomodoCategorias.indexOf(b)
        })
        //console.log(valores_clases)
    }

    let valueRamp = []
    if (targetProperty=="relleno"){
        valueRamp = getParsedColorRamp(colors,valores_clases.length)
    }else{
        valueRamp = sizes;
    }
    let labels = classType === "categorias" ? valores_clases.map(item=>item) 
        : valores_clases.map((numeric_item,i)=>{
            let label = `${Math.floor((numeric_item[0]===0||i===0)?numeric_item[0]:numeric_item[0]+1)
            .toLocaleString("en")} a ${Math.floor(numeric_item[1]).toLocaleString("en")}`
            return label
        })
    let cortes = valores_clases.map( (item,i)=>{

        return {d: labels[i], val:item, v:valueRamp[i]}
    })
        
    let tipo = "list-checks-values"; //lista de valores para activar desactivar
    if(targetProperty ==="relleno"){
        if(geomType ==="Polygon" || geomType ==="MultiPolygon"){
            tipo = "coropleta"
        }else{
            tipo = "list-checks-colors"
        }
    }else{
        //la propiedad es size
        if(geomType ==="Point" || geomType ==="MultiPoint"){
            tipo = "shapes-sizes-values"
        }

    }
    
        
    
    

    return {type:tipo,args:{defaultShapeType},cortes:cortes}
}

const qualitativeClassification = (data)=>{
    let unicos = [...new Set(data)]
    return unicos
}

const quantileClassification = (data,noClases)=>{
    let espacios = Array.from(Array(noClases).keys())
    let quantile_fn = d3.scaleQuantile().domain(data).range(espacios)

    return espacios.map((item)=>{
        let limits = quantile_fn.invertExtent(item);
        return limits
    })

}


const getParsedColorRamp = (colors, steps)=>{

    if (typeof colors === 'string'){
        //es una rampa ya establecida
        let d3ramp = d3[`scheme${colors}`]
        //console.log(d3ramp,colors)
        let colores=[]
        if(d3ramp){
            if(Array.isArray(d3ramp[3])){
                if(Array.isArray(d3ramp[steps])){
                    colores =d3ramp[steps]
                }else {
                    //regresar una interpolacion
                    for(let i =0; i<steps;++i){
                        colores.push(d3.rgb(d3["interpolate"+colors](i / (steps - 1))  ).formatHex() )
                    }
                }
            }else{
                //retornar la paleta completa
                colores = d3ramp;
            }
        }else{
            colores = []
        }
        
        return colores
    }

    //se asume que es un array, pero si solo tiene 2 colores y steps es mas grande
    //debe hacerce una rampa de color a color con los steps solicitados
    if(colors.length == 2 && steps.length>2){
        return []
    }

    return colors
}

export {dataClassification}