//install express - step1
//require express using file - step2

const express = require('express');
const app = express();
const port = 8000;

app.listen(port, function(err){
    if (err) {
        console.log('error occurred.', err);
    }

    console.log('app is listening.');
    console.log(`server is running on port no ${port}`);
});