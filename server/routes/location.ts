import express from 'express';
import { Location } from '../model/Location';

const router = express.Router();

router.route('/')

    .get((req, res) => {
        Location.find()
            .then(locations => res.json(locations))
            .catch(err => res.status(400).json(err));
    });

router.route('/add')

    .post((req, res) => {
        console.log(req.body);
        
        const name = req.body.name;
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;

        const newLocation = new Location({
            name: name,
            longitude: longitude,
            latitude: latitude
        });

        newLocation.save()
            .then(() => res.json('New location has saved properly!'))
            .catch(err => res.status(400).json(err));

    });

export default router;