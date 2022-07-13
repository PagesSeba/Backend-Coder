const checkAdmin = (admin)=>{

    return ((req,res,next)=>{
        if (admin === true){
            next();
        } else{
            res.json({error: -1,descripcion: `ruta '${path[0]}' método '${method}' no permitida sin permisos de administrador`})
        }
    })
}

module.exports = checkAdmin;