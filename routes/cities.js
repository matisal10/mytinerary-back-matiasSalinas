import express from 'express';
import cityController from '../controllers/city/cityController.js'
const { getAllCities, createCity, getOneCity, updateCity, deleteCity } = cityController
const router = express.Router();

/* GET home page. */
router.get('/', getAllCities);

router.get('/:id', getOneCity);

router.put('/:id', updateCity);

router.post('/', createCity);

router.delete('/:id', deleteCity);

export default router;
