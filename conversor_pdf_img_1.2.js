const pdf2img = require('pdf-img-convert');
const jsdom = require("jsdom");
const fs = require('fs');
const { JSDOM } = jsdom;
var pdflib = require('pdfjs-dist/build/pdf.js');
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.js';
pdflib.GlobalWorkerOptions.workerPort = new pdfjsWorker();

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
let i = 0
let c = 0

async function convert (terminal__arg) {
// conversão do arquivo seguindo os dados de input    
    try {
    const page_array = await pdf2img.convert(`${terminal__arg[2]}`, {
        disableFontFace: false,
        width: terminal__arg[4],
        height: terminal__arg[5],
        page_numbers: [6,7,8,9]
    });

// escrita e nomeação dos arquivos em array
    function escrita() {
        fs.writeFile(i + `.${terminal__arg[3]}`, page_array[i], function(error) {
            
            if (error) {
                console.log(error)
            }
            });
        i++;
    }
    page_array.forEach(escrita)

// edita o html com o path das imagens convertidas

    function edit__html() {
        document.querySelector("#block").innerHTML += (`
    <img src="${c}.jpg" alt="" style="width: 100%; max-width: none;">
    <br>`);
        c++;                  
    }

    page_array.forEach(edit__html)
    } catch (err) {c
        console.log(err)
    };
    create__html();
};

// gera o html

function create__html() {
    fs.writeFile("index.html", document.documentElement.innerHTML, function(error) {
        console.log(document.documentElement.innerHTML)
        if (error) throw error;
    });
}

// Como passar parametros do node via script
// https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program

// Input dos args para a conversâo
let _terminal__arg = process.argv;
_terminal__arg.forEach(function terminal__arg (input, index) {
    console.log(`${index}: ${input}`)
});

convert(_terminal__arg); 

// Log da fonte nâo reconhecida
// Warning: fetchStandardFontData: failed to fetch file "FoxitSans.pfb" with "UnknownErrorException: The standard font "baseUrl" parameter must be specified, ensure that the "standardFontDataUrl" API parameter is provided.