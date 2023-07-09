const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
   const dataId = parseInt(req.params.id);
   const data = db.seats.find((seat) => seat.id === dataId); 
   if (data) {
    res.json(data);
   } else {
    res.json('Seat not found');
   }
});

router.route('/seats').post((req, res) => {
    const { author, text } = req.body;
    if(author && text) {
        db.seats.push({ id: uuidv4(), author: author, text: text });
        res.json({ message: 'OK' });
    } else {
        res.json({ message: 'wrong data' });
    }
});

router.route('/seats/:id').put((req, res) => {
    const dataId = parseInt(req.params.id);
    const { author, text } = req.body;
    const data = db.seats.find((seat) => seat.id === dataId);
    if (data) {
        data.author = author;
        data.text = text;
        res.json({ message: 'OK' });
    } else {
        res.json({ message: 'wrong ID' });
    } 
});

router.route('/seats/:id').delete((req, res) => {
    const dataId = parseInt(req.params.id);
    const index = db.seats.findIndex((seat) => seat.id ===dataId);
    
        if (index != -1) {
            db.seats.splice(index, 1);
            res.json({ message: 'OK' });
        } else {
            res.json({ message: 'wrong ID' });
        }   
});

module.exports = router;