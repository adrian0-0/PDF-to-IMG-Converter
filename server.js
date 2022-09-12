const app = require ('express')();


app.get('/', (req, res) => 
    res.send("AHHHHHHH")
);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`))