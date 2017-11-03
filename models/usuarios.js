var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


module.exports = function() {
    UsuarioSchema = mongoose.Schema({
        nome : { type: String, trim: true },
        user : { type: String, trim: true, unique: true, index: true},
        email: { type: String, trim: true, unique: true, index: true},
        senha: { type: String, trim: true },
        nascimento: {type: String, trim: true}
    });

    UsuarioSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    UsuarioSchema.methods.validPassword = function(password_client,password_db){
        return bcrypt.compareSync(password_client,password_db, null);
    };

    return mongoose.model("Usuarios", UsuarioSchema);
}