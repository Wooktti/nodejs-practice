var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;
    var title = queryData.id;
    var template;

    if(pathName === '/') {
        if (title === undefined) {
            title = 'Welcome';
            data = 'Hello, Node.js';
            template = `
        <!doctype html>
    <html>
    <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${data}</p>
    </body>
    </html>
        `;
            response.writeHead(200);
            response.end(template);
        } else {
            fs.readFile(`data/${title}`, 'utf8', (err, data) => {
                template = `
            <!doctype html>
        <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>${data}</p>
        </body>
        </html>
            `;
            response.writeHead(200);
            response.end(template);
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
    
    
    
    
});
app.listen(3000);