const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if(!testimonial) res.status(404).json({ message: 'Not found...' });
        else res.json(testimonial);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.postOne = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTestimonial = new Testimonial({ author: author, text: text });
        await newTestimonial.save();
        res.json({ message: 'OK' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
    const { author, text } = req.body;
    try {
        const testimonial = await Testimonial.findById(req,params.id);
        if(testimonial) {
            await Testimonial.updateOne({ _id: req.params.id}, { $set: { author: author, text: text }});
            const testimonialUpdated = await Testimonial.findById(req.params.id);
            res.json({ UpdatedRecord: testimonialUpdated });
        }
        else res.status(404).json({ message: 'Not found...' });
  }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteOne = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if(testimonial) {
            await Testimonial.deleteOne({ _id: req.params.id });
            res.json({ deletedRecord: testimonial });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
       }
}