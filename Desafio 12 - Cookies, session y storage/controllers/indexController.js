class indexController {
        home(req, res){
            if(req.session.nombre){
                res.render('formulario', { root: __dirname, nombre: req.session.nombre })
            } else{
                res.redirect('/login')
            }
    }
}
module.exports = new indexController;