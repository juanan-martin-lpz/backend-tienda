const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

  return res.status(200).json({ok: true});

});

router.post('/',(req, res) => {

});

router.put('/:id',(req, res) => {

});

router.delete('/:id',(req, res) => {

});


module.exports = router;
