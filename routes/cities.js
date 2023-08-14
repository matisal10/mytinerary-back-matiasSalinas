import express from 'express';
import create from '../controllers/city/create';
const router = express.Router();

/* GET home page. */
router.get('/', read);

router.get('/:id', function (req, res, next) {
    res.render();
});

router.put('/:id', function (req, res, next) {
    res.render();
});

router.post('/', create);

router.delete('/:id', function (req, res, next) {
    res.render();
});

export default router;
