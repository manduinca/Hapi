var Hapi = require('hapi');
var request = require('hyperquest');

var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    method: 'GET',
    path: '/{username}',
    handler: function(req, res){
        var url = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=3AC9E09DF25875038DD5A9829296A1A4&vanityurl=';
        var hreq = request(url + req.params.username);
        var data = '';
        hreq.on('data', function(chunk) { 
            data += chunk;
        });
        hreq.on('end', function() { 
            var jres = JSON.parse(data);
            res('<p> El usuario: <b>' + req.params.username + '</b> tiene steamid: <b>' + jres.response.steamid + '</b></p>');
        });
    }
});

server.start(function () {
    console.log('Servidor corriendo: ', server.info.uri);
});
