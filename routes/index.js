import express from 'express';
import cities from './cities.js'

const router = express.Router();

/* GET home page. */
router.use('/cities',cities)

export default router;
