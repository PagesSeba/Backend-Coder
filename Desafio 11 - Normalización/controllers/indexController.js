class indexController {
    home(req, res){
        
        res.render('formulario', { root: __dirname })
    }
}
module.exports = new indexController;