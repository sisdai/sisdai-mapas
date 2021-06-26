import * as d3 from "d3"
import { dataClassification } from "./_clasificacion_datos";

import { DEFAULT_FILL_COLOR,DEFAULT_STROKE_COLOR } from "./vector-layer-any";

const defaultsValuesRule = {
    classification:"qualitative", //linear, quantile, log , custom
    classes: 5,
    column: '',
    colors: "Blues", //lo que se pueda poner como prefijo para d3 o un array de colores
    sizes: [],
    targetProperty: 'fill', // o size , solo esas dos
    shape: "default" // solo se ocupa si es geometria punto, tambien puede ser un url a un svg, si es svg el color no le aplicaria
};

export default{
    props:{
        render_type:{
            type:String,
            default:"choropleth"
        },
        renderClassification:{
            type:String,
            default:""
        },
        renderColors:{
            type:Array,
            default:function(){
                return ["black","gray","lightgray"]
            }
        },
        renderLabels:{
            type:Array,
            default:function(){
                return []
            }
        },
        renderColumn:{
            type:String,
            default:""
        },
        mapStyleRule:{
            type:[Object,Array],
            default:function (){
                return undefined;
            }
        }

    },
    data:function(){
        return {
            VM_is_classified:false,
            /** 
            VM_r_class:"",
            VM_r_colors:[],
            VM_r_labels:[],
            VM_r_column:"",
            VM_r_cortes : []
            */
           VM_rules:[],
           VM_rules_cortes:[],
           VM_geometryType:"",
           VM_default_shape:"cricle"
        }
    },
    created:function(){
        
        if(this.mapStyleRule!= undefined){
            
            this.VM_is_classified = true;
            if(Array.isArray(this.mapStyleRule)){
                this.VM_rules = this.mapStyleRule.map(item=>Object.assign(defaultsValuesRule,item));
            }else{
                this.VM_rules = [ Object.assign(defaultsValuesRule,this.mapStyleRule)]
            }
        }

        /** 
        this.VM_r_class = this.renderClassification
        this.VM_r_colors = this.renderColors
        this.VM_r_column = this.renderColumn
        */
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
            this.VM_geometryType = features[0].getGeometry().getType()
            this.VM_rules.forEach(rule=>{
                
                let todos_valores = features.map((f=>f.getProperties()[rule.column]))
                let cortes =  dataClassification(todos_valores,rule.classification, 
                    rule.classes,rule.colors,rule.sizes,rule.targetProperty,features[0].getGeometry().getType())
                    cortes.args["column"] = rule.column;
                this.VM_rules_cortes.push(cortes)
            })

            this.VM_default_shape = this.VM_rules.map(rule=>rule.shape).some(element=>element!="default") 
                ? this.VM_rules.map(rule2=>rule2.shape).filter(element2=>element2!="default")[0] :"circle"

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
             let style = (feature)=>{
                 let geomType = feature.getGeometry().getType()
                 let default_style = {
                     fill:{
                         color:DEFAULT_FILL_COLOR
                     },
                     stroke:{
                        width:1,
                        color :DEFAULT_STROKE_COLOR 
                     }
                 }
                 default_style[this.VM_default_shape] = {
                    fill: {
                        color: DEFAULT_FILL_COLOR
                    },
                    stroke: {
                        color: DEFAULT_STROKE_COLOR,
                        width: 1
                    },
                    radius: 7
                }
                this.VM_rules.forEach((rule,i)=>{
                    let rule_cortes = this.VM_rules_cortes[i]
                    rule_cortes.cortes.forEach((corte,h)=>{
                        let value = corte.val
                        if(Array.isArray(value)){
                            let min_value = h==0?value[0]-1 : value[0];
                            if(feature.getProperties()[rule.column] > min_value 
                                && feature.getProperties()[rule.column]<= value[1]){
                                    if(rule.targetProperty=="fill"){
                                        if(geomType.includes("Polygon") ) { default_style["fill"]["color"] = corte.v  }
                                        if(geomType.includes("Point") ) { default_style[this.VM_default_shape]["fill"]["color"] = corte.v  }
                                        if(geomType.includes("LineString") ) { default_style["stroke"]["color"] = corte.v  }

                                    }else{
                                        //es un size
                                        if(geomType.includes("Point") ) { default_style[this.VM_default_shape]["radius"] = corte.v  }
                                        if(geomType.includes("LineString") ) { default_style["stroke"]["width"] = corte.v  }
                                    }
                                
                            }

                        }else{
                            if(feature.getProperties()[rule.column] == value){
                                if(rule.targetProperty=="fill"){
                                    if(geomType.includes("Polygon") ) { default_style["fill"]["color"] = corte.v  }
                                    if(geomType.includes("Point") ) { default_style[this.VM_default_shape]["fill"]["color"] = corte.v  }
                                    if(geomType.includes("LineString") ) { default_style["stroke"]["color"] = corte.v  }

                                }else{
                                    //es un size
                                    if(geomType.includes("Point") ) { default_style[this.VM_default_shape]["radius"] = corte.v  }
                                    if(geomType.includes("LineString") ) { default_style["stroke"]["width"] = corte.v  }
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
            let type = ""
            let content = undefined
            if(this.VM_rules.length==1){
                let cortes = this.VM_rules_cortes[0]
                type = `legend-${cortes.type}`
                content = {
                    cortes : cortes,
                }
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
        }
    }
}