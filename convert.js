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
const dom = new JSDOM(`${htmlContent}`);
const document = dom.window.document;
let pdf_name = "page";
let c =0;
let i = 1;
let _page_array = 0;
let jsonPath = './pdf_config/';

let data = new Date()
let month = (data.getMonth() + 1).toString().padStart(2, "0");
let day = data.getDate().toString().padStart(2, "0");
let cache_data = day+month;

// Recebe os args inputados no terminal (path do diretório / formato da imagem)
let _terminal_arg = process.argv;
_terminal_arg.forEach(function terminal_arg (input, index) {
    console.log(`${index}: ${input}`)

});

//Leitura da configuração do file json
function readConfig(terminal_arg) {
    fs.readdir(jsonPath, (err, data) => {
        if (err) throw err;


        Object.keys(data).forEach(key => {

            let configName = data[key].replace('.json','');
            if (configName == terminal_arg[3]) {
                dataToConversion(terminal_arg, data[key], configName)
            };
        });
    });
};

function dataToConversion(terminal_arg, config, configName) {
    fs.readFile(`${jsonPath}${config}`, (err, data) => {
        if (err) throw err;
        
        jsonData = JSON.parse(data);

        terminal_arg[3].toLowerCase();
        convert(terminal_arg, jsonData, configName);
      });
}


// Converte o diretório do pdf as para o formato selecionado 
function convert(terminal_arg, jsonData, configName) {
    let pdfCount = terminal_arg.slice();
    pdfCount.splice(0, 2);
    console.log(pdfCount.length%2)


// Mais informações sobre: 
// https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-265.php
// https://stackoverflow.com/questions/8495687/split-array-into-chunks

    const perChunk = 2 // items per chunk    

    const inputArray = pdfCount
    
    const result = inputArray.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/perChunk)
    
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] 
      }
    
      resultArray[chunkIndex].push(item)
        
      return resultArray
    }, [])
    
    console.log(result[1]);
//Capitalização do titulo do titulo
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

// Cria a folder padrão
    fs.mkdir('./dist', { recursive: true }, (err) => {
        if (err) throw err;
    });

 

// Declaraçôes do path e formato da imagem
    let opts = {
        format: jsonData.extension,
        out_dir: "./dist",
        out_prefix: "page",
        page: null,
        scale: jsonData.height
    };

    pdf.convert(terminal_arg[2], opts)
    .then(res => {
        console.log('Conversão concluida!');
    })
    .catch(error => {
        console.error(error);
    })

//Envia info da remomeação para a edição do html 
    // pdf.info(terminal_arg[2])
    // .then(pdfinfo => {
    //     _page_array = pdfinfo.pages
    //     edit__html(_page_array, jsonData.extension, cache_data, opts.out_dir, capitalizeFirstLetter(configName));
    // });
    
} 

//Realiza alteraçôes no html
function edit__html(pages, format, cache_data, standard_folder, storeName) {
    document.querySelector("title").innerHTML = `Cárdapio ${storeName}`

    if  (pages > 9) {
        for (c; c<pages; c++) {
            let page_count = i.toString().padStart(2, "0");
    document.querySelector("body").innerHTML += (`
    <img src="./${pdf_name}-${page_count}.${format}?t=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
    i++;
        }   
    }

    else if (pages <= 9) {
        for (c; c<pages; c++) {
    document.querySelector("body").innerHTML += (`
    <img src="./${pdf_name}-${i}.${format}?t=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
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

readConfig(_terminal_arg);
