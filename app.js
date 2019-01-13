const express = require('express');
const app = express();
const users = require('./routes/users');
const entries = require('./routes/entries');
const mongoose = require('mongoose');

const morgan = require('morgan');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://admin22:admin22@ds149914.mlab.com:49914/chrome-extension',{useNewUrlParser: true}, (err) => {
    if(err)
        console.log(err);
    else console.log('connected to db...');

});


//app.use(bodyParser.text());
app.use(express.json());
app.use(express.static('public'));
// app.use(morgan('tiny'));

app.use('/api/users', users);
app.use('/api/entries', entries);


app.listen(3000);
