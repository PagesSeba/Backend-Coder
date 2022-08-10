class crearSession {
    login(req, res){
        if(req.session.nombre){
            res.redirect('/');
        } else {
            res.render('login', { root: __dirname, hola: 'adios' })
        }
    }

    crearLogin(req, res){
        if(req.session.nombre){
            res.redirect('/');
        } else {
            req.session.nombre = req.body.nombre;
            res.redirect('/')
        }
    }
}
module.exports = new crearSession;