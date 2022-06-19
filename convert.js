const pdf = require('pdf-poppler');
const jsdom = require("jsdom");
const fs = require('fs');
const { JSDOM } = jsdom;

const htmlContent = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cárdapio Cabana do Sol</title>
</head>
<body></body>
</html>
`
let dom = new JSDOM(`${htmlContent}`);
let document = dom.window.document;
let c =0
let i = 1;
let _page_array = 0;

let data = new Date()
let month = (data.getMonth() + 1).toString().padStart(2, "0");
let day = data.getDate().toString().padStart(2, "0");
let cache_data = day+month


// Recebe os args inputados no terminal (path do diretório / formato da imagem)
let _terminal_arg = process.argv;
_terminal_arg.forEach(function terminal__arg (input, index) {
    console.log(`${index}: ${input}`)
});

//Renomeia os arquivos de imagem e o path inbutido
function renomear(terminal__arg) {
    let file = terminal__arg[2]    
    let file__rename = file.split(/[ ./\r\n/\\]+/)
    let pdf_name = file__rename.slice(-2) [0];
    
    convert(terminal__arg, file, pdf_name); 

}

// Converte o diretório do pdf as para o formato selecionado 
function convert(terminal__arg, file, pdf_name) {

// Cria a folder padrão
    fs.mkdir('./dist', { recursive: true }, (err) => {
        if (err) throw err;
    });

// Declaraçôes do path e formato da imagem
    let opts = {
        format: terminal__arg[3],
        out_dir: "./dist",
        out_prefix: pdf_name,
        page: null,
        scale: terminal__arg[4]
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
        _page_array = pdfinfo.pages
        edit__html(_page_array, pdf_name, terminal__arg[3], cache_data, opts.out_dir);
    });
    
} 

//Realiza alteraçôes no html
function edit__html(pages, pdf_name, format, cache_data, standard_folder) {

    if  (pages > 9) {
        for (c; c<pages; c++) {
            let page_count = i.toString().padStart(2, "0");
    document.querySelector("body").innerHTML += (`
    <img src="./${pdf_name}-${page_count}.${format}?=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
    i++;
        }   
    }

    else if (pages <= 9) {
        for (c; c<pages; c++) {
    document.querySelector("body").innerHTML += (`
    <img src="./${pdf_name}-${i}.${format}?=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
    i++;
        }        
    }
    create__html(standard_folder);                 
}


//Realiza a escrita do html
function create__html(standard_folder) {
    fs.writeFile(`${standard_folder}/index.html`, document.documentElement.innerHTML, function(error) {
        console.log(document.documentElement.innerHTML)
        if (error) throw error;
    });
}

renomear(_terminal_arg)
