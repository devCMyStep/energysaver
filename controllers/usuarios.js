module.exports = function(app){
    var Usuario = app.models.usuarios;
    var Sensores = app.models.sensores;
    var UsuarioController = {
        index: function (req,res){
            Usuario.find(function(err, data){
                if (err) {
                    console.log('Erro ao buscar dados: '+err);
                }else {
                    res.render('usuarios/index',{user:data});  
                }
            });
        },
        cadastrar: function(req, res){
            res.render('usuarios/cadastrar', {user: new Usuario()});
        },
        post: function(req, res){
            var username = req.body.user;
            var email = req.body.email;
            var senha = req.body.senha;
            var confirmarSenha = req.body.confirmarSenha;
            Usuario.findOne({'email':email},function(err, data){
                if (data){
                    req.flash('erro', 'O email ja existe!');
                    res.render('usuarios/cadastrar', { user: req.body });
                }else if(confirmarSenha != senha){ 
                    req.flash('erro', 'As senhas nao conferem!');
                    res.render('usuarios/cadastrar', { user: req.body });
                }else{
                    Usuario.findOne({'user':username},function(err, data){
                        if (data){
                            req.flash('erro', 'O nome de usuario ja existe!');
                            res.render('usuarios/cadastrar', { user: req.body });
                        }else {
                            var model = new Usuario();
                            model.nome  = req.body.nome;
                            model.email = req.body.email;
                            model.nascimento = req.body.nascimento;
                            model.user = req.body.user;
                            model.senha = model.generateHash(req.body.senha);
                            model.save(function(err){
                                if (err){
                                    req.flash('erro','Erro ao salvar cadastro!');
                                    res.render('usuarios/cadastrar',{user:req.body});
                                }else{
                                    req.flash('info','Usuario cadastrado!');
                                    res.redirect('/usuarios');
                                }
                            });
                        }
                    });
                }
            });
        },
        user: function(req, res){
            Usuario.findById(req.params.id,function(err, data){
                if (err) {
                    req.flash('erro','Erro ao buscar usuario: '+err);
                }else {
                    res.render('usuarios/user',{user:data, sensor: new Sensores()});
                }
            });
        },
        edit: function(req, res) {
            Usuario.findById(req.params.id, function(err, data) {
                if (err) {
                    req.flash('erro', 'Erro ao editar usuario: ' + err);
                    res.redirect('/usuarios');
                } else {
                    res.render('usuarios/editar', { user: data });
                }
            });
        },
        update: function(req, res){
            Usuario.findById(req.params.id,function(err, data){
                if (err) {
                    req.flash('erro', 'Erro ao editar usuario: ' + err);
                    res.redirect('/usuarios');
                } else {
                    var model = data;
                    model.nome = req.body.nome;
                    model.nascimento = req.body.nascimento;
                    model.save(function(err){
                        if (err){
                            req.flash('erro', 'Erro ao atualizar cadastro');
                            res.render('usuarios/editar', {user:req.body});
                        }else {
                            req.flash('info', 'Dados do usuario atualizados!');
                            res.redirect('/usuarios');
                        }
                    });
                }
            });
        },
        delete : function(req, res){
            Usuario.remove({_id: req.params.id}, function(err){
                if (err){
                    req.flash('erro', 'Erro ao excluir usuario!');
                    res.redirect('/usuarios');
                }else{
                    req.flash('info','Usuario excluido com sucesso!');
                    res.redirect('/usuarios');
                }
            });
        }
    }
    return UsuarioController;
}