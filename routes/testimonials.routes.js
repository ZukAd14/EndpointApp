const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const maxIndex = db.testimonials.length;
    const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
    const data = db.testimonials.find((testimonial) => testimonial.id === randomIndex);
    res.json(data);
});

router.route('/testimonials/:id').get((req, res) => {
   const dataId = parseInt(req.params.id);
   const data = db.testimonials.find((testimonial) => testimonial.id === dataId); 
   if (data) {
    res.json(data);
   } else {
    res.json('Testimonial not found');
   }
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    if(author && text) {
        db.testimonials.push({ id: uuidv4(), author: author, text: text });
        res.json({ message: 'OK' });
    } else {
        res.json({ message: 'wrong data' });
    }
});

router.route('/testimonials/:id').put((req, res) => {
    const dataId = parseInt(req.params.id);
    const { author, text } = req.body;
    const data = db.testimonials.find((testimonial) => testimonial.id === dataId);
    if (data) {
        data.author = author;
        data.text = text;
        res.json({ message: 'OK' });
    } else {
        res.json({ message: 'wrong ID' });
    } 
});

router.route('/testimonials/:id').delete((req, res) => {
    const dataId = parseInt(req.params.id);
    const index = db.testimonials.findIndex((testimonial) => testimonial.id ===dataId);
    
        if (index != -1) {
            db.testimonials.splice(index, 1);
            res.json({ message: 'OK' });
        } else {
            res.json({ message: 'wrong ID' });
        }   
});

module.exports = router;