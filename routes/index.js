const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/fotos", (req,res) =>{
  res.render("fotos")
})

module.exports = router;
