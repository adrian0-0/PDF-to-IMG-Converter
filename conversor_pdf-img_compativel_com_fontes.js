const path = require('path');
const pdf = require('pdf-poppler');
const jsdom = require("jsdom");
const fs = require('fs');
const { Console } = require('console');
const { JSDOM } = jsdom;

const html__Content = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cárdapio Cabana do Sol</title>
</head>
<body>
    <section id="block"></section>
</body>
</html>
`
let dom = new JSDOM(`${html__Content}`);
let document = dom.window.document;
let i = 1;
let _page__aray = 0;

// Bibloteca usada: https://github.com/kb47/pdf-poppler

let _terminal__arg = process.argv;
_terminal__arg.forEach(function terminal__arg (input, index) {
    console.log(`${index}: ${input}`)
});



function convert(terminal__arg) {
    let file = terminal__arg[2]
    let file__split = file.split((/[ /\r\n/\\]+/))
    file__split.pop();
    let path__name = file__split.join("/");
    
    let file__rename = file.split(/[ ./\r\n/\\]+/)
    let pdf__name = file__rename.slice(-2) [0];
    
    console.log(path__name)
    console.log(pdf__name)

    let opts = {
        format: terminal__arg[3],
        out_dir: path__name,
        out_prefix: pdf__name,
        page: null
    }

    pdf.convert(file, opts)
    .then(res => {
        console.log('Conversão concluida!');
    })
    .catch(error => {
        console.error(error);
    })
    pdf.info(file)
    .then(pdfinfo => {
        _page__aray = pdfinfo.pages
        edit__html(_page__aray, path__name, pdf__name);
    });
    
} 


function edit__html(pages, path__name, pdf__name) {
    for  (i ; i<=9; i++) {
        document.querySelector("#block").innerHTML += (`
            <img src="${path__name}/${pdf__name}-0${i}.jpg" alt="" style="width: 100%; max-width: none;">
            <br>`);
            i++;
        if (i >= 10) {
            for (c = 10; c<=pages; c++) {
                document.querySelector("#block").innerHTML += (`
            <img src="${path__name}/${pdf__name}-${c}.jpg" alt="" style="width: 100%; max-width: none;">
            <br>`)
            }
        }
    }
    create__html();                 
}
function create__html() {
    fs.writeFile("index.html", document.documentElement.innerHTML, function(error) {
        console.log(document.documentElement.innerHTML)
        if (error) throw error;
    });
}

convert(_terminal__arg); 
