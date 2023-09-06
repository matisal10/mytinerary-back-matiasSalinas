import express from 'express';
import cities from './cities.js'
import itinerary from './itinerary.js'
import auth from './users.js'

const router = express.Router();

/* GET home page. */
router.use('/cities',cities)
router.use('/itinerary',itinerary)
router.use('/auth', auth)

export default router;
