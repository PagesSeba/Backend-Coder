class crearSession {
    cerrarLogin(req, res){
        const nombre = req.session.nombre 
        if(req.session.nombre){
            req.session.destroy((err) => {
                res.render('logout', {nombre: nombre})
              })
        } else {
            res.redirect('/login')
        }

    }
}
module.exports = new crearSession;