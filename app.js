const express = require ('express');
const cors = require ('cors')
const app = express ()
const fruits = require ('./routes/fruitsRoutes.js') 

app.use(cors())
app.use(express.json())
app.use('/fruits', fruits)  //



app.get ('/', ( req, res) =>{
    res.send('Hello fruity!')
})



module .exports = app