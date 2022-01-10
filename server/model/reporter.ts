
// export interface Reporter {
//     name: string,
//     phone_number: string
// }

import mongoose from 'mongoose';

const reporterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone_number: {type: String, required: true}
}, { timestamps: true});

export const Reporter = mongoose.model('Reporter', reporterSchema);

