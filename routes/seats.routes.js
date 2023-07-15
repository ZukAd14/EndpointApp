const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

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
    const { day, seat, client, email } = req.body;

    const dayNumber = parseInt(day);
    const seatNumber = parseInt(seat);
    if (db.seats.some(seat => seat.day === dayNumber && seat.seat === seatNumber)) {
        return res.json({ message: 'The slot is already taken...' });
    } else if(day && seat && client && email) {
        db.seats.push({ id: uuidv4(), day: dayNumber, seat: seatNumber, client: client, email: email });
        req.io.emit('seatsUpdated', db.seats);
        res.json({ message: 'OK' });   
    } else {
        res.json({ message: 'wrong data' });
    }
});

router.route('/seats/:id').put((req, res) => {
    const dataId = parseInt(req.params.id);
    const { day, seat, client, email } = req.body;
    const data = db.seats.find((seat) => seat.id === dataId);
    if (data) {
        data.day = day;
        data.seat = seat;
        data.client = client;
        data.email = email;
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