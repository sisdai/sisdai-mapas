import * as d3 from "d3"
import ss from "./_cortes_naturales.js"
/**
 *  obtiene los cortes para la leyenda y la funcion de estilo de openlayers
 * @param {*} data 
 * @param {*} classType 
 * @param {*} clases 
 */
const dataClassification = (data,classType,clases,colors,sizes,targetProperty,
    geomType,defaultShapeType="circle",acomodoCategorias=[], clasificacion_custom=[],
    clasesVisiblesInicial=[],clasesEtiquetasLimitesDecimales=0)=>{
    let valores_clases = []
    //aqui ir agregando las demas clasificaciones
    valores_clases = classType==="categorias" ? qualitativeClassification(data) : valores_clases;
    valores_clases = classType==="cuantiles" ? quantileClassification(data,clases) : valores_clases;
    valores_clases = classType==="linear" ? linearClassification(data,clases) : valores_clases;
    valores_clases = classType==="exponencial" ? powClassification(data,clases) : valores_clases;
    valores_clases = classType==="logarimica" ? logClassification(data,clases) : valores_clases;

    valores_clases = classType==="cortes-naturales" ? naturalBreaksClassificaction(data,clases) : valores_clases;
    valores_clases = classType==="personalizada" ? clasificacion_custom : valores_clases;
    //console.log(valores_clases)

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
    let labels = classType === "categorias" 
        ? valores_clases.map(item=>item) 
        : valores_clases.map((numeric_item,i,originalArray)=>{
            //dar formato a los labels si son numericas, 
            //si son iguales, no deberia haber el a
            if(numeric_item[0] === numeric_item[1]){
                return numeric_item[0].toLocaleString("en")
            }
            // si es el primero que inicia los rangos
            // o si esta despues de un valor que no es un rango
            // no deberia sumar uno a la clase inicial
            let sumar1unidad = i > 0;
            if(originalArray[i-1] ){
                if(originalArray[i-1][0] === originalArray[i-1][1]){
                    sumar1unidad = false;
                }
            }
            
            
            const numero_to_inicial = sumar1unidad 
                ? LABEL_numeroendecimalmas1unidad(numeric_item[0],clasesEtiquetasLimitesDecimales)
                : LABEL_numeroendecimal(numeric_item[0],clasesEtiquetasLimitesDecimales)
            const numero_to_final = LABEL_numeroendecimal(numeric_item[1],clasesEtiquetasLimitesDecimales)
            
            
            let label = `${numero_to_inicial.toLocaleString("en")} a ${numero_to_final.toLocaleString("en")}`
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
    
        
    
    

    return {type:tipo,args:{defaultShapeType,clasesVisiblesInicial},cortes:cortes}
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

const linearClassification = (data,noClases)=>{
    //let espacios = Array.from(Array(noClases).keys())
    let espacios = noClases
    let minMax = d3.extent(data)
    let linear_fn = d3.scaleLinear().domain(minMax).range([0,espacios])

    let limits = []
    for(let i=0;i< espacios  ;i++){
        limits.push([ linear_fn.invert(i), linear_fn.invert(i+1) ])
    }
    //console.log(limits)
    return limits

}

const powClassification = (data,noClases)=>{
    let espacios = Array.from(Array(noClases).keys())
    let minMax = d3.extent(data)
    let quantile_fn = d3.scalePow().exponent(.5).domain(minMax).range(espacios)

    return espacios.map((item)=>{
        let limits = quantile_fn.invertExtent(item);
        return limits
    })

}

const logClassification = (data,noClases)=>{
    let espacios = Array.from(Array(noClases).keys())
    let minMax = d3.extent(data)
    let quantile_fn = d3.scaleLog().domain(minMax).range(espacios)

    return espacios.map((item)=>{
        let limits = quantile_fn.invertExtent(item);
        return limits
    })

}

const naturalBreaksClassificaction = (data,noClases)=>{
    //console.log(data)
    const clases = ss.jenks(data,noClases)
    let clases_to_d3= [...clases]
    clases_to_d3.shift()

    //const scale_fn = d3.scaleThreshold().domain(clases_to_d3).range([0,noClases])
    //console.log(clases_to_d3)

    let cortes = clases.map((item,i)=>{
        let corte_inferior = item //(i==0) ? Math.round(item): Math.round(item)+ 1
        return [corte_inferior,Math.round(clases[i+1])]
    })
    cortes.pop()
    //console.log(cortes)
    return cortes

    
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


function LABEL_numeroendecimalmas1unidad(numero,decimales){
    const log1 = 10**decimales;
  
    return Math.floor((numero *log1)+1) / log1
}
function LABEL_numeroendecimal(numero,decimales){
    const log1 = 10**decimales;
  
    return Math.floor((numero *log1)) / log1
}



export {dataClassification, }