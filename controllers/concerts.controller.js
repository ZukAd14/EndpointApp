const Concert = require('../models/concerts.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if(!concert) res.status(404).json({ message: 'Not found...' });
        else res.json(concert);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.postOne = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = sanitize(req.body);
        const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
        await newConcert.save();
        res.json({ message: 'OK' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const concert = await Concert.findById(req,params.id);
        if(concert) {
            await Concert.updateOne({ _id: req.params.id}, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
            const concertUpdated = await Concert.findById(req.params.id);
            res.json({ UpdatedRecord: concertUpdated });
        }
        else res.status(404).json({ message: 'Not found...' });
  }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteOne = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if(concert) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ deletedRecord: concert });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
       }
};

exports.getPerformer = async (req, res) => {
    try {
        const performer = await Concert.find({ performer: req.params.performer });
        if(!performer) res.status(404).json({ message: 'Not found...' });
        else res.json(performer)
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getGenre = async (req, res) => {
    try {
        const genre = await Concert.find({ genre: req.params.genre });
        if(!genre) res.status(404).json({ message: 'Not found...' });
        else res.json(genre)
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getPriceRange = async (req, res) => {
    try {
        const price = await Concert.find({ price: {
            $gte: req.params.price_min,
            $lte: req.params.price_max
        }});
        if(!price) res.status(404).json({ message: 'Not found...' });
        else res.json(price)
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getConcertsByDay = async (req, res) => {
    try {
        const day = await Concert.find({ day: req.params.day });
        
        if(!day) res.status(404).json({ message: 'Not found...' });
        else res.json(day)
    } catch(err) {
        res.status(500).json({ message: err });
    }
};