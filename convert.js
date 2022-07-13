const pdf = require('pdf-poppler');
const jsdom = require("jsdom");
const fs = require('fs');
const { config } = require('process');
const { JSDOM } = jsdom;


let pdf_name = "page";
let jsonPath = './config/';
let data = new Date()
let month = (data.getMonth() + 1).toString().padStart(2, "0");
let day = data.getDate().toString().padStart(2, "0");
let cache_data = day+month;

// Recebe os args inputados no terminal (path do diretório / formato da imagem)
let _terminal_arg = process.argv;
_terminal_arg.forEach(function terminal_arg (input, index) {
    console.log(`${index}: ${input}`)

});

let pdfCount = _terminal_arg.slice();
pdfCount.splice(0, 2);

const perChunk = 2 // args recebidos por chunk    

const inputArray = pdfCount

const pdf_chunkConfig = inputArray.reduce((resultArray, item, index) => { 
  const chunkIndex = Math.floor(index/perChunk)

  if(!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = [] 
  }

  resultArray[chunkIndex].push(item)
    
  return resultArray;
}, [])

fs.mkdir('./dist', { recursive: true }, (err) => {
    if (err) throw err;
});

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

    //Envia info da remomeação para a edição do html

     function folderNum(folderNum, jsonData) {
            folderNum = `./dist/${jsonData.dir}`

            fs.mkdir(folderNum, { recursive: true }, (err) => {
                if (err) throw err;
            });
            
            return(folderNum)
        }
    //Leitura da configuração do file json
    function readConfig(terminal_arg) {
        console.log(terminal_arg)
        fs.readdir(jsonPath, (err, data) => {
            if (err) throw err;
            Object.keys(data).forEach(key => {
                let configName = data[key].replace('.json','');
                if (configName == terminal_arg[0]) {
                    dataToConversion(terminal_arg, data[key], configName)
                };
            });
        });
    };

    function dataToConversion(terminal_arg, config, configName) {
        fs.readFile(`${jsonPath}${config}`, (err, data) => {
            if (err) throw err;
            jsonData = JSON.parse(data);
            console.log('jsonData');
            console.log(jsonData);

            terminal_arg[0].toLowerCase();
            convert(terminal_arg, jsonData, configName);
        });
    }


    // Converte o diretório do pdf as para o formato selecionado 
    function convert(terminal_arg, jsonData, configName) {
    

    // Declaraçôes do path e formato da imagem
        let opts = {
            format: jsonData.extension,
            out_dir: folderNum(folderNum, jsonData),
            out_prefix: "page",
            page: null,
            scale: jsonData.height
        };

        pdf.convert(terminal_arg[1], opts)
        .then(res => {
            console.log('Conversão concluida!');
            
            pdf.info(terminal_arg[1])
            .then(pdfinfo => {
                edit__html(pdfinfo.pages, jsonData, cache_data, opts.out_dir);
            });            
        })
        .catch(error => {
            console.error(error);
        })
        
    } 

    //Realiza alteraçôes no html
    function edit__html(pages, jsonData, cache_data, standard_folder) {

        let writePromise = new Promise(function(resolve){
            document.querySelector("title").innerHTML = `${jsonData.title}`
    
            let count_page = 1;

    //         for (let count_edit = 0; count_edit < pages; count_edit++) {
    //             console.log(jsonData.extension)
    //             document.querySelector("body").innerHTML += (`
    // <img src="./${pdf_name}-${count_page}.${jsonData.extension}?t=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
    //             count_page++;
    //         }
            

            if  (pages > 9) {

                for (let count_edit = 0; count_edit < pages; count_edit++) {
                    let page_format = count_page.toString().padStart(2, "0");
                    console.log(jsonData.extension)
                    document.querySelector("body").innerHTML += (`
    <img src="./${pdf_name}-${page_format}.${jsonData.extension}?t=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
                    count_page++;
                } 
            }
        
            else if (pages <= 9) {
                for (let count_edit = 0; count_edit < pages; count_edit++) {
                    console.log(jsonData.extension)
                    document.querySelector("body").innerHTML += (`
    <img src="./${pdf_name}-${count_page}.${jsonData.extension}?t=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
                    count_page++;
                }      
            }
            
            create__html(standard_folder);
            
            resolve();                    
        });


    //     Promise.race([writePromise])
    //     .then(function(data){
    //         document.querySelector("title").innerHTML = `${jsonData.title}`
    
    //             for (c; c < pages; c++) {
    //                 document.querySelector("body").innerHTML += (`
    // <img src="./${pdf_name}-${i}.${jsonData.extension}?t=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
    //                 i++;
    //             }

    //             if (data.write) {
    //                 create__html(standard_folder)
    //             }
    //     }).catch(function(e){
    //         console.log(e);
    //     });



        // if  (pages > 9) {
        //     for (c; c<pages; c++) {
        //         let page_count = i.toString().padStart(2, "0");
        // document.querySelector("body").innerHTML += (`
        // <img src="./${pdf_name}-${page_count}.${jsonData.extension}?t=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
        // i++;
        //     }   
        // }

        // else if (pages <= 9) {
        //     for (c; c<pages; c++) {
        // document.querySelector("body").innerHTML += (`
        // <img src="./${pdf_name}-${i}.${jsonData.extension}?t=${cache_data}" alt="" style="width: 100%; max-width: none;"><br>`);
        // i++;
        //     }        
        // }
    }


    //Realiza a escrita do html
    function create__html(standard_folder) {
        fs.writeFile(`${standard_folder}/index.html`, document.documentElement.innerHTML, function(error) {
            console.log(document.documentElement.innerHTML)
            if (error) throw error;
        });
    }

    readConfig(pdf_chunkConfig[count_pdf]);
    count_pdf++;
}