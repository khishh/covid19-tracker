import mongoose, { Schema } from 'mongoose';

const reportSchema = new mongoose.Schema({
    reporterName: {type: String, required: true, lowercase: true, trim: true},
    reporterPhoneNumber: {type: String, required: true, trim: true},
    locationName: {type: String, required: true, lowercase: true, trim: true},
    latitude: {type: Number, required: true, min: -90, max: 90},
    longitude: {type: Number, required: true, min: -180, max: 180},
    visitedDate: {type: Date, required: true},
}, {timestamps: true});

export const Report = mongoose.model('Report', reportSchema);