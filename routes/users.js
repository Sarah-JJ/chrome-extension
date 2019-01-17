const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkAuth = require('../middleware/checkAuth');
const User = require('../models/user');



router.get('/:id', checkAuth, (req, res) => {
    User.findById(req.params.id).then(result => {
        if (!result) {
            res.status(404).send('There is no such user');
        }
        res.send(result);
    }).catch(err => {
        res.status(400).send(err.message)
    });
});

// adding a user
router.post('/register', (req, res) => {

    let user = req.body;

    console.log(user);

    let validationResult = validateUser(user);

    if (validationResult.error) {
        console.log(validationResult.error);
        res.status(400).send(validationResult.error.details[0].message);
    } else {

        bcrypt.hash(user.password, 10, function (err, hash) {

            let user = new User({
                email: req.body.email,
                password: hash,
            });

            user.save().then(data => {
                console.log(data);
                let token = jwt.sign({_id: data._id}, 'key', {expiresIn: '100d'});
                res.json({'token': token, "user": data}); //successful registration
            }).catch(err => {
                console.log(err);
                res.send(err);
            });

        });
    }

});


router.post('/login', (req, res) => {

    let validationResult = validateUser(req.body);

    if (validationResult.error) {
        console.log(validationResult.error.details[0].message);
        res.status(400).json({"message": "validation_error"});
    } else {
        User.findOne({email: req.body.email})
            .then(result => {

                bcrypt.compare(req.body.password, result.password, function (err, response) {
                    if (response) {
                        let token = jwt.sign({"_id": result._id}, 'key');
                        res.json({"token": token, "message": "user logged in", "userId": result._id});
                    } else {
                        res.status(400).send('Wrong email/password pair');
                    }
                });
            }).catch(err => {
            console.log(err);
            res.status(400).send('Wrong email/password pair');
        });
    }
});


// updating a user

router.put('/:id', checkAuth, (req, res) => {

    let user = req.body;

    let validationResult = validateUser(user);

    if (validationResult.error) {
        console.log(validationResult.error);
        res.status(400).send(validationResult.error.details[0].message);
    } else {

        bcrypt.hash(user.password, 10, function (err, hash) {
            User.updateOne({_id: req.params.id}, {$set: {email: user.email, password: hash}})
                .then(data => {
                    res.send('Changes saved');
                }).catch(err => {
                res.status(400).send(err);
            });
        });
    }

});


// deleting a user
router.delete('/:id', checkAuth, (req, res) => {
    User.remove({_id: req.params.id}).then(result => {
        res.send('The user has been deleted successfully');
    }).catch(err => {
        res.status(400).send(err);
    });
});


function validateUser(user) {

    const userSchema = {
         'email': Joi.string().email({minDomainAtoms: 2}).required(),
        'password': Joi.string().min(6).required()

        // password 6 chars long, and must contain at least one numberic character
        // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    };

    return Joi.validate(user, userSchema);
}


module.exports = router;