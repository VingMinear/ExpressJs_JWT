const express = require('express');

const routeLogin=require('./auth/login');

const app = express();


app.use(express.json());
app.use('/login',routeLogin);

const port=8080;

app.listen(port,()=>{
    console.log('server running on port '+port);
});