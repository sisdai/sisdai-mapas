import * as d3 from "d3"

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
        }

    },
    data:function(){
        return {
            VM_is_classified:false,
            VM_r_class:"",
            VM_r_colors:[],
            VM_r_labels:[],
            VM_r_column:"",
            VM_r_cortes : []
        }
    },
    created:function(){

    },
    mounted:function(){
        if(this.renderClassification!=""){
            this.VM_is_classified = true;
        }
        this.VM_r_class = this.renderClassification
        this.VM_r_colors = this.renderColors
        this.VM_r_column = this.renderColumn

        
    
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

            console.log("Ahora si a poner el estilo, segun la coropleta")

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
        }
    }
}