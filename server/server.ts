require('dotenv').config('./.env');
import express from 'express';
import mongoose from 'mongoose';
import LocationRouter from './routes/location';

const app = express();

const port = process.env.PORT || 8080;

const mongodbURL = process.env.ATLAS_URI;

mongoose.connect(mongodbURL, () => {
    console.log('MongoDB connected successfully');
});

app.use(express.json());
app.use('/locations', LocationRouter);

app.get('/', (req, res) => res.send('Hello World'));

app.listen(port, () => console.log('server running on ' + port));