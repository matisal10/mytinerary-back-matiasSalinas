import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/categories', function (req, res, next) {
  try {
    let all = City.find()
    return res.status(200).json({
      success: true,
      message: 'All!'
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'error'
    })
  }
});

export default router;
