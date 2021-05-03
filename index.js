const express = require ('express');
const config = require('config');
const mongooose = require('mongoose');
const app = express();

// checking if private key has been set before starting app
if (!config.get('myprivatekey')){
    console.error("fatal error: myprivatekey not defined")
    process.exit(1)
}

require('./startup/routes')(app);
require('./startup/db')();

//not implemented yet
app.set('view engine','pug');
app.set('views','./views')

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log( `listening at port 3000`))