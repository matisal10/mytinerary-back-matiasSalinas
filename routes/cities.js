import express from 'express';
import cityController from '../controllers/city/cityController.js'
const { getAllCities, createCity, getOneCity, updateCity, deleteCity, searchCityByName } = cityController
import itineraryController from '../controllers/itineraries/itineraryController.js'
const {getAllItineraries,getAllItinerariesForCity} = itineraryController
const router = express.Router();

router.get('/', getAllCities);

router.get('/search/:name', searchCityByName);

router.get('/:id', getOneCity);

router.put('/:id', updateCity);

router.post('/', createCity);

router.delete('/:id', deleteCity);

export default router;
