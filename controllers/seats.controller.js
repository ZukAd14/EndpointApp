const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found...' });
        else res.json(seat);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.postOne = async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
        await newSeat.save();
        res.json({ message: 'OK' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
        const seat = await Seat.findById(req,params.id);
        if(seat) {
            await Seat.updateOne({ _id: req.params.id}, { $set: { day: day, seat: seat, client: client, email: email }});
            const seatUpdated = await Seat.findById(req.params.id);
            res.json({ UpdatedRecord: seatUpdated });
        }
        else res.status(404).json({ message: 'Not found...' });
  }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteOne = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(seat) {
            await Seat.deleteOne({ _id: req.params.id });
            res.json({ deletedRecord: seat });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
       }
}