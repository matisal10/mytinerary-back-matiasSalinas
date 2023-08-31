import express from 'express';
import itineraryController from '../controllers/itineraries/itineraryController.js'
const {getAllItineraries,getAllItinerariesForCity, getOneItinerary , createItineraryForCity, deleteItinerary, updateItinerary} = itineraryController
const router = express.Router();

router.get('/', getAllItineraries);

router.get('/itineraries/:id', getOneItinerary);

router.get('/:id', getAllItinerariesForCity);

router.post('/create/:id', createItineraryForCity);

router.put('/:id', updateItinerary)

router.delete('/:itineraryId', deleteItinerary);


export default router;
