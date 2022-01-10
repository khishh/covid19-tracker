require('dotenv').config('./.env');
import express from 'express';
import mongoose from 'mongoose';
import LocationsRouter from './routes/locations';
import ReportsRouter from './routes/reports';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 8080;

const mongodbURL = process.env.ATLAS_URI;

mongoose.connect(mongodbURL, () => {
    console.log('MongoDB connected successfully');
});

app.use(cors());
app.use(express.json());
app.use('/locations', LocationsRouter);
app.use('/reports', ReportsRouter);

app.get('/', (req, res) => res.send('Hello World'));

app.listen(port, () => console.log('server running on ' + port));