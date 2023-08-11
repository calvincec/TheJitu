
const express = require('express');
const { userRouter } = require('./Routes/memberRoute');

const app = express()

app.use(express.json())
app.use('/member', userRouter)

app.use((err, req, res, next)=>{
    res.json({Error: err})
})

app.listen(4502, ()=>{
    console.log('Server running on port 4502');
})