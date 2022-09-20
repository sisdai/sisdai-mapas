


const  prepararTexturesfromCortes = (cortes,rule,texturaOpcionesIniciales)=>{
    const textura_modificable ={...texturaOpcionesIniciales}
    if(rule.clasificacion==='categorias'){
        //reasignar propiedades de la textura, 
        return cortes.cortes.map((corte,idx)=>{
            let nueva_textura = {...textura_modificable,...categoricalVariants[idx] }
            return nueva_textura
        })
    }
    
    //es una clasificacion cuantitativa

    let total_cortes = cortes.cortes.length
    return cortes.cortes.map((corte,idx)=>{
        const patron = textura_modificable.pattern;
        let propsClasificacion = {}
        if(simplePatterns.includes(patron)){
            propsClasificacion = {size:(idx+1),spacing:total_cortes+2}
        }else{
            propsClasificacion = {scale:.75+(idx*.25)}
        }
        
        let nueva_textura = {...textura_modificable,...propsClasificacion }
        return nueva_textura
    })
    
}


export default prepararTexturesfromCortes;

const simplePatterns = ['hatch','cross','dot','circle','square','tile'];
const complexPatterns = ['woven','crosses','caps','nylon','hexagon','wave','vine','brick','rock']


const categoricalVariants = [
    {
        pattern:"dot"
    },
    
    {
        pattern:"crosses"
    },
    {
        pattern:"hatch",
        angle: 0
    },
    {
        pattern:"hatch",
        angle: 90
    },
    {
        pattern:"woven",
    },
    
    {
        pattern:"cross",
        angle: 0
    },
    {
        pattern:"cross",
        angle: 45
    },
    {
        pattern:"circle",
        angle: 0
    },
    
    
    {
        pattern:"crosses",
    },
    {
        pattern:"caps",
    },
    {
        pattern:"wave",
    },
]