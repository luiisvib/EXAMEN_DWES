const express = require('express');
const router = express.Router();
const pool = require("../db")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/fotos", async (req,res) =>{
  const [datos] = await pool.query("SELECT * FROM FOTOS")
  res.render("fotos", {datos: datos})
})

router.post("/subirfoto", async (req, res) =>{
  const {titulo, url, descripcion} = req.body
  await pool.query(`INSERT INTO FOTOS VALUES(DEFAULT, '${titulo}', '${url}', '${descripcion}', DEFAULT)`)
  res.redirect("/")
})

module.exports = router;
