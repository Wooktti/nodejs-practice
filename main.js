function constructHTMLTemplate(title, list, body) {
    return `
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${body}
    </body>
    </html>
    `;
}

function constructTemplateList(filelist){
    var list = '<ul>';
    for (let i = 0; i < filelist.length; i++) {
        list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
    }
    list += '</ul>';
    return list;
}

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
            fs.readdir('./data', (error, filelist) => {
                title = 'Welcome';
                data = 'Hello, Node.js';
                list = constructTemplateList(filelist);
                template = constructHTMLTemplate(title, list, `<h2>${title}</h2><p>${data}</p>`);

                response.writeHead(200);
                response.end(template);
            });
            
        } else {
            fs.readdir('./data', (error, filelist) => {
                list = constructTemplateList(filelist);

                fs.readFile(`data/${title}`, 'utf8', (err, data) => {
                    template = constructHTMLTemplate(title, list, `<h2>${title}</h2><p>${data}</p>`);
                response.writeHead(200);
                response.end(template);
                });
            });
        } 

    } else {

        response.writeHead(404);
        response.end('Not found');
        
    }
});
app.listen(3000);