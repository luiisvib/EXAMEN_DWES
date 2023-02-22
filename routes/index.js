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
  await pool.query(`INSERT INTO FOTOS(titulo, url, descripcion, likes, dislikes) VALUES('${titulo}', '${url}', '${descripcion}, 0, 0')`)
  res.redirect("/")
})

router.get("/like/:id", async (req, res) =>{
  const {id} = req.params
  await pool.query(`UPDATE FOTOS SET likes=likes+1 WHERE id=${id}`)
  res.redirect("/fotos")
})

router.get("/dislike/:id", async (req, res) =>{
  const {id} = req.params
  await pool.query(`UPDATE FOTOS SET dislikes=dislikes+1 WHERE id=${id}`)
  res.redirect("/fotos")
})

module.exports = router;
