module.exports = function(app) {
    var dados = app.controllers.dados;
    var autenticar = require('../middleware/autenticar');

    app.route('/download').get(autenticar,dados.download);
    app.route('/search').get(autenticar,dados.search);
}