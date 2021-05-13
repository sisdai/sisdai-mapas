import {Fill, Stroke, Circle, Style, Icon} from 'ol/style';

const equivalencias = {
    "fill":{
        class:Fill,
        key:"fill"
    },
    "stroke":{
        class: Stroke,
        key:"stroke"
    },
    "circle":{
        class:Circle,
        key:"image"
    },
    "icon":{
        class:Icon,
        key:"image"
    },
    "style":{
        class:Style,
        key:"style"
    }
}

const convertirNode = (key,node)=>{
    let equivalencias_keys=Object.keys(equivalencias)
    let newnode= {}
    //console.log(node)
    Object.keys(node).forEach(subkey=>{
        let subnode = node[subkey]
        let new_subnode = {}
        if( equivalencias_keys.includes( subkey )) {
            new_subnode = convertirNode(subkey,subnode)
        }else{
            new_subnode[subkey] = subnode
        }
        //console.log(subkey,"--> |",new_subnode)
        Object.assign(newnode,new_subnode)
    })
    let conversion = {}
    conversion[equivalencias[key]["key"]] = new equivalencias[key]["class"]( newnode )
    return conversion
}


const serializedStyleIfHighlight=function(originalSerializedStyle,newStyle){
    let originalStyle2 = JSON.parse(JSON.stringify(originalSerializedStyle))
    let newStyle2  = JSON.parse(JSON.stringify(newStyle))

    let output = { style:{...originalStyle2.style,...newStyle2.style}}
    
    /*
    if("stroke" in originalStyle["style"]){
        originalStyle["style"]["stroke"]["color"] = "gray"
        originalStyle["style"]["stroke"]["width"] = 3
        originalStyle["style"]["zIndex"] = 2;
    } 
    //console.log(originalSerializedStyle,originalStyle)
    */
    return output
}

const fixSerializedStyleIfIncomplete = function(serializedStyle){
    if(Object.prototype.hasOwnProperty.call(serializedStyle,"style")){
        return serializedStyle
    }
    return {style:serializedStyle}
}


export default function (serializedStyle){
    //console.log(serializedStyle)
    let style = convertirNode("style",serializedStyle["style"]);
    return style
}

export {serializedStyleIfHighlight,fixSerializedStyleIfIncomplete};