const express = require('express');
const app = express();

const port = 8000;

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// Use Express Router
app.use('/' , require('./routes'));

//Set View Engine
app.set('view engine', 'ejs');
app.set('views' , './views');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the Server: ${err}`);
        return;
    }
    console.log("Server Running Successfully on port : " , port);    
})