import express from 'express';
import itineraryController from '../controllers/itineraries/itineraryController.js'
const {getAllItineraries,getAllItinerariesForCity, createItineraryForCity} = itineraryController
const router = express.Router();

router.get('/', getAllItineraries);

router.get('/:id', getAllItinerariesForCity);

router.post('/create/:id', createItineraryForCity);



export default router;
