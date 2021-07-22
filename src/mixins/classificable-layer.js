import * as d3 from "d3"
import { dataClassification } from "./_clasificacion_datos";

import {fixSerializedStyleIfIncomplete,joinDefaultValuesWithNewValuesInPoints} from "./_json2olstyle"

import { DEFAULT_FILL_COLOR,DEFAULT_STROKE_COLOR } from "./vector-layer-any";

const defaultsValuesRule = {
    clasificacion:"categorias", //linear, quantile, log , custom
    clases: 5,
    columna: '',
    colores: "Blues", //lo que se pueda poner como prefijo para d3 o un array de colores
    proporciones: [],
    propiedadObjetivo: 'relleno', // o proporcion , solo esas dos
    forma: "default", // solo se ocupa si es geometria punto, tambien puede ser un url a un svg, si es svg el color no le aplicaria,
    tituloVariable: "__columnname__",
    acomodoCategorias:[]
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
           
           VM_default_shape:"circle",
           VM_persistentFill:{},
           VM_persistentStroke:{}
        }
    },
    created:function(){
        
        if(this.reglasEstiloCapa != undefined){
            
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
            
            //darle estilo segun cada una de las reglas
            let features = this.olLayer.getSource().getFeatures();
            //console.log(features)
            this.VM_geometryType = features[0].getGeometry().getType()

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
                    this.VM_geometryType,this.VM_default_shape,rule.acomodoCategorias)
                
                cortes.args["column"] = rule.columna;
                cortes.args["variableTitle"] = rule.tituloVariable ==="__columnname__" ? rule.columna : rule.tituloVariable;
                this.VM_rules_cortes.push(cortes)
            })

            

            //agregar la informacion para la leyenda
            this._set_legend_info()

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
            
            let originalMapStyleFromParams = {...this.VM_mapStyle}
             let style = (feature)=>{
                 let geomType = feature.getGeometry().getType()
                 let default_style = {style:{
                     fill:{
                         color:DEFAULT_FILL_COLOR
                     },
                     stroke:{
                        width:1,
                        color :DEFAULT_STROKE_COLOR 
                     }
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
                    radius: 7
                }
                let estilos_normales_desde_parametros={...originalMapStyleFromParams}
                
                estilos_normales_desde_parametros = fixSerializedStyleIfIncomplete(estilos_normales_desde_parametros)
                
                joinDefaultValuesWithNewValuesInPoints(default_style,estilos_normales_desde_parametros,this.VM_default_shape)
                Object.assign(default_style.style,estilos_normales_desde_parametros.style)
                
                this.VM_rules.forEach((rule,i)=>{
                    let rule_cortes = this.VM_rules_cortes[i]
                    rule_cortes.cortes.forEach((corte,h)=>{
                        let value = corte.val
                        if(Array.isArray(value)){
                            let min_value = h==0?value[0]-1 : value[0];
                            if(feature.getProperties()[rule.columna] > min_value 
                                && feature.getProperties()[rule.columna]<= value[1]){
                                    if(rule.propiedadObjetivo=="relleno"){
                                        if(geomType.includes("Polygon") ) { default_style.style["fill"]["color"] = corte.v  }
                                        if(geomType.includes("Point") ) { default_style.style[this.VM_default_shape]["fill"]["color"] = corte.v  }
                                        if(geomType.includes("LineString") ) { default_style.style["stroke"]["color"] = corte.v  }

                                    }else{
                                        //es un size
                                        if(geomType.includes("Point") ) { default_style.style[this.VM_default_shape]["radius"] = corte.v  }
                                        if(geomType.includes("LineString") ) { default_style.style["stroke"]["width"] = corte.v  }
                                    }
                                
                            }

                        }else{
                            if(feature.getProperties()[rule.columna] == value){
                                if(rule.propiedadObjetivo=="relleno"){
                                    if(geomType.includes("Polygon") ) { default_style.style["fill"]["color"] = corte.v  }
                                    if(geomType.includes("Point") ) { default_style.style[this.VM_default_shape]["fill"]["color"] = corte.v  }
                                    if(geomType.includes("LineString") ) { default_style.style["stroke"]["color"] = corte.v  }

                                }else{
                                    //es un size
                                    if(geomType.includes("Point") ) { default_style.style[this.VM_default_shape]["radius"] = corte.v  }
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
            }else{
                let nombre_tipo =this.VM_rules_cortes.map(rule_corte=>rule_corte.type).sort().join("-")
                type = `legend-${nombre_tipo}`
                content = {
                    cortes : this.VM_rules_cortes,
                }
            }
            content["title"] = this.VM_title;
            

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