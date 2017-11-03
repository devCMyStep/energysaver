module.exports = function(app) {
    var home = app.controllers.index;
    var autenticar = require('../middleware/autenticar');

    app.route('/')
        .get(home.login)
        .post(home.autenticacao);

    app.route('/home').get(autenticar, home.index);
    app.route('/logout').get(autenticar, home.logout);
    
    
}