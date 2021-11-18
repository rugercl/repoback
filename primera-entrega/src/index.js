const express = require('express');
const router = require('./routes/router')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

const PORT = process.env.PORT || 8080;

app.use("/api", router);

app.listen(PORT, ()=>{
    console.log("Server on port " + PORT)
});