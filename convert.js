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
    <title></title>
</head>
<body></body>
</html>
`
let dom = new JSDOM(`${htmlContent}`);
let document = dom.window.document;
let pdf_name = "page"
let c =0
let i = 1;
let _page_array = 0;

let data = new Date()
let month = (data.getMonth() + 1).toString().padStart(2, "0");
let day = data.getDate().toString().padStart(2, "0");
let cache_data = day+month;

// Recebe os args inputados no terminal (path do diretório / formato da imagem)
let _terminal_arg = process.argv;
_terminal_arg.forEach(function terminal__arg (input, index) {
    console.log(`${index}: ${input}`)
    
});

function dataToConversion(terminal__arg) {
    fs.readFile('dataToConversion.json', (err, data) => {
        if (err) throw err;
        
        jsonData = JSON.parse(data);
        terminal__arg[3].toLowerCase();

        Object.keys(jsonData.stores).forEach(key => {
            if (key == terminal__arg[3]) {
                convert(terminal__arg, key)

            };           
          });
      });
}

// Converte o diretório do pdf as para o formato selecionado 
function convert(terminal__arg, index) {
    let storeData = jsonData.stores;
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

// Cria a folder padrão
    fs.mkdir('./dist', { recursive: true }, (err) => {
        if (err) throw err;
    });

 

// Declaraçôes do path e formato da imagem
    let opts = {
        format: storeData.formato,
        out_dir: "./dist",
        out_prefix: pdf_name,
        page: null,
        scale: storeData.scale
    }

    pdf.convert(terminal__arg[2], opts)
    .then(res => {
        console.log('Conversão concluida!');
    })
    .catch(error => {
        console.error(error);
    })

    function storeLog(title, data, folder) {
        str = JSON.stringify(storeData[index])
        console.log(str.stores)
        const logContent = `
        Nome do PDF: ${title}
        Data de criação: ${data}
        Folder: ${folder}
        Config: ${str}
        `
        fs.writeFile(`${opts.out_dir}/.log` ,`${logContent}` ,function(error) {
            if (error) throw error;
        });
    };

//Envia info da remomeação para a edição do html 
    pdf.info(terminal__arg[2])
    .then(pdfinfo => {
        _page_array = pdfinfo.pages
        storeLog(pdfinfo.title, data, terminal__arg[2], storeData[index])
        edit__html(_page_array, storeData.formato, cache_data, opts.out_dir, capitalizeFirstLetter(index));
    });
    
} 

//Realiza alteraçôes no html
function edit__html(pages, format, cache_data, standard_folder, storeName) {
    document.querySelector("title").innerHTML = `Cárdapio ${storeName}`

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

//Armazena o log em file

dataToConversion(_terminal_arg);
