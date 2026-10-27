require ('dotenv').config()
const express = require ('express');
const app = express ()
const fruits = require ('./routes/fruitsRoutes.js') 
const port=process.env.port

app.use(express.json())
app.use('/fruits', fruits)  //



app.get ('/', ( req, res) =>{
    res.send('Hello fruity!')
})



module .exports = app