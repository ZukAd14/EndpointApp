const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
   const dataId = parseInt(req.params.id);
   const data = db.concerts.find((concert) => concert.id === dataId); 
   if (data) {
    res.json(data);
   } else {
    res.json('Concert not found');
   }
});

router.route('/concerts').post((req, res) => {
    const { author, text } = req.body;
    if(author && text) {
        db.concerts.push({ id: uuidv4(), author: author, text: text });
        res.json({ message: 'OK' });
    } else {
        res.json({ message: 'wrong data' });
    }
});

router.route('/concerts/:id').put((req, res) => {
    const dataId = parseInt(req.params.id);
    const { author, text } = req.body;
    const data = db.concerts.find((concert) => concert.id === dataId);
    if (data) {
        data.author = author;
        data.text = text;
        res.json({ message: 'OK' });
    } else {
        res.json({ message: 'wrong ID' });
    } 
});

router.route('/concerts/:id').delete((req, res) => {
    const dataId = parseInt(req.params.id);
    const index = db.concerts.findIndex((concert) => concert.id ===dataId);
    
        if (index != -1) {
            db.concerts.splice(index, 1);
            res.json({ message: 'OK' });
        } else {
            res.json({ message: 'wrong ID' });
        }   
});

module.exports = router;