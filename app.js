/* import configurations from server */
const { set } = require('./config/server');
var app = require('./config/server');

/* define port */
var server = app.listen(8080, function() {
    console.log('server ON');
})

var io = require('socket.io').listen(server);

app.set('io', io);

/* create websocket connection */

io.on('connection', function(socket){
    console.log('Usuário conectado')

    socket.on('disconnect', function(){
        console.log('Usuário desconectado');
    });

    socket.on('msgParaServidor', function(data){

        /* chat */
        socket.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        /* players */
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            );

            socket.broadcast.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            );
        ;}
    });
});