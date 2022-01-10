import express from 'express';
import { Report } from '../model/report';

const router = express.Router();

router.route('/')

    .get((req, res) => {
        Report.find()
            .then(reports => res.json(reports))
            .catch(err => res.status(400).json(err));
    });

router.route('/:id')

    .get((req, res) => {
        const id = req.params.id;
        Report.findById(id)
            .then(report => res.json(report))
            .catch(err => res.status(400).json(err));
    })

    .delete((req, res) => {
        const id = req.params.id;
        Report.findByIdAndDelete(id)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err));
    })

router.route('/add')

    .post((req, res) => {
        console.log(req.body);
    
        const reporterName = req.body.reporterName;
        const phoneNumber = req.body.reporterPhoneNumber;
        const locationName= req.body.locationName;
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const visitedDate = req.body.visitedDate;
        
        const newReport = new Report({
            reporterName: reporterName,
            reporterPhoneNumber: phoneNumber,
            locationName: locationName,
            latitude: latitude,
            longitude: longitude,
            visitedDate: visitedDate
        });

        newReport.save()
            .then((report) => {
                console.log(report);
                console.log(report._id);
                
                res.json(report);
            })
            .catch(err => res.status(400).json(err));
    });

export default router;