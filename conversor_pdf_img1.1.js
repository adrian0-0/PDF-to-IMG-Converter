var pdf2img = require('pdf-img-convert');
var fs = require('fs');
let i = 0



async function convert (terminal__arg) {
    // conversão do arquivo seguindo os dados de input    
        try {
        const page_array = await pdf2img.convert(`${terminal__arg[2]}`, {
            disableFontFace: true,
            width: terminal__arg[4],
            height: terminal__arg[5],
        });
    
    // escrita e nomeação dos arquivos em array
        function escrita() {
            fs.writeFile(i + `.${terminal__arg[3]}`, page_array[i], function(error) {
                
                if (error) {
                    console.log("erro")
                }
                });
            i++;
        }
        page_array.forEach(escrita)
        } catch (err) {
            console.log(err)
        };
    };

// Como passar parametros do node via script
// https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program

// Input dos args para a conversâo
let _terminal__arg = process.argv;
_terminal__arg.forEach(function terminal__arg (input, index) {
    console.log(`${index}: ${input}`)
});

convert(_terminal__arg); 