const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
const port=8080;

app.listen(port,()=>{
    console.log('server running on port '+port);
});