const express = require('express')
const cors = require('cors');
const { db } = require('./database/db');
const {readdirSync} = require('fs');
const bodyParser = require('body-parser');

const app  = express()

//Utilisation du fichier .env pour la recuperation de certaine données
require('dotenv').config()

const PORT = process.env.PORT

//Middlewares
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

//Fixation du suffixe "/api/v1/ à nos routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
   db();
   app.listen(PORT, () => {
    console.log('You are listening to port : ', PORT);
   })
}

server();