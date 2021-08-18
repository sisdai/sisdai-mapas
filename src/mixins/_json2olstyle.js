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
    //console.log(originalStyle2)
    prepareSimplePointVectors(originalStyle2,newStyle2)
    let output = { style:{...originalStyle2.style,...newStyle2.style}}
    //console.log(output)
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

const prepareSimplePointVectors=function(targetStyle,sourceStyle){
    //console.log(targetStyle,sourceStyle)
    if("circle" in targetStyle.style && "_simple_point" in sourceStyle.style ){
        targetStyle.style["circle"] = { ... targetStyle.style["circle"], ...sourceStyle.style["_simple_point"]}
        return
    }
    if("square" in targetStyle.style && "_simple_point" in sourceStyle.style ){
        targetStyle.style["square"] = { ... targetStyle.style["square"], ...sourceStyle.style["_simple_point"]}
        return
    }
    if("triangle" in targetStyle.style && "_simple_point" in sourceStyle.style ){
        targetStyle.style["triangle"] = { ... targetStyle.style["triangle"], ...sourceStyle.style["_simple_point"]}
        return
    }
}

const checkPointShapeFromStyle = function(style){
    if("circle" in style.style ){
        return "circle"
    }
    if("square" in style.style ){
        return "square"
    }
    if("triangle" in style.style ){

        return "triangle"
    }

    console.log("BUG:::estilo para punto no esperado")
    return "none"
}

const joinDefaultValuesWithNewValuesInPoints=function(targetStyle,sourceStyle,keyShape){
    
    if(keyShape in targetStyle.style ){
        targetStyle.style[keyShape] = { ... targetStyle.style[keyShape], ...sourceStyle.style[keyShape]}
        
        return
    }
    
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

export {
    serializedStyleIfHighlight,
    fixSerializedStyleIfIncomplete,
    prepareSimplePointVectors,
    joinDefaultValuesWithNewValuesInPoints,
    checkPointShapeFromStyle
};