const pdf = require('pdf-poppler');
const jsdom = require("jsdom");
const fs = require('fs');
const { config } = require('process');
const { JSDOM } = jsdom;

let data = new Date()
let month = (data.getMonth() + 1).toString().padStart(2, "0");
let day = data.getDate().toString().padStart(2, "0");
let cache_data = day+month;

// Receive input args from the terminal (pdf config / dir path)
let _terminal_arg = process.argv;
_terminal_arg.forEach(function terminal_arg (input, index) {
});

// Remove elements that aren't used by the array [config, path] 
let pdfCount = _terminal_arg.slice();
pdfCount.splice(0, 2);
const perChunk = 2; // get arrays per chunk    

const inputArray = pdfCount;

// Format incoming args into an array of arrays
const pdf_chunkConfig = inputArray.reduce((resultArray, item, index) => { 
  const chunkIndex = Math.floor(index/perChunk)

  if(!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = [] 
  }

  resultArray[chunkIndex].push(item)
    
  return resultArray;
}, [])

// Create a standard dir where the incoming conversions will be stored as img(jpg or png)
fs.mkdir('./dist', { recursive: true }, (err) => {
    if (err) throw err;
});


// Run a loop of conversions for each pdf especified
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

    // Return for f convert the propertys that will be used as data to create specific dir names like dist/cabana_vip or dist/emporio
     function folderNum(folderNum, jsonData) {
            folderNum = `./dist/${jsonData.dir}`

            fs.mkdir(folderNum, { recursive: true }, (err) => {
                if (err) throw err;
            });
            
            return(folderNum)
        }
    //Reads the config json file
    function readConfig(terminal_arg) {
        let jsonPath = './config/';

        fs.readdir(jsonPath, (err, data) => {
            if (err) throw err;
            Object.keys(data).forEach(key => {
                let configName = data[key].replace('.json','');
                if (configName == terminal_arg[0]) {
                    dataToConversion(terminal_arg, data[key], jsonPath)
                };
            });
        });
    };

    //Convert the data received by the json
    function dataToConversion(terminal_arg, config, jsonPath) {
        fs.readFile(`${jsonPath}${config}`, (err, data) => {
            if (err) throw err;
            jsonData = JSON.parse(data);
        

            terminal_arg[0].toLowerCase();
            convert(terminal_arg, jsonData);
        });
    }


    function convert(terminal_arg, jsonData) {    

    // Give to the library json propertys like {title, dir, extension}
        let opts = {
            format: jsonData.extension,
            out_dir: folderNum(folderNum, jsonData),
            out_prefix: "page",
            page: null,
            scale: jsonData.height
        };
    
    // Does the Conversion of pdf file to images
        pdf.convert(terminal_arg[1], opts)
        .then(res => {
            console.log(`Conversão concluida!: ${terminal_arg[0]}`);
            
            pdf.info(terminal_arg[1])
            .then(pdfinfo => {
                edit__html(pdfinfo.pages, jsonData, cache_data, opts.out_dir);
            });            
        })
        .catch(error => {
            console.error(error);
        })
        
    } 

    //Perform some editions on html file
    function edit__html(pages, jsonData, cache_data, standard_folder) {
        let pdf_name = "page";

        let writePromise = new Promise(function(resolve){
            document.querySelector("title").innerHTML = `${jsonData.title}`
    
            let count_page = 1;
            // Enumerate the pages converted on the html
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


    //Create an html file with the editions 
    function create__html(standard_folder) {
        fs.writeFile(`${standard_folder}/index.html`, document.documentElement.innerHTML, function(error) {
            if (error) throw error;
        });
    }


    readConfig(pdf_chunkConfig[count_pdf]);
    count_pdf++;
}