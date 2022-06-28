const express = require( 'express')
const path = require('path')
const routes = require('./routes')



const app = express()
app.use(express.json())

app.use(routes)

//STATIC
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.listen(3333, () => console.log('server is running'))