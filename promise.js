let str = "Hello World";

function testPromise(result, err) {

    return  new Promise ((resolve, reject) => {

        if (str == "Hello World") { resolve({
            name: "OLAAAA"

            }) 
        }
        else if (str =! "Hello World") { reject({
            name: "Falso"
        })}
    })
}

testPromise()
    .then((res) => {
        console.log(res.name)
    }).catch ((err) => {
        console.log(err.name)
    })