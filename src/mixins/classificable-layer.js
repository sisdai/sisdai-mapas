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
            console.log(features)

            let quantile0 = d3.scaleQuantile()
            .domain(todos_valores)
            .range(this.VM_r_colors);

            this.VM_r_cortes= this.VM_r_colors.map((color, i) => {
                let limits = quantile0.invertExtent(color);
                let label = `${Math.floor((limits[0]===0||i===0)?limits[0]:limits[0]+1)
                    .toLocaleString("en")} a ${Math.floor(limits[1]).toLocaleString("en")}`
                return { d: label, val: limits, c: color };
            })
        }
    }
}