const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');


router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getById);

router.get('/concerts/performer/:performer', ConcertController.getPerformer);

router.get('/concerts/genre/:genre', ConcertController.getGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertController.getPriceRange);

router.get('/concerts/day/:day', ConcertController.getConcertsByDay);

router.post('/concerts', ConcertController.postOne);

router.put('/concerts/:id', ConcertController.putById);

router.delete('/concerts/:id', ConcertController.deleteOne);

module.exports = router;