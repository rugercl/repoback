const express = require ('express');
const colors = require ('colors');
const router = require ('./routes/router.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api", router);

app.listen(8080, ()=>{
    console.log("Server on port 8080".green)
});

