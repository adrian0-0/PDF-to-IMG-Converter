const pdf = require('pdf-poppler');
const jsdom = require("jsdom");
const fs = require('fs');
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
let c =0
let i = 1;
let _page__array = 0;
let count = 0

let data = new Date()
let month = (data.getMonth() + 1).toString().padStart(2, "0");
let day = data.getDate().toString().padStart(2, "0");
let cache_data = day+month


// Recebe os args inputados no terminal (path do diretório / formato da imagem)
let _terminal__arg = process.argv;
_terminal__arg.forEach(function terminal__arg (input, index) {
    console.log(`${index}: ${input}`)
});

//Renomeia os arquivos de imagem e o path inbutido
function renomear(terminal__arg) {
    let file = terminal__arg[2]
    let file__split = file.split((/[ /\r\n/\\]+/))
    file__split.pop();
    let path__name = file__split.join("/");
    
    let file__rename = file.split(/[ ./\r\n/\\]+/)
    let pdf__name = file__rename.slice(-2) [0];
    
    console.log(path__name)
    console.log(pdf__name)
    convert(terminal__arg, file, path__name, pdf__name); 

}

// Converte o diretório do pdf as para o formato selecionado 
function convert(terminal__arg, file, path__name, pdf__name) {


//Declaraçôes do path e formato da imagem
    let opts = {
        format: terminal__arg[3],
        out_dir: path__name,
        out_prefix: pdf__name,
        page: null,
        scale: 3000
    }

    pdf.convert(file, opts)
    .then(res => {
        console.log('Conversão concluida!');
    })
    .catch(error => {
        console.error(error);
    })
//Envia info da remomeação para a edição do html 
    pdf.info(file)
    .then(pdfinfo => {
        _page__array = pdfinfo.pages
        edit__html(_page__array, path__name, pdf__name, terminal__arg[3], cache_data);
    });
    
} 

//Realiza alteraçôes no html
function edit__html(pages, path__name, pdf__name, format, cache_data) {

    if  (pages > 9) {
        for (c; c<pages; c++) {
            let page_count = i.toString().padStart(2, "0");
            document.querySelector("#block").innerHTML += (`
            <img src="${path__name}/${pdf__name}-${page_count}.${format}?=${cache_data}" alt="" style="width: 100%; max-width: none;">
            <br>`);
            i++;
        }   
    }

    else if (pages <= 9) {
        for (c; c<pages; c++) {
            document.querySelector("#block").innerHTML += (`
            <img src="${path__name}/${pdf__name}-${i}.${format}?=${cache_data}" alt="" style="width: 100%; max-width: none;">
            <br>`);
            i++;
        }        
    }
    create__html();                 
}


//Realiza a escrita do html
function create__html() {
    fs.writeFile("index.html", document.documentElement.innerHTML, function(error) {
        console.log(document.documentElement.innerHTML)
        if (error) throw error;
    });
}

renomear(_terminal__arg)
