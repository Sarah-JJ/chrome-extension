const express = require('express');
const app = express();
const users = require('./routes/users');
const entries = require('./routes/entries');
const mongoose = require('mongoose');
const cors = require('cors');

// const morgan = require('morgan');
// const bodyParser = require('body-parser');



let port = process.env.PORT || 3000;


mongoose.connect('mongodb://admin22:admin22@ds149914.mlab.com:49914/chrome-extension',{useNewUrlParser: true}, (err) => {
    if(err)
        console.log(err);
    else console.log('connected to db...');

});


//app.use(bodyParser.text());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(function (req, res, next) {
    console.log(req.body);
    next()
});

// app.use(morgan('tiny'));

app.use('/api/users', users);
app.use('/api/entries', entries);

app.get('/', (req, res) => {
    res.json({"message": "welcome to the youtube-extension api"});
});

app.listen(port);