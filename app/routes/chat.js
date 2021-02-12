const { body, validationResult } = require('express-validator');

module.exports = function(application){
    application.post('/chat', 
    body('apelido', 'Apelido é Obrigatório').notEmpty(),
    body('apelido', 'Nome ou apelido deve ter entre 5 e 10 caracteres').isLength({min: 5, max: 10}),
    (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.render('index', {validacao: erros.errors});
            return;    
        } 
        
        application.app.controllers.chat.iniciaChat(application, req, res);
    });

    application.get('/chat', function(req, res){
        application.app.controllers.chat.iniciaChat(application, req, res);
    });
};
