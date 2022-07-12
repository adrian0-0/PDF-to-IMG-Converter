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
let i =0
let pages =5;

function testPromise(result, err) {

    return  new Promise ((resolve, reject) => {

        if (pages <= 9) { resolve({
            name: "OLAAAA"

            }) 
        }
        else if (pages > 9 ) { reject({
            name: "Falso"
        })}
    })
}

testPromise()
    .then((res) => {
        for (i = 0; i < 5; i++) {
            document.querySelector("body").innerHTML += (`<p>${res.name}</p>`);
            console.log(res.name)
        }
        write();
    }).catch ((err) => {
        console.log(err.name)
    })
    

function write() {
    fs.writeFile(`index.html`, document.documentElement.innerHTML, function(error) {
        if (error) throw error;
    });
}
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