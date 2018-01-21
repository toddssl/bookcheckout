var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

app = express();
port = process.env.PORT || 3000;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {

    console.log("use common");

    res.setHeader('content-type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");

    next();

});

apiRoutes.get('/savetest', function(req, res) {

    console.log("save");

    var obj = {
    table: []
    };

    obj.table.push({id: 1, square:2});
    var json = JSON.stringify(obj);

    fs.writeFile('data.json', json, 'utf8', function(){
        console.log();
    });

    res.json(req.decoded);
});

apiRoutes.post('/save', bodyParser.text({ type: 'json' }), function(req, res) {

    var json = JSON.stringify(req.body);
    fs.writeFileSync('data.json', json, 'utf8', function(){
         console.log();
    });

    res.json(req.decoded);
});

apiRoutes.get('/get', function(req, res) {

    console.log("get");

    fs.readFile('data.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("Asynchronous read: " + data.toString());

        res.setHeader('Content-Type', 'application/json');
        res.send(data); 
    });
});

app.use('/api', apiRoutes);

app.listen(port);

console.log('server started on: ' + port);
