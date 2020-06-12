const express = require('express');
const app = express();

const port = 8000;

// Use Express.Router
app.use('/' , require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the Server: ${err}`);
        return;
    }
    console.log("Server Running Successfully on port : " , port);    
})