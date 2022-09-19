import jsdom from "jsdom";
import { mkdir, readdir, readFile, writeFile } from 'fs';
const { JSDOM } = jsdom;
import { exec } from 'child_process';

let data = new Date()
let month = (data.getMonth() + 1).toString().padStart(2, "0");
let day = data.getDate().toString().padStart(2, "0");
let cache_data = day+month;

// Recebe os args inputados no terminal (path do diretório / formato da imagem)
let _terminal_arg = process.argv;
// Remove elementos não utilizados pelo array [connfig, path]
let pdfCount = _terminal_arg.slice();
pdfCount.splice(0, 2);
const perChunk = 2; // args recebidos por chunk    

const inputArray = pdfCount;

// Formata os args recebidos em um array de arrays
const pdf_chunkConfig = inputArray.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)

    if(!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = [] 
    }

    resultArray[chunkIndex].push(item)
    
    return resultArray;
}, [])

//Cria o diretório padrão onde serâo armazenados as conversões de img e html
mkdir('./dist', { recursive: true }, (err) => {
    if (err) throw err;
});


// Loop de execução para cada uma das conversões
let count_pdf = 0
while(count_pdf < pdf_chunkConfig.length) {
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

    //Retorna para a f convert a especificaçâo do nome do diretório a ser armazenado os arquivos de uma config e faz a criação do diretório
        function folderNum(folderNum, jsonData) {
            folderNum = `./dist/${jsonData.dir}`
            
            mkdir(folderNum, { recursive: true }, (err) => {
                if (err) throw err;
            });
            
            return(folderNum)
        }
    //Leitura da config do file json
    function readConfig(terminal_arg) {
        let jsonPath = './config/';
        
        readdir(jsonPath, (err, data) => {
            if (err) throw err;
            Object.keys(data).forEach(key => {
                let configName = data[key].replace('.json','');
                if (configName == terminal_arg[0]) {
                    dataToConversion(terminal_arg, data[key], jsonPath)
                };
            });
        });
    };
    
    //Converte os dados recebidos do json
    function dataToConversion(terminal_arg, config, jsonPath) {
        readFile(`${jsonPath}${config}`, (err, data) => {
            if (err) throw err;
            let jsonData = JSON.parse(data);
        

            terminal_arg[0].toLowerCase();
            convert(terminal_arg, jsonData);
        });
    }

    
    function convert(terminal_arg, jsonData) {   
        const dist =  folderNum(folderNum, jsonData)

        let output = `pdftoppm ${terminal_arg[1]} -f 1000000 2>&1 | grep -o '([0-9]*)\.$' \| grep -o '[0-9]*'` + 
        ` && cd ${dist} ` +
        ` && pdftoppm -${jsonData.extension} -rx ${jsonData.dpi_x} -ry ${jsonData.dpi_y} ../../${terminal_arg[1]} page`; 
        
        exec(output, function(err, stdout){
            if (err) console.log(err);
            edit__html(stdout, jsonData, cache_data, dist);    
        });    
    } 

    //Realiza edições no html como a title
    function edit__html(pages, jsonData, cache_data, standard_folder) {
        let pdf_name = "page";

        let writePromise = new Promise(function(resolve){
            document.querySelector("title").innerHTML = `${jsonData.title}`
    
            let count_page = 1;
            // Numera as paginas convertidas no html e realiza outras alterações seguindo o pdf convertido
            if  (pages > 9) {

                for (let count_edit = 0; count_edit < pages; count_edit++) {
                    let page_format = count_page.toString().padStart(2, "0");
                    document.querySelector("body").innerHTML += (`
    <img src="./${pdf_name}-${page_format}.${jsonData.extension}?t=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
                    count_page++;
                } 
            }
        
            else if (pages <= 9) {
                for (let count_edit = 0; count_edit < pages; count_edit++) {
                    document.querySelector("body").innerHTML += (`
    <img src="./${pdf_name}-${count_page}.${jsonData.extension}?t=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
                    count_page++;
                }      
            }
            
            create__html(standard_folder);
            
            resolve();                    
        });
    }


    //Cria o arquivo html com as alterações já recebidas
    function create__html(standard_folder) {
        writeFile(`${standard_folder}/index.html`, document.documentElement.innerHTML, function(error) {
            if (error) throw error;
        });
    }
    readConfig(pdf_chunkConfig[count_pdf]);
    count_pdf++;
}
