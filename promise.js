const jsdom = require("jsdom");
const fs = require('fs');
const { JSDOM } = jsdom;

let htmlContent = `
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
let i;
let c = 1;
let pages =5;
let pdf = 1;
while (pdf <= 3) {
    
    // 1. Your original promise that runs custom logic
    let MyPromise = new Promise(function(resolve){
        setTimeout(function() { 
            resolve({
                message: 'My Promise has been fulfilled in 1 second! But the timeout is set to 500ms, you will never see this :3',
                write: true,
            }); 
        }, 1000);
    });

    // 2. The timeout promise that will impose as limit 500 milliseconds
    // let timeout = new Promise(function(resolve, reject){
    //     setTimeout(function() { 
    //         reject('Time out! Your promise couldnt be fulfilled in half second :c'); 
    //     }, 500);
    // });

    // 3. Race both promises, if MyPromise isn't fulfilled in 500 milliseconds, the second promise will be executed and rejected.
    // It will output: Time out! Your promise couldn't be fulfilled in half second :c
    
    Promise.race([MyPromise]).then(function(data){
        while (c <= 3) { 
            document.querySelector("title").innerHTML += (`${c}`);
            console.log(c)

            let i = 1
            for (i; i <= 5; i++) {
                document.querySelector("body").innerHTML += (`
                <img src="./pdf-${i}.png?t=0258" alt="" style="width: 100%; max-width: none;"><br>`);

             
                
            }

            fs.writeFile(`${c}.html`, document.documentElement.innerHTML, function(error) {
                if (error) throw error;
            });
            c++;
        }

    }).catch(function(e){
        console.log(e);
    });

    pdf++;        

}
    
//     function testPromise(result, err) {
    
//         return  new Promise ((resolve, reject) => {
    
//             if (pages <= 9) { resolve({

//                 count: 10,
//                 message: true
            
    
//                 }) 
//             }
//             else if (pages > 9 ) { reject({
//                 name: "Falso"
//             })}
//         })
//     }
    
//     testPromise()
//         .then((res) => {
//             for (i = 1; i <= 5; i++) {
//                 document.querySelector("body").innerHTML += (`
//                 <img src="./pdf-${i}.png?t=0258" alt="" style="width: 100%; max-width: none;"><br>`);
//                 console.log(res.name)
//             }
//             if (res.message) {
//                 write();
//             }
//         }).catch ((err) => {
//             console.log(err.name)
//         })
        
    
//     function write() {
//         let i = 1
//         fs.writeFile(`${i}.html`, document.documentElement.innerHTML, function(error) {
//             if (error) throw error;

//         });
//         i++;
//         pdf++;        
//     }
// }







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