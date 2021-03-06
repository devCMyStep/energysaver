var configs = require('../configs/configs');

module.exports = function(app) {
    var Dados = app.models.dados;
    var DadosController = {
        // pagina de dados
        // download dados em csv
        download: function(req, res) {
            res.download('/home/dalton/projects/nodejs/labic/energysaver_ejs/configs/dados.csv', 'dados.csv');
        },
        // pagina de resultados
        search: function(req, res) {
            Dados.find(req.query, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    configs.data_csv_generator(data);
                    var docs = configs.data_chart(data);
                    res.render('dados/search', { dados: docs, day_search: req.query.day });
                }
            }).sort({ day: -1, hour: -1 });
        },
        // pagina de monitoramento em tempo real
    }
    return DadosController;
}