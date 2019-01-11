const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Entry = require('../models/entry');
const checkAuth = require('../middleware/checkAuth');


// get all entries of a certain user
router.get('/', checkAuth, (req, res) => {
    Entry.find({user: req.userId})
        .then(result => {
            res.send(result);
        }).catch(err => {
        res.send(err);
    });
});

// post an entry
router.post('/', checkAuth, (req, res) => {
    let entry = new Entry({
        user: req.userId,
        title: req.body.title,
        url: req.body.url,
        time: req.body.time,
        notes: req.body.notes
    });
    entry.save().then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    });
});


// get a certain entry by its id
router.get('/:id', checkAuth, (req, res) => {
    Entry.findById(req.params.id)
        .then(result => {
            console.log(result);
            res.send(result);
        }).catch(err => {
        res.send(err);
    });
});


// updating an entry
router.put('/:id', checkAuth, (req, res) => {
    let entry = req.body;

        Entry.updateOne({_id: req.params.id}, {$set: entry})
            .then(data => {
                res.send('Changes saved');
            }).catch(err => {
            res.status(400).send(err);
        });
});

// Deleting an entry
router.delete('/:id', checkAuth, (req, res) => {
    Entry.remove({_id: req.params.id}).then(result => {
        res.send(`Number of deleted entries is ${result.n}`)
    }).catch(err => {
        res.status(400).send(err);
    });
});


// function validateEntry(entry) {
//     const entrySchema = {
//     };
//     return Joi.validate(entry, entrySchema);
// }

module.exports = router;