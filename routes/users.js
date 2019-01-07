const express = require('express');
const router = express.Router();
const Joi = require('joi');
const User = require('../models/user');


router.get('/', (req, res) => {
   res.json({'message': 'you reached users page'});
});

// adding a user
router.post('/register', (req, res) => {

   let user = req.body;
   let validationResult = validateUser(user);

   if(validationResult.error) {
      console.log(validationResult.error);
      res.status(400).send(validationResult.error.details[0].message);
   }
   else{
      const user = new User({
         email: req.body.email,
         password: req.body.password,
      });

      user.save().then(result => {
         console.log(result);
         res.json({'message': 'registration successful'});
      }).catch(err => {
         res.send(err);
      })

   }

});


// updating a user

router.put('/:id', (req, res) => {

   let user = req.body;
   let validationResult = validateUser(user);

   if(validationResult.error) {
      console.log(validationResult.error);
      res.status(400).send(validationResult.error.details[0].message);
   }
   else{
      User.updateOne( { _id: req.params.id },{ $set: user } )
          .then(result => {
             console.log(result);
             res.send('Your data has been updated successfully');
          }).catch(err => {
         res.status(400).send(err);
      });
   }
});


// deleting a user
router.delete('/:id', (req, res) => {
   User.remove({_id: req.params.id}).then(result => {
      res.send('The user has been deleted successfully');
   }).catch(err => {
      res.status(400).send(err);
   });
});



function validateUser(user){

   const userSchema = {
      'email': Joi.string().email({ minDomainAtoms: 2 }).required(),
      'password': Joi.string().min(6).required()

      // password 6 chars long, and must contain at least one numberic character
      // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
   };

   return Joi.validate(user, userSchema);
}

module.exports = router;