const express = require('express')
const { notingrouter } = require('./Routes/routeNote')

const app = express()

app.use(express.json)
app.use('/notes', notingrouter)

app.use((err, req, res, next)=>{
    res.json({Error: err})
})
app.listen(4600, ()=>{
    console.log('Server running actively');
})