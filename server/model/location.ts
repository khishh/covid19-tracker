import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    name: {type: String, required: true, lowercase: true, trim: true},
    latitude: {type: Number, required: true, min: -90, max: 90},
    longitude: {type: Number, required: true, min: -180, max: 180}
}, { timestamps: true});

export const Location = mongoose.model('Location', locationSchema);