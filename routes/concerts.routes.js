const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

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
    const { performer, genre, price, day, image } = req.body;
    if(performer && genre && price && day && image) {
        db.concerts.push({ id: uuidv4(), performer: performer, genre: genre, price: price, day: day, image: image });
        res.json({ message: 'OK' });
    } else {
        res.json({ message: 'wrong data' });
    }
});

router.route('/concerts/:id').put((req, res) => {
    const dataId = parseInt(req.params.id);
    const { performer, genre, price, day, image } = req.body;
    const data = db.concerts.find((concert) => concert.id === dataId);
    if (data) {
        data.performer = performer;
        data.genre = genre;
        data.price = price;
        data.day = day;
        data.image = image;
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