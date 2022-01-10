import mongoose, { Schema } from 'mongoose';

// export interface Report {
//     reporter: Reporter,
//     location: Location,
//     visitedDate: Date,
//     // id: string
// }

const reportSchema = new mongoose.Schema({
    reporter: {type: Schema.Types.ObjectId, ref: "Reporter"},
    location: {type: Schema.Types.ObjectId, ref: "Location"},
    visitedDate: {type: Date, required: true},
}, {timestamps: true});

export const Report = mongoose.model('Report', reportSchema);