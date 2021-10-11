import * as d3 from "d3"
import { dataClassification } from "./_clasificacion_datos";
import  prepararTexturesfromCortes from "./_prepareClassificableTextures"

import {fixSerializedStyleIfIncomplete,joinDefaultValuesWithNewValuesInPoints} from "./_json2olstyle"

import { DEFAULT_FILL_COLOR,DEFAULT_STROKE_COLOR } from "./vector-layer-any";

const defaultsValuesRule = {
    clasificacion:"categorias", //linear, cuantiles, personalizada
    clases: 5,
    columna: '',
    colores: "Blues", //lo que se pueda poner como prefijo para d3 o un array de colores
    proporciones: [],
    propiedadObjetivo: 'relleno', // o proporcion , solo esas dos
    forma: "default", // solo se ocupa si es geometria punto, tambien puede ser un url a un svg, si es svg el color no le aplicaria,
    tituloVariable: "__columnname__",
    acomodoCategorias:[],
    clasificacionPersonalizada: [],
    clasesVisiblesInicial:[],
    clasesEtiquetasLimitesDecimales:0,  // no muestra ningun decimal para las etiquetas
};

export default{
    props:{
        
        reglasEstiloCapa:{
            type:[Object,Array],
            default:function (){
                return undefined;
            }
        }

    },
    data:function(){
        return {
           VM_is_classified:false,
            
           VM_rules:[],
           VM_rules_cortes:[],
           VM_rules_textures:[],
           
           VM_default_shape:"circle",
           VM_persistentFill:{},
           VM_persistentStroke:{}
        }
    },
    created:function(){
        
        if(this.reglasEstiloCapa != undefined){
            //console.log("DEBUG: carga reglas estilo")    
            this.VM_is_classified = true;
            if(Array.isArray(this.reglasEstiloCapa)){
                this.VM_rules = this.reglasEstiloCapa.map(rule=>{
                    let defaults = {...defaultsValuesRule}
                    let obj=Object.assign(defaults,rule) 
                    //console.log(this.id,obj)
                    return {...obj}
                });
            }else{
                let defaults = {...defaultsValuesRule}
                this.VM_rules = [ Object.assign(defaults,this.reglasEstiloCapa)]
            }
        }

        
    },
    mounted:function(){
        

        
    
    },
    methods:{
        _clasificar:function(){
            let features = this.olLayer.getSource().getFeatures();
            let todos_valores = features.map((f=>f.getProperties()[this.VM_r_column]))
            //console.log(features)

            let quantile0 = d3.scaleQuantile()
            .domain(todos_valores)
            .range(this.VM_r_colors);

            this.VM_r_cortes= this.VM_r_colors.map((color, i) => {
                let limits = quantile0.invertExtent(color);
                let label = `${Math.floor((limits[0]===0||i===0)?limits[0]:limits[0]+1)
                    .toLocaleString("en")} a ${Math.floor(limits[1]).toLocaleString("en")}`
                return { d: label, val: limits, c: color };
            })

            //console.log("Ahora si a poner el estilo, segun la coropleta")

            //agregando informacion para la leyenda
            this.VM_legend_info = {
                type: "legend-coropleta",
                content:{
                    cortes: this.VM_r_cortes,
                    title:this.VM_title
                }
            }
            this.VM_legend_info_status = "ready"
            this.$emit("legend_info_ready",this.VM_legend_info)
        },
        _clasificar_v2:function(){

            this.VM_rules_cortes = [];
            this.VM_rules_textures= [];
            //darle estilo segun cada una de las reglas
            let features = this.olLayer.getSource().getFeatures();
            //console.log(this.VM_geometryType,"el tipo de geometria")
            this.VM_geometryType = features.length>0 ? features[0].getGeometry().getType() : ''

            this.VM_default_shape = this.VM_rules.map(rule=>rule.forma).some(element=>element!="default") 
                ? this.VM_rules.map(rule2=>rule2.forma).filter(element2=>element2!="default")[0] :"circle"

            this.VM_rules.forEach(rule=>{
                
                let todos_valores = features.map(
                    (f=>(rule.clasificacion==="categorias" || rule.clasificacion==="personalizada" ) 
                        ? f.getProperties()[rule.columna] 
                        : parseFloat( f.getProperties()[rule.columna])  ) 
                )

                let cortes =  dataClassification(todos_valores,rule.clasificacion, 
                    rule.clases,rule.colores,rule.proporciones,rule.propiedadObjetivo,
                    this.VM_geometryType,this.VM_default_shape,rule.acomodoCategorias,
                    rule.clasificacionPersonalizada,rule.clasesVisiblesInicial,rule.clasesEtiquetasLimitesDecimales)

                let rule_textures = []
                if(rule.propiedadObjetivo==='relleno'){
                    rule_textures = prepararTexturesfromCortes(cortes,rule,this.estiloTexturaRelleno)
                }
                this.VM_rules_textures.push(rule_textures)
                
                cortes.args["column"] = rule.columna;
                cortes.args["variableTitle"] = rule.tituloVariable ==="__columnname__" ? rule.columna : rule.tituloVariable;
                cortes.args["textures"] = rule_textures;
                this.VM_rules_cortes.push(cortes)
            })
            
            //console.log(this.VM_rules_cortes,"HERERRR")

            //agregar la informacion para la leyenda
            this._set_legend_info()
            //console.log("ya esta la nueva clasificacion")

        },
        _set_style_class:function(){
            let style= (feature)=>{
                let color= "black"
                this.VM_r_cortes.forEach((item,i)=>{
                    let min_value = i==0?item.val[0]-1 : item.val[0];
                    if(feature.getProperties()[this.VM_r_column] > min_value && feature.getProperties()[this.VM_r_column]<= item.val[1]){
                        color= item.c                        
                    }
                })
                return {
                    fill:{
                        color:color
                    },
                    stroke:{
                        width:1,
                        color:"white" // "scale["color"]"
                    }
                }
            }
            this.VM_mapStyle = style;
            //this.$emit("update:mapStyle",style)
        },
        _set_style_class_v2:function(){
            
            let originalMapStyleFromParams = {...this.estiloCapa}
            
             let style = (feature)=>{
                 let geomType = feature.getGeometry().getType()
                 let default_style = {style:{
                     fill:{
                         color:DEFAULT_FILL_COLOR
                     },
                     stroke:{
                        width:1,
                        color :DEFAULT_STROKE_COLOR 
                     },
                     fillPattern:JSON.parse(JSON.stringify(this.estiloTexturaRelleno))
                 }
                }
                 default_style.style[this.VM_default_shape] = {
                    fill: {
                        color: DEFAULT_FILL_COLOR
                    },
                    stroke: {
                        color: DEFAULT_STROKE_COLOR,
                        width: 1
                    },
                    radius: 7,
                    fillPattern:JSON.parse(JSON.stringify(this.estiloTexturaRelleno))
                }
                let estilos_normales_desde_parametros={...originalMapStyleFromParams}
                
                estilos_normales_desde_parametros = fixSerializedStyleIfIncomplete(estilos_normales_desde_parametros)
                
                joinDefaultValuesWithNewValuesInPoints(default_style,estilos_normales_desde_parametros,this.VM_default_shape)
                if(this.VM_default_shape in estilos_normales_desde_parametros.style){
                    Object.assign(default_style.style[this.VM_default_shape],estilos_normales_desde_parametros.style[this.VM_default_shape])
                    estilos_normales_desde_parametros.style[this.VM_default_shape] = JSON.parse(JSON.stringify(default_style.style[this.VM_default_shape]))
                }
                
                Object.assign(default_style.style,estilos_normales_desde_parametros.style)
                
                //console.log(estilos_normales_desde_parametros,default_style,this.VM_id)

                this.VM_rules.forEach((rule,i)=>{
                    let rule_cortes = this.VM_rules_cortes[i]
                    
                    const rule_textures = this.VM_rules_textures[i]
                    rule_cortes.cortes.forEach((corte,h,originalArray)=>{
                        let value = corte.val
                        if(Array.isArray(value)){
                            //INICIO DE COMPARACION DE CLASIFICACIONES NUMERICAS
                            let quitar1unidad = h === 0 ? (value[0] === value[1] ? false: true): false ;
                            if(originalArray[h-1] ){
                                if(originalArray[h-1].val[0] === originalArray[h-1].val[1]){
                                    quitar1unidad = true
                                }
                            }
                            let min_value = quitar1unidad ? value[0]-1 : value[0];
                            
                            if(feature.getProperties()[rule.columna] > min_value 
                                && feature.getProperties()[rule.columna]<= value[1]){
                                    

                                    if(rule.propiedadObjetivo=="relleno"){
                                        if(geomType.includes("Polygon") ) { 
                                            default_style.style["fill"]["color"] = corte.v  
                                            default_style.style["fillPattern"] = rule_textures[h]
                                        }
                                        if(geomType.includes("Point") ) { 
                                            //console.log(default_style.style[this.VM_default_shape])
                                            default_style.style[this.VM_default_shape]["fill"]["color"] = corte.v  
                                            default_style.style[this.VM_default_shape]["fillPattern"] = rule_textures[h]
                                        }
                                        if(geomType.includes("LineString") ) { default_style.style["stroke"]["color"] = corte.v  }

                                    }else{
                                        //es un size
                                        if(geomType.includes("Point") ) { 
                                            default_style.style[this.VM_default_shape]["radius"] = corte.v 
                                            default_style.style["zIndex"] = originalArray.length - h;
                                        }
                                        if(geomType.includes("LineString") ) { default_style.style["stroke"]["width"] = corte.v  }
                                    }
                                
                            }

                            if(value[0] === value[1] && feature.getProperties()[rule.columna]=== value[0]){
                                if(rule.propiedadObjetivo=="relleno"){
                                    if(geomType.includes("Polygon") ) { 
                                        default_style.style["fill"]["color"] = corte.v  
                                        default_style.style["fillPattern"] = rule_textures[h]
                                    }
                                    if(geomType.includes("Point") ) { 
                                        
                                        default_style.style[this.VM_default_shape]["fill"]["color"] = corte.v  
                                        default_style.style[this.VM_default_shape]["fillPattern"] = rule_textures[h]
                                    }
                                    if(geomType.includes("LineString") ) { default_style.style["stroke"]["color"] = corte.v  }

                                }else{
                                    //es un size
                                    if(geomType.includes("Point") ) { 
                                        default_style.style[this.VM_default_shape]["radius"] = corte.v  
                                        default_style.style["zIndex"] = originalArray.length - h;
                                    }
                                    if(geomType.includes("LineString") ) { default_style.style["stroke"]["width"] = corte.v  }
                                }
                            }
                            //FIN DE COMPARACION DE CLASIFICACIONES NUMERICAS
                        }else{
                            if(feature.getProperties()[rule.columna] == value){
                                if(rule.propiedadObjetivo=="relleno"){
                                    if(geomType.includes("Polygon") ) { 
                                        default_style.style["fill"]["color"] = corte.v  
                                        default_style.style["fillPattern"] = rule_textures[h]
                                    }
                                    if(geomType.includes("Point") ) { 
                                        default_style.style[this.VM_default_shape]["fill"]["color"] = corte.v  
                                        default_style.style[this.VM_default_shape]["fillPattern"] = rule_textures[h]
                                    }
                                    if(geomType.includes("LineString") ) { default_style.style["stroke"]["color"] = corte.v  }

                                }else{
                                    //es un size
                                    if(geomType.includes("Point") ) { 
                                        default_style.style[this.VM_default_shape]["radius"] = corte.v  
                                        default_style.style["zIndex"] = originalArray.length - h;
                                    }
                                    if(geomType.includes("LineString") ) { default_style.style["stroke"]["width"] = corte.v  }
                                }
                            }
                        }
                    })

                })

                return default_style
             }
             this.VM_mapStyle = style;
        },
        _set_legend_info:function(){
            this._check_persistent_color()
            let type = ""
            let content = undefined
            if(this.VM_rules.length==1){
                let cortes = this.VM_rules_cortes[0]
                type = `legend-${cortes.type}`
                content = {
                    cortes : cortes,
                }
                content["cortes"]["args"]["persistentFill"] = this.VM_persistentFill
                content["cortes"]["args"]["persistentStroke"] = this.VM_persistentStroke
                content["cortes"]["args"]["persistentTexture"] = {...this.estiloTexturaRelleno}
            }else{
                let nombre_tipo =this.VM_rules_cortes.map(rule_corte=>rule_corte.type).sort().join("-")
                type = `legend-${nombre_tipo}`
                content = {
                    cortes : this.VM_rules_cortes,
                }
            }
            content["title"] = this.VM_title;
            
            //console.log(type,"HERE --lll")
            this.VM_legend_info = {type,content}
            this.VM_legend_info_status = "ready"
            this.$emit("legend_info_ready",this.VM_legend_info)
        },
        _check_persistent_color:function(){
            if(this.VM_rules.length == 1  && typeof this.estiloCapa !="function"){
                let style = fixSerializedStyleIfIncomplete(this.estiloCapa)
                if(this.VM_geometryType==="Point" || this.VM_geometryType==="MultiPoint"){
                    this.VM_persistentFill= style.style?.[this.VM_default_shape]?.fill || {color:'gray'};
                    this.VM_persistentStroke= style.style?.[this.VM_default_shape]?.stroke || {color:'white',width:1};
                    return
                }

                if(this.VM_geometryType==="Polygon" || this.VM_geometryType==="MultiPolygon"){
                    this.VM_persistentFill= style.style?.fill || {color:DEFAULT_FILL_COLOR};
                    this.VM_persistentStroke= style.style?.stroke || {color:DEFAULT_STROKE_COLOR,width:1};
                    return
                }
                
            }
        }
    }
}