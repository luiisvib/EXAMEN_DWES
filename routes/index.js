const express = require('express');
const router = express.Router();
const pool = require("../db")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {titulo: "Inicio"});
});

router.get("/fotos", async (req,res) =>{
  const [datos] = await pool.query("SELECT * FROM FOTOS")
  res.render("fotos", {datos: datos, titulo: "Fotos"})
})

router.post("/subirfoto", async (req, res) =>{
  const {titulo, url, descripcion} = req.body
  await pool.query(`INSERT INTO FOTOS(titulo, url, descripcion) VALUES('${titulo}', '${url}', '${descripcion}')`)
  res.redirect("/")
})

router.get("/like/:id", async (req, res) =>{
  const {id} = req.params
  await pool.query(`UPDATE FOTOS`)
  res.send(id)
})

router.get("/dislike/:id", (req, res) =>{
  const {id} = req.params
  res.send(id)
})

module.exports = router;
